export class Ghost {
  constructor(x, y, tile, maze, color) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.tile = tile;
    this.maze = maze;
    this.color = color;
    this.direction = [1, 0];
    this.progress = 1;
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.direction = [1, 0];
    this.progress = 1;
  }

  update(dt) {
    if (this._wouldCollide(this.direction) || this.progress <= 0.5) {
      const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
      const valid = dirs.filter(d => !this._wouldCollide(d));
      if (valid.length > 0) {
        // Pick direction that moves toward player or away in power mode
        this.direction = valid[Math.floor(Math.random() * valid.length)];
      }
    }

    if (!this._wouldCollide(this.direction)) {
      this.progress -= dt * 4;
      if (this.progress <= 0) {
        this.x += this.direction[0];
        this.y += this.direction[1];
        this.progress = 1;
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
    const cx = (this.x + this.progress * this.direction[0]) * this.tile + this.tile / 2;
    const cy = (this.y + this.progress * this.direction[1]) * tile + this.tile / 2;
    const r = this.tile / 2 - 2;

    ctx.fillStyle = this.color === 'red' ? '#FF0000' :
                    this.color === 'pink' ? '#FFB8FF' :
                    this.color === 'cyan' ? '#00FFFF' : '#FFB852';

    // Ghost body
    ctx.beginPath();
    ctx.arc(cx, cy - 3, r, Math.PI, 0);
    ctx.lineTo(cx + r, cy + r - 1);
    // Wavy bottom
    for (let i = 3; i >= 0; i--) {
      const wx = cx + r - (r * 2 / 3) * i;
      const wy = cy + r - 1 + (i % 2 === 0 ? 3 : 0);
      ctx.lineTo(wx, wy);
    }
    ctx.closePath();
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(cx - 4, cy - 5, 3, 0, Math.PI * 2);
    ctx.arc(cx + 4, cy - 5, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx - 3, cy - 5, 1.5, 0, Math.PI * 2);
    ctx.arc(cx + 5, cy - 5, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}
