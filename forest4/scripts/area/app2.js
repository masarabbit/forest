import { elements } from '../elements.js'
import { player } from '../state.js'
import { transport, transition } from '../actions.js'
import { addEventListeners } from '../addEventListeners.js'

import { mapData } from '../data/mapDataTest.js'

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

