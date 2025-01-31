import {
  getRandomPos,
} from './utils.js'

import { Sprite, Map } from './classes.js'

import {
  elements,
  settings
} from './elements.js'

import defineCustomElements from './customElements.js'

function init() {  
  
  defineCustomElements()
  
  settings.map = new Map({
    walls: [],
    w: 20 * 50,
    h: 20 * 50,
    x: 0, y: 0,
  })

  customElements.define('map-el',
    class extends HTMLElement {
      constructor() {
        super()
        this.className = 'map-wrapper overflow-hidden'
        this.innerHTML = '<div class="map"></div>'
      }
      connectedCallback() {
        settings.map.el = this.querySelector('.map')
      }
    })

  //* map


  
  const player = new Sprite({
    id: 'bear',
    x: getRandomPos('w'),
    y: getRandomPos('h'),
    frameOffset: 1,
    animationTimer: null,
    el: elements.player,
    sprite: {
      el: document.querySelector('.player').childNodes[1],
      x: 0, y: 0
    },
    walkingDirection: '',
    walkingInterval: null,
    pause: false,
    buffer: 20,
    move: { x: 0, y: 0 }
  })

  settings.player = player
  player.el.style.zIndex = player.y



  // const addTree = () => {
  //   const tree = {
  //     id: `tree-${settings.elements.length + 1}`,
  //     x: getRandomPos('w'), y: getRandomPos('h'),
  //     el: Object.assign(document.createElement('div'), 
  //     { 
  //       className: 'tree',
  //       innerHTML: '<div></div>' 
  //     }),
  //     buffer: 40,
  //   }
  //   settings.elements.push(tree)
  //   settings.map.el.appendChild(tree.el)
  //   tree.el.style.zIndex = tree.y
  //   setPos(tree)
  // }


  const noWall = actor => {
    const newPos = {...actor}
    newPos.x += actor.move.x
    newPos.y += actor.move.y
    // if (actor === player && !player.pause) {
    //   const bunnyToHug = settings.bunnies.find(el => el.sad && el.id !== actor.id && distanceBetween(el, newPos) <= el.buffer)
    //   if (bunnyToHug) {
    //     hugBunny(bunnyToHug)
    //     stopSprite(player)
    //     return 
    //   }
    // } 
    // if ([
    //   ...settings.bunnies.filter(el => el.id !== actor.id), 
    //   ...settings.elements].some(el => {
    //   return distanceBetween(el, newPos) <= el.buffer 
    //         && distanceBetween(el, actor) > el.buffer
    // })) return

    const buffer = 40
    const noWallX = actor.move.x > 0
      ? newPos.x + buffer < settings.map.w 
      : newPos.x - buffer > 0 
    const noWallY = actor.move.y > 0
      ? newPos.y < settings.map.h - buffer
      : newPos.y - buffer > 0 

    return noWallX && noWallY
  }


  const walk = (actor, dir) => {
    if (!dir || player.pause || !settings.isWindowActive) return
    if (noWall(actor)) {
      actor.animateSprite(dir)
      actor.x += actor.move.x
      actor.y += actor.move.y
      if (actor === player) {
        settings.map.positionMap()
        settings.map.setPos()
        player.el.parentNode.style.zIndex = player.y
      } else {
        player.setPos()
        actor.el.style.zIndex = actor.y
      }
    } else {
      actor.stopSprite()
    }
  }



  
  const handleWalk = () =>{
    let dir = 'right'
    const { d } = settings

      player.walkingInterval = setInterval(()=>{
      if (Math.abs(player.y - settings.controlPos.y) > 20) {
        player.move.y = player.y > settings.controlPos.y ? -d : d
        dir = player.move.y === -d ? 'up' : 'down'
      } else {
        player.move.y = 0
      }
      if (Math.abs(player.x - settings.controlPos.x) > 20) {
        player.move.x = player.x > settings.controlPos.x ? -d : d
        dir = player.move.x === -d ? 'left' : 'right'
      } else {
        player.move.x = 0
      }

      player.move.x || player.move.y
        ? walk(player, dir)
        : player.stopSprite()
    }, 150)
  }



  document.addEventListener('click', e => {
    if (settings.isDialogOpen) return

    player.stopSprite()
    const { left, top } = settings.map.el.getBoundingClientRect()

    if (e.targetTouches) {
      settings.controlPos = { 
        x: e.targetTouches[0].offsetX - left,
        y: e.targetTouches[0].offsetY - top
      }
    } else {
      settings.controlPos = { 
        x: e.pageX - left,
        y: e.pageY - top
      }
    }
    elements.indicator.innerHTML = `x2: ${settings.controlPos.x} | y: ${settings.controlPos.y}`

    handleWalk()
  })

  // const elAngle = pos => {
  //   const { x, y } = pos
  //   const angle = radToDeg(Math.atan2(y - player.y, x - player.x)) - 90
  //   return Math.round(angle)
  // }


  window.addEventListener('focus', ()=> settings.isWindowActive = true)
  window.addEventListener('blur', ()=> settings.isWindowActive = false)


  window.addEventListener('resize', ()=> settings.map.resizeAndRepositionMap())




  settings.map.setSize()

  settings.map.resizeAndRepositionMap()
}

window.addEventListener('DOMContentLoaded', init)

