
  const transitionCover = document.querySelector('.transition_cover')
  const touchToggle = document.querySelector('.touch_toggle')
  const control = document.querySelector('.control')
  const controlButtons = document.querySelectorAll('.control_button')
  const wrapper = document.querySelector('.wrapper')
  const mapContainer = document.querySelector('.map_container') // TODO possibly rename
  const mapCover = document.querySelector('.map_cover')
  const mapImage = document.querySelector('.map_image')
  const location = document.querySelector('.location_indicator')
  const spriteContainer = document.querySelector('.sprite_container')
  const texts = document.querySelectorAll('.text')
  const sprite = document.querySelector('.sprite')
  const indicator = document.querySelector('.indicator')
  const spriteFace = document.querySelector('.face')
  const elements = {
    ctx: null,
    animCtx: null,
    spriteSheets: document.querySelectorAll('.sprite_sheet'),

  transitionCover: document.querySelector('.transition_cover'),
  touchToggle: document.querySelector('.touch_toggle'),
  control: document.querySelector('.control'),
  controlButtons: document.querySelectorAll('.control_button'),
  wrapper: document.querySelector('.wrapper'),
  mapContainer: document.querySelector('.map_container'), // TODO possibly rename
  mapCover: document.querySelector('.map_cover'),
  mapImage: document.querySelector('.map_image'),
  location: document.querySelector('.location_indicator'),
  spriteContainer: document.querySelector('.sprite_container'),
  texts: document.querySelectorAll('.text'),
  sprite: document.querySelector('.sprite'),
  indicator: document.querySelector('.indicator'),
  spriteFace: document.querySelector('.face')
  }


  
  export {
    transitionCover,
    touchToggle,
    control,
    controlButtons,
    wrapper,
    mapContainer,
    mapCover,
    mapImage,
    location,
    spriteContainer,
    texts,
    sprite,
    indicator,
    spriteFace,
    elements,
  }