import { elements } from '../scripts/elements.js'
import { player, data } from '../scripts/state.js'
import { transport, transition } from '../scripts/actions.js'
import { addEventListeners } from '../scripts/addEventListeners.js'

// import { mapData } from './mapDataTest.js'
// import { tileData } from './tileData.js'

const { mapData, tileData } = data

function init() {

  addEventListeners({ mapData, tileData })

  elements.transitionCover.classList.remove('intro')
  transition()
  setTimeout(()=> {
    player.pause = false
    transport({ portal: 'start', mapData, tileData })
    // if (e.touches?.length) {
    //   elements.control.classList.remove('hide')
    //   elements.touchToggle.innerText = 'touch: ON'
    // }
  }, 400)
  
}

window.addEventListener('DOMContentLoaded', init)

