

const elements = {
  wrapper: document.querySelector('.wrapper'),
  mapCover: document.querySelector('.map-cover'), 
  bear: document.querySelector('.sprite-container'), 
  spriteCheck: document.querySelector('.sprite-check'), 
  mapImage: document.querySelector('.map-image'),
  ctx: null,
  spriteSheet: document.querySelector('.sprite-sheet'),
  sCtx: null,
  drawboard: document.querySelector('.drawboard'),
  dCtx: null,
  startButton: document.querySelector('.start-button'),
  control: document.querySelector('.control'),
  controlButtons: document.querySelectorAll('.control-button'),
}

elements.dCtx = elements.drawboard.getContext('2d')
elements.sCtx = elements.spriteSheet.getContext('2d')

export {
  elements
}