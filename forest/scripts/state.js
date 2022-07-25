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
  noWallList: ['b','do','gr'],
  noLeftEdgeList: ['pu','g'],
  key: 'one',
  spawnData: [],
  sprites: null,
  map: [],
  eventIndex: 0,
  activeEvent: null,
  eventChainActors: [],
  completedEvents: [],
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
  animationTimer: null,
  frameOffset: 0,
  dialog: {},
  dialogKey: null,
  dialogHistory: [],
  isTalking: false,
  motionIndex: 0,
  name: 'bear',
}

const directionKey = {
  9: 'right',
  6: 'left',
  3: 'up',
  0: 'down',
}

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
  tk: 'talk',
  re: 'resume',
}

const testAct = [
  {
    usabon: 'r',
    bunnio: 'l',
    bear: 'tr'
  },
  {
    usabon: 'r',
    bunnio: 'u',
    bear: 'r'
  },
  {
    usabon: 'r',
    bunnio: { event: 'test_event' },
    bear: 'u'
  },
  {
    usabon: 're',
    bear: 'l'
  },
  {
    usabon: 're',
    bear: 'l'
  },
  {
    usabon: 're',
    bear: 'l'
  },
  'end'
]

export {
  map,
  bear,
  directionKey,
  walkDirections,
  testAct,
}