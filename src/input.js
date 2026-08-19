export class Input {
  constructor() {
    this.dir = null;
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowUp': case 'w':
          this.dir = [0, -1]; break;
        case 'ArrowDown': case 's':
          this.dir = [0, 1]; break;
        case 'ArrowLeft': case 'a':
          this.dir = [-1, 0]; break;
        case 'ArrowRight': case 'd':
          this.dir = [1, 0]; break;
      }
    });
  }

  getDirection() {
    const d = this.dir;
    this.dir = null;
    return d;
  }
}
