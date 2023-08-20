


  const elements = {
    ctx: null,
    locationCtx: null,
    spriteSheets: document.querySelectorAll('.sprite_sheet'),
    transitionCover: document.querySelector('.transition_cover'),
    eventCover: document.querySelector('.event_cover'),
    touchToggle: document.querySelector('.touch_toggle'),
    control: document.querySelector('.control'),
    controlButtons: document.querySelectorAll('.control_button'),
    wrapper: document.querySelector('.wrapper'),
    mapContainer: document.querySelector('.map_container'), // TODO possibly rename
    mapCover: document.querySelector('.map_cover'),
    mapImage: document.querySelector('.map_image'),
    location: document.querySelector('.location_indicator'),
    mark: null,
    spriteContainer: document.querySelector('.sprite_container'),
    texts: document.querySelectorAll('.text'),
    sprite: document.querySelector('.sprite'),
    indicator: document.querySelector('.indicator'),
    spriteFace: document.querySelector('.face'),
    startButton: document.querySelector('.start_button'),
  }

  export {
    elements,
  }