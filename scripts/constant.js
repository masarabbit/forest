// const transitionCover = document.querySelector('.transition_cover')
// const touchToggle = document.querySelector('.touch_toggle')
// const control = document.querySelector('.control')
// const controlButtons = document.querySelectorAll('.control_button')
// const wrapper = document.querySelector('.wrapper')
// const map = document.querySelector('.map')
// const mapImageContainer = document.querySelector('.map_image_container')
// const mapCover = document.querySelector('.map_cover')
// const mapImage = document.querySelector('.map_image')
// const location = document.querySelector('.location_indicator')
// const spriteContainer = document.querySelector('.sprite_container')
// const texts = document.querySelectorAll('.text')
// const sprite = document.querySelector('.sprite')
// const indicator = document.querySelector('.indicator')
// const spriteFace = document.querySelector('.face')

// maybe will use?

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

// gameplay related variables
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