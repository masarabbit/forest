const tiles = [
  'b','ta','tb','tc','td','t','w','o','d',
  's','bt','br','bb','bl','bx','by','rr','rl',
  'ry','rt','g','y','iw','do','wi','sw','sl',
  'sr','nw','nr','at','ar','ab','al','rc','pt',
  'pr','pb','pu','r','rh','ra','rb','rd','re',
  'la','e','lh','st','aa','gr','','',''
]
const riverTiles = ['r', 'rh', 'ra', 'rb','rd', 're']
const plainColors = {
  p: '#fff',
  rp: '#58d3d8',
  bd: '#0d8799',
  b: '#a2fcf0',
}
const animationTiles = {
  r: ['r', 'aa', 'o', 'r', 'aa', 'o'],
  rh: ['rh', 'aa', 'o', 'rh', 'aa', 'o'],
  ra: ['ra', 'aa', 'o', 'ra', 'aa', 'o'],
  rb: ['rb', 'aa', 'rb', 'aa', 'rb', 'aa'],
  rd: ['rd', 'aa', 'rd', 'aa', 'rd', 'aa'],
  re: ['re', 'aa', 're', 'aa', 're', 'aa'],
}

export {
  tiles,
  riverTiles,
  plainColors,
  animationTiles
}