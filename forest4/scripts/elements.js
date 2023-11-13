

const elements = {
  wrapper: document.querySelector('.wrapper'),
  mapCover: document.querySelector('.map-cover'), 
  eventCover: document.querySelector('.event-cover'),
  player: document.querySelector('.player'), 
  transitionCover: document.querySelector('.transition-cover'),
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
  location: {
    el: document.querySelector('.location-indicator'),
    ctx: null,
    mark: document.querySelector('.mark'),
  },
  startButton: document.querySelector('.start-button'),
  control: document.querySelector('.control'),
  controlButtons: document.querySelectorAll('.control-button'),
  indicator: document.querySelector('.indicator'),
  texts: document.querySelectorAll('.text'),
  touchToggle: document.querySelector('.touch-toggle'),
  control: document.querySelector('.control'),
  artwork: document.querySelector('.artwork'),
  spriteFace: document.querySelector('.face'),
}

elements.drawboard.ctx = elements.drawboard.el.getContext('2d')
elements.spriteSheet.ctx = elements.spriteSheet.el.getContext('2d')
elements.location.ctx = elements.location.el.getContext('2d')

export {
  elements
}