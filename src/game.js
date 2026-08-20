import { MAZE, loadConfig } from './maze.js';
import { Player } from './player.js';
import { Ghosts } from './ghosts.js';
import { Renderer } from './renderer.js';

const config = await loadConfig();
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

const W = config.cols * config.tileSize;
const H = config.rows * config.tileSize;
canvas.width = W;
canvas.height = H;

let score = 0;
let lives = 3;
let gameOver = false;
let gameWon = false;

const player = new Player(1, 1, config.tileSize);
const ghosts = new Ghosts(config);
const renderer = new Renderer(canvas, ctx, MAZE, config.tileSize);

let dotsRemaining = 0;
for (let r = 0; r < config.rows; r++) {
  for (let c = 0; c < config.cols; c++) {
    if (MAZE[r][c] === 1) dotsRemaining++;
  }
}

document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowUp': player.setDir(0, -1); break;
    case 'ArrowDown': player.setDir(0, 1); break;
    case 'ArrowLeft': player.setDir(-1, 0); break;
    case 'ArrowRight': player.setDir(1, 0); break;
  }
});

function checkCollision() {
  const px = player.col;
  const py = player.row;
  if (MAZE[py][px] === 1) {
    MAZE[py][px] = 0;
    score += 10;
    dotsRemaining--;
    document.getElementById('score').textContent = score;
  }
  for (const ghost of ghosts.list) {
    if (ghost.col === px && ghost.row === py) {
      if (ghost.scared) {
        ghost.respawn();
        score += 100;
        document.getElementById('score').textContent = score;
      } else {
        lives--;
        const hearts = '♥'.repeat(lives);
        document.getElementById('lives').textContent = hearts;
        if (lives <= 0) {
          endGame(false);
          return;
        }
        player.reset();
        ghosts.reset();
      }
    }
  }
  if (dotsRemaining <= 0) {
    endGame(true);
  }
}

function endGame(won) {
  gameOver = true;
  const el = document.getElementById('gameover');
  const title = document.getElementById('goTitle');
  const fs = document.getElementById('finalScore');
  if (won) {
    title.textContent = 'YOU WIN!';
  } else {
    title.textContent = 'GAME OVER';
  }
  fs.textContent = score;
  el.style.display = 'block';
}

window.restartGame = function() {
  gameOver = false;
  gameWon = false;
  score = 0;
  lives = 3;
  dotsRemaining = 0;
  for (let r = 0; r < config.rows; r++) {
    for (let c = 0; c < config.cols; c++) {
      if (MAZE[r][c] === 1) dotsRemaining++;
    }
  }
  document.getElementById('score').textContent = '0';
  document.getElementById('lives').textContent = '♥♥♥';
  document.getElementById('gameover').style.display = 'none';
  player.reset();
  ghosts.reset();
};

function loop() {
  if (gameOver) return;
  player.update();
  ghosts.update();
  renderer.draw(player, ghosts.list);
  checkCollision();
  requestAnimationFrame(loop);
}

loop();
