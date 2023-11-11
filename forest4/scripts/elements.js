

const elements = {
  wrapper: document.querySelector('.wrapper'),
  mapCover: document.querySelector('.map-cover'), 
  bear: document.querySelector('.sprite-container'), 
  spriteCheck: document.querySelector('.sprite-check'), 
  mapImage: {
    el: document.querySelector('.map-image'),
    ctx: null,
  },
  spriteSheet: {
    el: document.querySelector('.sprite-sheet'),
    ctx: null,
  },
  drawboard: {
    el: document.querySelector('.drawboard'),
    ctx: null,
  },
  startButton: document.querySelector('.start-button'),
  control: document.querySelector('.control'),
  controlButtons: document.querySelectorAll('.control-button'),
}

elements.drawboard.ctx = elements.drawboard.el.getContext('2d')
elements.spriteSheet.ctx = elements.spriteSheet.el.getContext('2d')

export {
  elements
}