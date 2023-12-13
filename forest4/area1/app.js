import { elements } from '../scripts/elements.js'
import { player } from '../scripts/state.js'
import { transport, transition } from '../scripts/actions.js'
import { addEventListeners } from '../scripts/addEventListeners.js'

import { mapData } from './mapData.js'
import tileData from './tileData.js'

// TODO possibly change file structure to keep area, mapData and html together.

function init() {

  const start = e => {
    e.preventDefault()
    elements.transitionCover.classList.remove('intro')
    transition()
    elements.startButton.blur()
    setTimeout(()=> {
      player.pause = false
      transport({ portal: 'start', mapData, tileData })
      if (e.touches?.length) {
        elements.control.classList.remove('hide')
        elements.touchToggle.innerText = 'touch: ON'
      }
    }, 400)
  }

  ;['click', 'touchstart'].forEach(action => elements.startButton.addEventListener(action, e => start(e)))
  addEventListeners({ mapData, tileData })
  
}

window.addEventListener('DOMContentLoaded', init)

