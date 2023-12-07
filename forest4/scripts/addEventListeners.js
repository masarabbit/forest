
import { elements } from './elements.js'

import { settings, player } from './state.js'
import { createSpriteSheet, adjustMapWidthAndHeight } from './mapDraw.js'
import { addTouchAction } from './utils/touchControl.js'
import { walk } from './actions.js'
import { handleKeyAction } from './handleKeyAction.js'


const addEventListeners = mapData => {
  settings.isWindowActive = true
  window.addEventListener('focus', ()=> settings.isWindowActive = true)
  window.addEventListener('blur', ()=> settings.isWindowActive = false)
  
  createSpriteSheet()

  window.addEventListener('keyup', () => {
    player.walkingDirection = null
    clearInterval(player.walkingInterval)
  })
  window.addEventListener('keydown', e => handleKeyAction({ e, mapData }))

  elements.controlButtons.forEach(c =>{
    c.addEventListener('click', ()=> handleKeyAction({ e: c.dataset.c, mapData}))
  })

  window.addEventListener('resize', adjustMapWidthAndHeight)

  addTouchAction(elements.control.childNodes[1].childNodes[1], dir => walk({ mapData, actor: player, dir }))

  elements.touchToggle.addEventListener('click', e => {
    e.preventDefault()
    // not using deactivate here because deactivate gets triggered elsewhere
    elements.control.classList.toggle('hide')
    elements.touchToggle.innerText = elements.touchToggle.innerText === 'touch: ON' ? 'touch: OFF' : 'touch: ON'
  })
}

export {
  addEventListeners
}