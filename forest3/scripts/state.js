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
  // mapTiles: null,
  locationTiles: null,
  mapImageTiles: null,
  animInterval: null,
  animCounter: 0,
  // noWallList: ['zd','br','as'],
  // noLeftEdgeList: ['pu','g'],
  key: 'one',
  spawnData: [],
  sprites: null,
  map: [],
  wall: [],
  eventIndex: 0,
  activeEvent: null,
  eventChainActors: [],
  completedEvents: [],
  transitionTimer: null,
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
  walkingDirection: null,
  walkingInterval: null,
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

const testAct = {
  sequences: [
    {
      tololo: ['r'],
      bunnio: ['l'],
      bear: ['tr']
    },
    {
      tololo: ['r'],
      bunnio: ['u'],
      bear: ['r']
    },
    {
      tololo: ['r'],
      bunnio: { dialog: 'test_event' },
      bear: ['u']
    },
    {
      tololo: ['re'],
      bear: ['l']
    },
    {
      tololo: ['re'],
      bear: ['l']
    },
    {
      tololo: ['re'],
      bear: ['l']
    },
    'end'
  ]
}

const touchControl = {
  active: false,
  timer: null,
  direction: null,
}

export {
  map,
  bear,
  walkDirections,
  testAct,
  touchControl
}