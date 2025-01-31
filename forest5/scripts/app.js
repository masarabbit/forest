import { randomN, getRandomPos } from './utils.js'
import { Map, Bunny, Player, WorldObject } from './classes.js'
import { elements, settings } from './elements.js'

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


  const addPlayer = ({ x, y }) => {
    const player = new Player({
      id: 'bear',
      x, y,
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
    player.animationProps()
  }

  const addToWorld = ({ x, y, type, buffer=40 }) => {
    const el = new WorldObject({
      id: `${type}-${settings.elements.length + 1}`,
      x, y,
      el: Object.assign(document.createElement('div'), 
      { 
        className: `object ${type}`,
        innerHTML: '<div></div>' 
      }),
      buffer,
    })
    el.addToWorld()
  }

  // const addTree = ({ x, y }) => {
  //   const tree = new WorldObject({
  //     id: `tree-${settings.elements.length + 1}`,
  //     x, y,
  //     el: Object.assign(document.createElement('div'), 
  //     { 
  //       className: 'tree',
  //       innerHTML: '<div></div>' 
  //     }),
  //     buffer: 40,
  //   })
  //   tree.addToWorld()
  // }


  const addBunny = ({ x, y }) => {
    const bunny = new Bunny({
      id: `bunny-${settings.npcs.length + 1}`,
      x, y,
      el: Object.assign(document.createElement('div'), 
      { 
        className: 'sprite-container sad',
        innerHTML: '<div class="bunny sprite"></div>'
      }),
      sprite: {
        el: null,
        x: 0, y: 0
      },
      sad: true,
      buffer: 20,
    })

    settings.npcs.push(bunny)
    settings.map.el.appendChild(bunny.el)
    bunny.sprite.el = bunny.el.childNodes[0]
    bunny.el.style.zIndex = bunny.y
    bunny.animationProps()
    bunny.setPos()
    if (randomN(2) === 2) bunny.triggerBunnyWalk()
  }
  
  addPlayer({ 
    x: settings.map.w / 2, 
    y: settings.map.h / 2, 
  })
  addBunny({ x: getRandomPos('w'), y: getRandomPos('h') })

  addToWorld({ x: getRandomPos('w'), y: getRandomPos('h'), type: 'tree' })

  addToWorld({ x: getRandomPos('w'), y: getRandomPos('h'), type: 'building' })





  document.addEventListener('click', e => settings.player.handleWalk(e))

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

