import { elements } from './elements.js'
import { walkDirections } from './data/config.js'
import { settings, player } from './state.js'
import avatars from './data/avatars.js'
import { decompress } from './utils/compression.js'
import { resizeCanvas, setPos, randomDirection } from './utils/utils.js'
import { createSpriteSheet, outputFromSpriteSheet, animateMap,   adjustMapWidthAndHeight } from './mapDraw.js'
import { addTouchAction } from './utils/touchControl.js'
import { turnSprite } from './utils/sprite.js'
import { mapData } from './data/mapData.js'
import { investigate, select, showDialog, triggerEventAnimation, walk } from './fieldActions.js'


// TODO add location map


function init() {

  settings.isWindowActive = true
  window.addEventListener('focus', ()=> settings.isWindowActive = true)
  window.addEventListener('blur', ()=> settings.isWindowActive = false)


  const transition = () =>{
    elements.transitionCover.classList.add('transition')
    player.pause = true
    setTimeout(()=> {
      elements.transitionCover.classList.remove('transition')
      player.pause = false
    }, 500)
  }

  const transport = portal => {
    transition()
    settings.mapImage.el.classList.add('transition')
    const entryPoint = mapData[settings.map.key].entry[portal]
    if (!entryPoint) return // this added to prevent error when user walks too fast

    player.pos = entryPoint.pos
    createMap(entryPoint.map)
    adjustMapWidthAndHeight()
    clearNpcs()

    setTimeout(()=> {
      settings.mapImage.el.classList.remove('transition')
      settings.map.data.forEach((code, i) => {
        outputFromSpriteSheet({ code, i })
      })
      animateMap()
      spawnNpcs()
      // createLocationMark()
      turnSprite({ 
        actor: player,
        dir: entryPoint.dir
      })
      
      checkAndTriggerEvent()
    }, 300)
  }




  const checkAndTriggerEvent = () => {
    const event = settings.map.events[player.pos]
    if (event) {
      const { gateway, act } = event
      if (gateway) setTimeout(()=> transport(gateway), 200)
      if (act && !settings.completedEvents.some(e => e === act)) {
        triggerEventAnimation(act)
      }
    }
  }



  const npcMotion = actor =>{
    if (actor.pause || !settings.isWindowActive) return

    const { motion, motionIndex: index } = actor
    if (motion === 'randomWalk') {
      walk({ actor, dir: randomDirection() })
    } else if (motion === 'randomTurn') {
      if (Math.random() < 0.5)
      turnSprite({ actor, dir: randomDirection() })
    } else if (motion.includes('facing')) {
      turnSprite({
      actor, dir: walkDirections[motion.split('-')[1]] }) //TODO possibly revisit this to simplify
    } else if (Array.isArray(motion)) {
      // if motion[index] is 0, it would be falsy so walk is skipped
      if (motion[index]) walk({ actor, dir: walkDirections[motion[index]] })
      actor.motionIndex = index === motion.length - 1 ? 0 : index + 1
    }
  }

  const clearNpcs = () => {
    if (settings.npcs.length) {
      settings.npcs.forEach(npc => {
        clearInterval(npc.interval)
        settings.mapImage.el.removeChild(npc.el)
      })
    }
    settings.npcs.length = 0
  }

  const spawnNpcs = () =>{
    const { map: { column }, d } = settings
    mapData[settings.map.key].npcs?.forEach((c, i)=>{
      const { pos, avatar, defaultDir } = c

      settings.npcs[i] = {
        ...c,
        interval: null,
        x: Math.floor(pos % column) * d,
        y: Math.floor(pos / column) * d,
        animationTimer: null,
        frameOffset: 0,
        face: avatars[avatar].face,
        el: Object.assign(document.createElement('div'), 
          { className: 'sprite-container overflow-hidden npc',
            innerHTML: `<div><div class="sprite ${avatars[avatar].sprite}"></div></div>` 
            //npc need additional div so transition isn't applied to transform: scale(-1, 1)
          }),
        // motionIndex: Array.isArray(motion) ? 0 : null, // TODO maybe fine to have this as 0
        motionIndex: 0,
        // pause: false
      }
      settings.npcs[i].sprite = settings.npcs[i].el.childNodes[0].childNodes[0]
      setPos(settings.npcs[i])
      settings.mapImage.el.appendChild(settings.npcs[i].el)   

      settings.npcs[i].interval = setInterval(()=>{
        npcMotion(settings.npcs[i])
      }, avatars[avatar].speed)

      turnSprite({
        actor: settings.npcs[i],
        dir: defaultDir
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
  }

  const displayChoiceDetails = () =>{
    elements.indicator.innerHTML = (   
      `<div>
        <p>bear textCount: ${player.textCount}</p>
        <p>bear choice: ${player.choice}</p>
        <p>bear prevchoice: ${player.prevChoice}</p>
      </div>`
    )
  }

  const handleTalk = key =>{
    if (['up', 'down', 'left', 'right', ' ', 'enter'].includes(key)) {
      const { answering, options, choice, isTalking, textCount } = player
      if (isTalking) {
        if (answering) {
          options.forEach(option => option.classList.remove('selected'))
          if (key === 'up' && choice > 0) player.choice--
          if (key === 'down' && choice < options.length - 1) player.choice++
          if ([' ', 'enter', 'right'].includes(key)) select()

          // TODO development code. remove later
          displayChoiceDetails()
          options[player.choice].classList.add('selected')
          return
        }
      }
      if ([' ', 'enter'].includes(key) || (key === 'right' && isTalking)) {
        check(textCount)
        return
      }
    }
  }


  const check = count =>{
    const event = settings.map.events[player.pos]
    if (event?.key) {
      const eventPoint = settings.map.eventContents[event.key]
      if (player.facingDirection === eventPoint.direction) {
        investigate(count, eventPoint)
        return
      }
    }
    const { column } = settings.map
    const targetDirection = { r: 1, l: -1, u: -column, d: column }[player.facingDirection[0]]
    const talkTarget = player.talkTarget || settings.npcs.find(npc => npc.pos === player.pos + targetDirection)
    if (talkTarget) showDialog({
      talkTarget, 
      dir: { r: 'left', l: 'right', u: 'down', d: 'up' }[player.facingDirection[0]]
    })
  }

  const handleWalk = dir =>{
    if (player.walkingDirection !== dir){
      clearInterval(player.walkingInterval)
      player.walkingDirection = dir
      player.walkingInterval = setInterval(()=>{
        player.walkingDirection && !settings.activeEvent
          ? walk({ actor: player, dir })
          : clearInterval(player.walkingInterval)
      }, 150)
    }
  }

  const handleKeyAction = e => {
    const key = e.key ? e.key.toLowerCase().replace('arrow','') : e
    if (player.isTalking) {
      handleTalk(key)
    } else if (e.key && e.key[0] === 'A'){
      handleWalk(key)
    } else if ([' ', 'enter'].includes(key)) {
      check(player.textCount)
    }
  }


  createSpriteSheet()


  window.addEventListener('keyup', () => {
    player.walkingDirection = null
    clearInterval(player.walkingInterval)
  })
  window.addEventListener('keydown', handleKeyAction)

  elements.controlButtons.forEach(c =>{
    c.addEventListener('click', ()=> handleKeyAction(c.dataset.c))
  })

  window.addEventListener('resize', adjustMapWidthAndHeight())

  elements.startButton.addEventListener('click', e => {
    e.preventDefault()
    player.pause = false
    elements.startButton.classList.add('disable')
    transport('start')
  })

  addTouchAction(elements.control.childNodes[1].childNodes[1], dir => walk({ actor: player, dir }))

}

window.addEventListener('DOMContentLoaded', init)

