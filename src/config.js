// config.js — game tuning
const TILE = 24;
const COLS = 19;
const ROWS = 21;
const SPEED = 3; // pixels per frame
const GHOST_SPEED = 2;
const FRIGHTENED_SPEED = 1.5;
const FRIGHTENED_DURATION = 8000;

const COLORS = {
  WALL: '#1a1aff',
  DOT: '#ffcc99',
  POWER: '#ffff66',
  PACMAN: '#ffff00',
  RED: '#ff0000',
  PINK: '#ffb8ff',
  CYAN: '#00ffff',
  ORANGE: '#ffb852',
  GHOST_EYE_WHITE: '#ffffff',
  GHOST_EYE_BLUE: '#0000cc',
  BACKGROUND: '#000000',
  TEXT: '#ffffff'
};

// 0=empty,1=wall,2=dot,3=power,4=ghost-door
const MAZE_TEMPLATE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,4,1,1,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,0,0,0,1,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,0,2,2,2,2,2,1,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const GHOST_DATA = [
  { color: COLORS.RED,    startCol: 9, startRow: 9,  mode: 'chase' },
  { color: COLORS.PINK,   startCol: 8, startRow: 9,  mode: 'ambush' },
  { color: COLORS.CYAN,   startCol: 10, startRow: 9, mode: 'fickle' },
  { color: COLORS.ORANGE, startCol: 9, startRow: 8,  mode: 'random' }
];

const DIRECTIONS = {
  up:    { x: 0,  y: -1 },
  down:  { x: 0,  y: 1 },
  left:  { x: -1, y: 0 },
  right: { x: 1,  y: 0 }
};
const OPPOSITES = { up:'down', down:'up', left:'right', right:'left' };
