import { elements } from '../elements.js'
import { player } from '../state.js'
import { transport, transition } from '../actions.js'
import { addEventListeners } from '../addEventListeners.js'

import { mapData } from '../data/mapData.js'

// TODO possibly change file structure to keep area, mapData and html together.

function init() {

  const start = e => {
    e.preventDefault()
    elements.transitionCover.classList.remove('intro')
    transition()
    setTimeout(()=> {
      player.pause = false
      transport({ portal: 'start', mapData })
      if (e.touches?.length) {
        elements.control.classList.remove('hide')
        elements.touchToggle.innerText = 'touch: ON'
      }
    }, 400)
  }

  ;['click', 'touchstart'].forEach(action => elements.startButton.addEventListener(action, e => start(e)))
  addEventListeners(mapData)
  
}

window.addEventListener('DOMContentLoaded', init)

