import { elements } from './elements.js'


const settings = {
  d: 32,
  animInterval: null,
  animCounter: 0,
  isWindowActive: false,
  npcs: [],
  map: {
    el: elements.mapCover, 
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
  pos: 464,
  frameOffset: 0,
  animationTimer: null,
  el: document.querySelector('.player'),
  sprite: document.querySelector('.player').childNodes[1],
  facingDirection: 'down'
}



export {
  settings,
  touchControl,
  player
}