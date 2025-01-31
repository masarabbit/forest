
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
  map: {},
  transitionTimer: null,
  isWindowActive: true,
  controlPos: { x: 0, y: 0 },
}

export {
  elements,
  settings
}