import { Maze } from './maze.js';
import { Pacman } from './pacman.js';
import { Ghost } from './ghost.js';
import { Input } from './input.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const TILE = 20;
const COLS = 21;
const ROWS = 23;

canvas.width = COLS * TILE;
canvas.height = ROWS * TILE;

const maze = new Maze(COLS, ROWS);
maze.generate();

const player = new Pacman(1, 1, TILE, maze);
const ghosts = [
  new Ghost(19, 1, TILE, maze, 'red'),
  new Ghost(19, 21, TILE, maze, 'pink'),
  new Ghost(1, 21, TILE, maze, 'cyan'),
  new Ghost(19, 1, TILE, maze, 'orange')
];

const input = new Input();
let score = 0;
let lives = 3;
let gameTime = 0;
let powerMode = false;
let powerTimer = 0;
let gameOver = false;
let gameWon = false;

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw maze walls
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (maze.grid[y][x] === '#') {
        ctx.fillStyle = '#1919A6';
        ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
      }
    }
  }

  // Draw dots
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (maze.grid[y][x] === '.') {
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(x * TILE + TILE/2, y * TILE + TILE/2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  player.draw(ctx);
  ghosts.forEach(g => g.draw(ctx));

  // HUD
  ctx.fillStyle = '#FFF';
  ctx.font = '14px monospace';
  ctx.fillText('Score: ' + score, TILE, ROWS * TILE + 20);
  ctx.fillText('Lives: ' + lives, canvas.width - 80, ROWS * TILE + 20);
}

function update(dt) {
  if (gameOver || gameWon) return;

  const dir = input.getDirection();
  if (dir) player.setDirection(dir);
  player.update(dt, maze);

  // Power mode timer
  if (powerMode) {
    powerTimer -= dt;
    if (powerTimer <= 0) powerMode = false;
  }

  ghosts.forEach(ghost => {
    ghost.update(dt, maze, player, powerMode);
    if (ghost.x === player.x && ghost.y === player.y) {
      if (powerMode) {
        score += 200;
        ghost.reset();
      } else {
        lives--;
        if (lives <= 0) gameOver = true;
        else { player.reset(1,1); ghosts.forEach(g => g.reset()); }
      }
    }
  });

  // Check win condition
  let dotsRemaining = 0;
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (maze.grid[y][x] === '.') dotsRemaining++;
    }
  }
  if (dotsRemaining === 0) gameWon = true;
}

function loop(ts) {
  const dt = (ts - (loop.last || ts)) / 1000;
  loop.last = ts;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
