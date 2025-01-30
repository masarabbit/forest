
const elements = {
  player: document.querySelector('.player'), 
  wrapper: document.querySelector('.wrapper'),
  indicator: document.querySelector('.indicator'),
}

const settings = {
  dialogIndex: 0,
  isDialogOpen: true,

  d: 20,
  offsetPos: {
    x: 0, y: 0,
  },
  elements: [],
  // npcs: [],
  map: {
    el: document.querySelector('.map'),
    walls: [],
    w: 20 * 50,
    h: 20 * 50,
    x: 0, y: 0,
  },
  transitionTimer: null,
  isWindowActive: true,
  controlPos: { x: 0, y: 0 },
}

export {
  elements,
  settings
}