
function init() {
  const elements = {
    wrapper: document.querySelector('.wrapper'),
    mapCover: document.querySelector('.map-cover'), 
    bear: document.querySelector('.sprite-container'), 
    spriteCheck: document.querySelector('.sprite-check'), 
  }

  const settings = {
    d: 32,
    map: {
      el: elements.mapCover, 
    }, 
  }

  const mapData = {
    one: {
      w: 30,
      h: 20,
    }
  }

  const px = n => `${n}px`
  const clampMax = (n, max) =>  n < max ? n : max

  const getCenterOfMap = () => Math.floor((settings.map.w * settings.map.h) / 2) - Math.floor((settings.map.w / 2)) - 1

  const adjustMapWidthAndHeight = () =>{
    const { offsetWidth: w, offsetHeight: h } = elements.wrapper
    const { d } = settings
    settings.map.w = Math.floor((clampMax(w, 800) / d))
    settings.map.h = Math.floor((clampMax(h, 600) / d))
    setStyles(settings.map)
    
    // position bear on center of map
    const pos = getCenterOfMap()
    setStyles({
      el: elements.bear,
      x: pos % settings.map.w * d,
      y: Math.floor(pos / settings.map.w) * d
    })

    setStyles({
      el: elements.spriteCheck,
      x: (Math.floor(settings.map.w / 2)) * d,
      y: (Math.floor(settings.map.h / 2) - 2) * d
    })
  }

  const setStyles = ({ el, x, y, w, h, d }) => {
    const m = d || 1
    if (w) el.style.width = px(w * m)
    if (h) el.style.height = px(h * m)
    el.style.transform = `translate(${x ? px(x) : 0}, ${y ? px(y) : 0})`
  }

  const createMap = key => {
    settings.map = {
      ...settings.map,
      ...mapData[key],
      key,
      d: settings.d
    }
    adjustMapWidthAndHeight()
  }

  createMap('one')

  window.addEventListener('resize', ()=> {
    adjustMapWidthAndHeight()
  })
}

window.addEventListener('DOMContentLoaded', init)

