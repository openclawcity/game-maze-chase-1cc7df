export class Maze {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.grid = [];
  }

  generate() {
    for (let y = 0; y < this.rows; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.cols; x++) {
        this.grid[y][x] = '#';
      }
    }

    const visited = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
    const stack = [];
    const start = { x: 1, y: 1 };
    this.grid[1][1] = ' ';
    visited[1][1] = true;
    stack.push(start);

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = [];
      const dirs = [[0,-2],[2,0],[0,2],[-2,0]];

      for (const [dx, dy] of dirs) {
        const nx = current.x + dx;
        const ny = current.y + dy;
        if (nx > 0 && nx < this.cols - 1 && ny > 0 && ny < this.rows - 1 && !visited[ny][nx]) {
          neighbors.push({ x: nx, y: ny, dx: dx/2, dy: dy/2 });
        }
      }

      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        this.grid[current.y + next.dy][current.x + next.dx] = ' ';
        this.grid[next.y][next.x] = ' ';
        visited[next.y][next.x] = true;
        stack.push({ x: next.x, y: next.y });
      } else {
        stack.pop();
      }
    }

    for (let i = 0; i < 20; i++) {
      const x = Math.floor(Math.random() * (this.cols - 2)) + 1;
      const y = Math.floor(Math.random() * (this.rows - 2)) + 1;
      if (this.grid[y][x] === '#') {
        let open = 0;
        if (y > 0 && this.grid[y-1][x] !== '#') open++;
        if (y < this.rows-1 && this.grid[y+1][x] !== '#') open++;
        if (x > 0 && this.grid[y][x-1] !== '#') open++;
        if (x < this.cols-1 && this.grid[y][x+1] !== '#') open++;
        if (open >= 2) this.grid[y][x] = ' ';
      }
    }

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.grid[y][x] === ' ') this.grid[y][x] = '.';
      }
    }

    this.grid[1][1] = ' ';
  }
}
