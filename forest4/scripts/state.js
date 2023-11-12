import { elements } from './elements.js'


const settings = {
  d: 32,
  transitionTimer: null,
  animInterval: null,
  animCounter: 0,
  isWindowActive: false,
  npcs: [],
  completedEvents: [],
  activeEvent: null,
  map: {
    el: elements.mapCover, 
    key: 'one',
  }, 
  mapImage: {
    el: elements.mapImage.el.parentNode,
    canvas: elements.mapImage.el,
    x: 0,
    y: 0,
    w: 0,
    h: 0
  },
}

const touchControl = {
  active: false,
  timer: null,
  direction: null,
}

const player = {
  pos: 0,
  frameOffset: 0,
  animationTimer: null,
  el: elements.player,
  sprite: document.querySelector('.player').childNodes[1],
  facingDirection: 'down',
  walkingDirection: '',
  walkingInterval: '',
  isTalking: false,
  pause: true,
}




export {
  settings,
  touchControl,
  player,
}