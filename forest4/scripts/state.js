import { elements } from './elements.js'


const settings = {
  d: 32,
  animInterval: null,
  animCounter: 0,
  map: {
    el: elements.mapCover, 
  }, 
  mapXY: {
    x: null,
    y: null
  },
}

const touchControl = {
  active: false,
  timer: null,
  direction: null,
}


export {
  settings,
  touchControl
}