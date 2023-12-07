import { elements } from '../scripts/elements.js'
import { player } from '../scripts/state.js'
import { transport, transition } from '../scripts/actions.js'
import { addEventListeners } from '../scripts/addEventListeners.js'

import { mapData } from './mapDataTest.js'

function init() {

  addEventListeners(mapData)

  elements.transitionCover.classList.remove('intro')
  transition()
  setTimeout(()=> {
    player.pause = false
    transport({ portal: 'start', mapData })
    // if (e.touches?.length) {
    //   elements.control.classList.remove('hide')
    //   elements.touchToggle.innerText = 'touch: ON'
    // }
  }, 400)
  
}

window.addEventListener('DOMContentLoaded', init)

