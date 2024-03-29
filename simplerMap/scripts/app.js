// import { elements } from './elements.js'
import { setStyles } from './utils/utils.js'
import { addTouchAction } from './utils/touchControl.js'
import { decompress } from './utils/compression.js'

function init() {
  console.log('test')

  const elements = {
    wrapper: document.querySelector('.wrapper'),
    mapCover: document.querySelector('.map-cover'), 
    player: document.querySelector('.player'), 
    mapImage: {
      el: document.querySelector('.map-image'),
      ctx: null,
    },
    control: document.querySelector('.control'),
    controlButtons: document.querySelectorAll('.control-button'),
    indicator: document.querySelector('.indicator'),
    touchToggle: document.querySelector('.touch-toggle'),
  }

  const player = {
    pos: {
      x: 0,
      y: 0,
    },
    frameOffset: 0,
    animationTimer: null,
    el: elements.player,
    sprite: document.querySelector('.player').childNodes[1],
    facingDirection: 'down',
    walkingDirection: '',
    walkingInterval: null,
    pause: false,
  }


  const settings = {
    d: 32,
    offsetPos: {
      x: 0, y: 0,
    },
    npcs: [],
    mapData: {
      column: 30,
      row: 20,
      walls: '$31,28,$2,28,$2,28,$2,12,$6,10,$2,12,$6,10,$2,12,$6,10,$2,12,$3,1,$2,10,$2,28,$2,28,$2,28,$2,28,$2,28,$2,28,$2,4,$6,18,$2,4,$6,18,$2,4,$6,18,$2,4,$2,1,$3,8,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$5,5,$2,18,$2,1,$2,5,$2,28,$2,28,$2,28,$2,28,$2,28,$2,28,$2,28,$2,28,$31',
      pos: {
        x: 64, y: 64,
      }
    },
    map: {
      el: document.querySelector('.map-image-wrapper'),
      canvas: document.querySelector('.map-image'),
      walls: [],
      w: 30 * 32,
      h: 40 * 32,
    }, 
    mapImage: {
      el: elements.mapImage.el.parentNode,
      canvas: elements.mapImage.el,
      x: 0,
      y: 0,
      w: 0,
      h: 0
    },
    transitionTimer: null
  }


  const setSpritePos = (n, actor) =>{
    actor.spritePos = n
    // this can't be set with translate, because translate is used to flip sprites too.
    actor.sprite.style.marginLeft = `${n}px`
  }

  const frames = {
    right: [4, 6, 5, 'add'],
    left: [4, 6, 5, 'remove'],
    up: [2, 2, 3, 'toggle'],
    down: [0, 0, 1, 'toggle']
  }


  const turnSprite = ({ dir, actor, animate }) => {
    actor.facingDirection = dir
    const { frameOffset } = actor
    const { d } = settings
    let m = -d
    m = animate ? m * frames[dir][0 + frameOffset] : m * frames[dir][2]
    actor.frameOffset = frameOffset === 0 ? 1 : 0
    actor.el.classList[frames[dir][3]]('right') 
  
    clearTimeout(actor.animationTimer)
    actor.animationTimer = setTimeout(()=>setSpritePos(-d * frames[dir][2], actor), 100)
    setSpritePos(m, actor)
  }


  const getWalkConfig = dir => {
    const { d } = settings
    return {
      right: { para: 'x', dist: d },
      left: { para: 'x', dist: -d },
      up: { para: 'y', dist: -d },
      down: { para: 'y', dist: d }
    }[dir] 
  }

  
  const updateOffset = () => {
    const { width, height } = elements.wrapper.getBoundingClientRect()
    settings.offsetPos = {
      x: (width / 2) - 16,
      y: (height / 2) - 16,
    }
  }

  const positionMapImage = () => {
    settings.mapImage.x = settings.offsetPos.x - player.pos.x
    settings.mapImage.y = settings.offsetPos.y - player.pos.y
  }

  const noWall = pos =>{    
    // const { map: { data }, npcs } = settings
    // if (!data[pos] || player.pos === pos || npcs.some(s => s.pos === pos)) return false
    return settings.map.walls[pos] !== '$'
  }

  
  const walk = (actor, dir) => {
    if (!dir || player.pause) return
  
    turnSprite({ dir, actor, animate: true })
    const { para, dist } = getWalkConfig(dir) 
  
    // if (noWall(actor.pos + diff)) {
    if (actor === player) {
      player.pos[para] += dist
      positionMapImage()
      setStyles(settings.mapImage)
      elements.indicator.innerHTML = `x:${player.pos.x} | y:${player.pos.y}`
    } 
    // }
  }

  const resizeAndRepositionMap = () => {
    settings.mapImage.el.classList.add('transition')
    clearTimeout(settings.transitionTimer)
    settings.transitionTimer = setTimeout(()=> {
      settings.mapImage.el.classList.remove('transition')
    }, 500)
    updateOffset()
    positionMapImage()
    setStyles(settings.mapImage)
  }

  const handleWalk = dir =>{
    if (player.walkingDirection !== dir){
      clearInterval(player.walkingInterval)
      player.walkingDirection = dir
      player.walkingInterval = setInterval(()=>{
        player.walkingDirection && !settings.activeEvent
          ? walk(player, dir)
          : clearInterval(player.walkingInterval)
      }, 150)
    }
  }

  settings.map.walls = decompress( settings.mapData.walls)

  player.pos.x = settings.mapData.pos.x
  player.pos.y = settings.mapData.pos.y
  setStyles(settings.map)

  addTouchAction(elements.control.childNodes[1].childNodes[1], dir => walk(player, dir))

  window.addEventListener('keydown', e => handleWalk(e.key.toLowerCase().replace('arrow','')))
  window.addEventListener('keyup', () => {
    player.walkingDirection = null
    clearInterval(player.walkingInterval)
  })

  window.addEventListener('resize', resizeAndRepositionMap)
  resizeAndRepositionMap()
}

window.addEventListener('DOMContentLoaded', init)
