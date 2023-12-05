import { elements } from './elements.js'

import { settings, player } from './state.js'
import { createSpriteSheet, adjustMapWidthAndHeight } from './mapDraw.js'
import { addTouchAction } from './utils/touchControl.js'
import { investigate, select, showDialog, walk, transport, transition } from './actions.js'


function init() {

  settings.isWindowActive = true
  window.addEventListener('focus', ()=> settings.isWindowActive = true)
  window.addEventListener('blur', ()=> settings.isWindowActive = false)


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

  window.addEventListener('resize', adjustMapWidthAndHeight)

  const start = e => {
    e.preventDefault()
    elements.transitionCover.classList.remove('intro')
    transition()
    elements.startButton.blur()
    setTimeout(()=> {
      player.pause = false
      transport('start')
      if (e.touches?.length) {
        elements.control.classList.remove('hide')
        elements.touchToggle.innerText = 'touch: ON'
      }
    }, 400)
  }

  ;['click', 'touchstart'].forEach(action => elements.startButton.addEventListener(action, e => start(e)))

  addTouchAction(elements.control.childNodes[1].childNodes[1], dir => walk({ actor: player, dir }))

  elements.touchToggle.addEventListener('click', e => {
    e.preventDefault()
    // not using deactivate here because deactivate gets triggered elsewhere
    elements.control.classList.toggle('hide')
    elements.touchToggle.innerText = elements.touchToggle.innerText === 'touch: ON' ? 'touch: OFF' : 'touch: ON'
  })

}

window.addEventListener('DOMContentLoaded', init)

