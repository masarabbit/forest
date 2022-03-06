const map = {
  height: 0, width: 0,
  iHeight: 0, iWidth: 0,
  start: 0,
  cellD: 32,
  minicellD: 0, 
  mapXY: {
    x: null,
    y: null
  },
  mapTiles: null,
  locationTiles: null,
  mapImageTiles: null,
  animInterval: null,
  noWallList: ['b','do'],
  noLeftEdgeList: ['pu','g'],
  key: 'one',
  spawnData: [],
  sprites: null,
  map: []
}

const bear = {
  spritePos: null,
  facingDirection: 'down',
  pos: null,
  motion: true,
  textCount: 0,
  pause: false,
  option: 0,
  choice: 0,
  prevChoices: {}, 
  animationTimer: [],
  dialog: {},
  dialogKey: null,
  dialogHistory: [],
  isTalking: false,
}

const directionKey = {
  9: 'right',
  6: 'left',
  3: 'up',
  0: 'down',
}


export {
  map,
  bear,
  directionKey
}