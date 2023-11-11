import { elements } from './elements.js'
import { settings, player } from './state.js'
import avatars from './data/avatars.js'
import { decompress } from './utils/compression.js'
import { clampMax, resizeCanvas, setStyles, setPos } from './utils/utils.js'
import { createSpriteSheet, outputFromSpriteSheet, animateMap } from './mapDraw.js'
import { addTouchAction } from './utils/touchControl.js'
import { turnSprite } from './utils/sprite.js'
import { mapData } from './data/mapData.js'


function init() {

  settings.isWindowActive = true
  window.addEventListener('focus', ()=> settings.isWindowActive = true)
  window.addEventListener('blur', ()=> settings.isWindowActive = false)

  const mapX = () => player.pos % settings.map.column 
  const mapY = () => Math.floor(player.pos / settings.map.column)

  const getMapCoord = para => (Math.floor(settings.map[para] / 2) - 1) * settings.d

  const adjustMapWidthAndHeight = () =>{
    const { offsetWidth: w, offsetHeight: h } = elements.wrapper
    const { d } = settings

    settings.map.w = 2 * Math.floor((clampMax(w, 800) / d) / 2)
    settings.map.h = 2 * Math.floor((clampMax(h, 600) / d) / 2)
    setStyles(settings.map)

    const x = getMapCoord('w')
    const y = getMapCoord('h')
    
    setPos({ el: elements.player, x, y })
    
    // adjust mapPosition
    settings.mapImage.x = mapX() * -d + x
    settings.mapImage.y = mapY() * -d + y
    setStyles(settings.mapImage)
  }

  const noWall = pos =>{    
    const {
        // spawnData, 
        data } = settings.map
    if (!data[pos] || player.pos === pos 
      // || spawnData.some(s => s.pos === pos)
      ) return false

    return settings.map.walls[pos] !== '$'
  }

  const walk = (actor, dir) => {
    // if (!dir || bear.pause) return
    // const isBear = actor === bear

    const { map: { column }, d } = settings
    turnSprite({ dir, actor, animate: true })

    const { diff, para, dist } = {
      right: { diff: 1, para: 'x', dist: -d },
      left: { diff: -1, para: 'x', dist: d },
      up: { diff: -column, para: 'y', dist: d },
      down: { diff: column, para: 'y', dist: -d }
    }[dir] 

    // console.log(diff, para, dist, settings.mapXY)
    if (noWall(actor.pos + diff)) {
      settings.mapImage[para] += dist
      actor.pos += diff
      setStyles(settings.mapImage)
    }


    // if (noWall(actor.pos + diff)) { 
    //   if (isBear) {
    //     setPos(para, (para === 'left' ? x : y ) + dist)
    //     actor.pos += diff
        
    //     // trigger event based on bear position
    //     checkAndTriggerEvent()
    //     elements.indicator.innerHTML = `x:${x} y:${y} pos:${bear.pos} dataX:${mapX()} dataY:${mapY()}`
    //     setTargetPos(elements.mark, mapX() * 4, mapY() * 4)
    //   } else {
    //     actor[para] -= dist // note that dist needs to be flipped around
    //     actor.spawn.parentNode.style[para] = `${actor[para]}px`
    //     actor.pos += diff
    //   } 
    // }  
  }

  const npcMotion = npc =>{
    // const { spawnData, sprites } = map
    const { pause, motion, motionIndex: index } = npc
    console.log('npc', npc, pause, motion, index)
    if (pause || !settings.isWindowActive) return
    // if (motion === 'randomWalk') {
    //   spriteWalk({
    //     dir: randomDirection(),
    //     actor: spawnData[i], sprite: sprites[i], 
    //   })
    // } else if (motion === 'randomTurn') {
    //   if (Math.random() < 0.5)
    //   turnSprite({
    //     e: randomDirection(), 
    //     actor: spawnData[i], sprite: sprites[i],
    //   })
    // } else if (motion.includes('facing')) {
    //   turnSprite({
    //     e: walkDirections[motion.split('-')[1]], 
    //     actor: spawnData[i], sprite: sprites[i],
    //   })
    // } else if (Array.isArray(motion)) {
    //   // if motion[index] is 0, it would be falsy so spriteWalk is skipped
    //   if (motion[index]) spriteWalk({
    //     dir: walkDirections[motion[index]],
    //     actor: spawnData[i], sprite: sprites[i], 
    //   })
    //   spawnData[i].motionIndex = index === motion.length - 1 ? 0 : index + 1
    // }
  }

  const spawnNpcs = () =>{
    if (settings.npcs.length) settings.npcs.forEach(npc => clearInterval(npc.interval))
    settings.npcs.length = 0
    // elements.mapImage.innerHTML = '' // TODO need to clear old sprites from elements.mapImage
    const { map: { column }, d } = settings

    mapData[settings.map.key].npcs?.forEach((c, i)=>{
      const { pos, avatar, motion, defaultDir } = c

      settings.npcs[i] = {
        ...c,
        interval: null,
        x: Math.floor(pos % column) * d,
        y: Math.floor(pos / column) * d,
        animationTimer: null,
        frameOffset: 0,
        face: avatars[avatar].face,
        el: Object.assign(document.createElement('div'), 
          { className: 'sprite-container overflow-hidden',
            innerHTML: `<div class="sprite ${avatars[avatar].sprite}"></div>`
          }),
        motionIndex: Array.isArray(motion) ? 0 : null,
        pause: false
      }
      settings.npcs[i].sprite = settings.npcs[i].el.childNodes[0]
      setPos(settings.npcs[i])

      settings.mapImage.el.appendChild(settings.npcs[i].el)   
      npcMotion(settings.npcs[i])
      // settings.npcs[i].interval = setInterval(()=>{
      //   npcMotion(i)
      // }, avatars[avatar].speed)

      turnSprite({
        dir: defaultDir, 
        actor: settings.npcs[i]
      })
    })
  }
  



  const setUpCanvas = ({ canvas, w, h }) => {
    resizeCanvas({
      canvas: canvas.el,
      w, h
    })
    canvas.ctx = canvas.el.getContext('2d')
    canvas.ctx.imageSmoothingEnabled = false
  }



  const createMap = key => {
    console.log('create')
    settings.map = {
      ...settings.map,
      ...mapData[key],
      key,
      d: settings.d,
      data: decompress(mapData[key].map),
      walls: decompress(mapData[key].walls),
      column: mapData[key].w, // column and row remains static, while w, and h adapts to screenWidth
      row: mapData[key].h,
    }
    const { w, h, d } = settings.map
    settings.mapImage.w = w * d
    settings.mapImage.h = h * d

    setUpCanvas({
      canvas: elements.mapImage,
      w: w * d, 
      h: h * d
    })

    settings.map.data.forEach((code, i) => {
      outputFromSpriteSheet({ code, i })
    })
    animateMap()
    adjustMapWidthAndHeight()
    spawnNpcs()
  }



  window.addEventListener('resize', ()=> {
    adjustMapWidthAndHeight()
  })

  createSpriteSheet()

  elements.startButton.addEventListener('click', () => createMap('one'))

  addTouchAction(elements.control.childNodes[1].childNodes[1], dir => {
    walk(player, dir)
  })

}

window.addEventListener('DOMContentLoaded', init)

