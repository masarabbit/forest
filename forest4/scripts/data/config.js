


const walkDirections = {
  u: 'up',
  d: 'down',
  r: 'right',
  l: 'left',
  s: 'stop',
  tu: 'up',
  td: 'down',
  tr: 'right',
  tl: 'left',
  // tk: 'talk',
  // re: 'resume',
}

const editConfig = {
  a: 90,
  b: 180,
  c: 270,  
}

const tileTypes = {
  Q: ['', 'a', 'b', 'c', 'h', 'v', 'ah', 'bh', 'ch', 'av', 'bv', 'cv', 'avh', 'bvh', 'cbh'],
  X: [''],
  L: ['', 'a', 'b', 'c'],
  H: ['', 'a'],
  A: ['', 'h'],
  T: ['', 'v']
}

export {
  walkDirections,
  editConfig,
  tileTypes
}