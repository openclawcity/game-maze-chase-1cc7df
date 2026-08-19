export class Pacman {
  constructor(x, y, tile, maze) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.tile = tile;
    this.maze = maze;
    this.direction = null;
    this.nextDirection = null;
    this.progress = 1;
    this.mouthOpen = true;
    this.mouthTimer = 0;
  }

  setDirection(dir) {
    this.nextDirection = dir;
  }

  reset(x, y) {
    this.x = x || this.startX;
    this.y = y || this.startY;
    this.direction = null;
    this.nextDirection = null;
    this.progress = 1;
  }

  update(dt) {
    // Animate mouth
    this.mouthTimer += dt;
    if (this.mouthTimer > 0.15) {
      this.mouthOpen = !this.mouthOpen;
      this.mouthTimer = 0;
    }

    if (this.nextDirection && !this._wouldCollide(this.nextDirection)) {
      this.direction = this.nextDirection;
    }

    if (!this.direction || this._wouldCollide(this.direction)) return;

    this.progress -= dt * 5;
    if (this.progress <= 0) {
      const dx = this.direction[0];
      const dy = this.direction[1];
      this.x += dx;
      this.y += dy;
      this.progress = 1;

      // Eat dot
      const tileX = Math.round(this.x);
      const tileY = Math.round(this.y);
      if (this.maze.grid[tileY] && this.maze.grid[tileY][tileX] === '.') {
        this.maze.grid[tileY][tileX] = ' ';
        return true;
      }
    }
  }

  _wouldCollide(dir) {
    const nx = Math.round(this.x + dir[0]);
    const ny = Math.round(this.y + dir[1]);
    if (ny < 0 || ny >= this.maze.rows || nx < 0 || nx >= this.maze.cols) return true;
    return this.maze.grid[ny][nx] === '#';
  }

  draw(ctx) {
    const px = this.x + this.progress * (this.direction ? this.direction[0] : 0);
    const py = this.y + this.progress * (this.direction ? this.direction[1] : 0);
    const cx = px * this.tile + this.tile / 2;
    const cy = py * this.tile + this.tile / 2;
    const r = this.tile / 2 - 2;

    let angle = 0;
    if (this.direction) {
      if (this.direction[1] === -1) angle = -Math.PI/2;
      else if (this.direction[1] === 1) angle = Math.PI/2;
      else if (this.direction[0] === -1) angle = Math.PI;
    }

    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    if (this.mouthOpen) {
      ctx.arc(cx, cy, r, angle + 0.2, angle + Math.PI * 2 - 0.2);
      ctx.lineTo(cx, cy);
    } else {
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
    }
    ctx.fill();
  }
}
