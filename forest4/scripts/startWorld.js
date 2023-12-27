import { elements } from '../scripts/elements.js'
import { player } from '../scripts/state.js'
import { transport, transition } from '../scripts/actions.js'
import { addEventListeners } from '../scripts/addEventListeners.js'


const startWorld = autoStart => {

  const start = e => {
    e?.preventDefault()
    elements.transitionCover.classList.remove('intro')
    transition()
    elements.startButton.blur()
    setTimeout(()=> {
      player.pause = false
      elements.wrapper.classList.remove('hidden')
      transport('start')
      if (e?.touches?.length) {
        elements.control.classList.remove('hide')
        elements.touchToggle.innerText = 'touch: ON'
      }
    }, 400)
  }

  autoStart 
    ? start()
    : elements.transitionCover.classList.add('intro')

  ;['click', 'touchstart'].forEach(action => elements.startButton.addEventListener(action, e => start(e)))
  addEventListeners()
}




// function init() {

//   const start = e => {
//     e.preventDefault()
//     elements.transitionCover.classList.remove('intro')
//     transition()
//     elements.startButton.blur()
//     setTimeout(()=> {
//       player.pause = false
//       transport({ portal: 'start', mapData, tileData })
//       if (e.touches?.length) {
//         elements.control.classList.remove('hide')
//         elements.touchToggle.innerText = 'touch: ON'
//       }
//     }, 400)
//   }

//   ;['click', 'touchstart'].forEach(action => elements.startButton.addEventListener(action, e => start(e)))
//   addEventListeners({ mapData, tileData })
  
// }

// window.addEventListener('DOMContentLoaded', init)

export default startWorld
