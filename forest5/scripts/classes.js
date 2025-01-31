import { px } from './utils.js'
import { settings, elements } from './elements.js'
import { dialogData } from './data.js'

class GameObject {
  constructor(props) {
    Object.assign(this, props)
  }
  setSize () {
    const { w, h, d } = this
    const m = d || 1
    if (w) this.el.style.width = px(w * m)
    if (h) this.el.style.height = px(h * m)
  }
  setPos () {
    Object.assign(this.el.style, { left: `${this.x}px`, top: `${this.y}px` })
  }
}

class Sprite extends GameObject {
  setBackgroundPos() {
    this.el.style.setProperty('--bx', px(this.sprite.x))
    this.el.style.setProperty('--by', px(this.sprite.y))
  }
  animateSprite(dir) {
    const h = -32 * 2
    this.sprite.y = {
      down: 0,
      up: h,
      right: h * 2,
      left: h * 3
    }[dir]
    this.frameOffset = this.frameOffset === 1 ? 2 : 1
    this.sprite.x = this.frameOffset * (2 * -20)
    this.setBackgroundPos()
  }
  stopSprite() {
    this.sprite.x = 0
    this.setBackgroundPos()
    clearInterval(this.walkingInterval)
  }
}

class Map extends GameObject {
  positionMap() {
    this.x = settings.offsetPos.x - settings.player.x
    this.y = settings.offsetPos.y - settings.player.y
  }
  updateOffset() {
    const { width, height } = elements.wrapper.getBoundingClientRect()
    settings.offsetPos = {
      x: (width / 2),
      y: (height / 2),
    }
  }
  resizeAndRepositionMap() {
    this.el.classList.add('transition')
    clearTimeout(settings.transitionTimer)
    settings.transitionTimer = setTimeout(()=> {
      this.el.classList.remove('transition')
    }, 500)
    this.updateOffset()
    this.positionMap()
    this.setPos()
  }
}

class Ui extends HTMLElement {
  displayTextGradual(text) {
    return text.split('').map((letter, i) => {
      return `<span style="animation-delay: ${i * 0.03}s">${letter}</span>`
    }).join('')
  }
  removeElement(el) {
    el.classList.add('scale-out')
    setTimeout(()=> {
      el.remove()
    }, 300)
  }
  showNextNpcText() {
    settings.dialogIndex++
    elements.dialogContainer.insertAdjacentHTML('beforeend', '<npc-text></npc-text>')
    setTimeout(elements.dialogContainer.parentNode.scrollTo({ top: elements.dialogContainer.parentNode.scrollHeight, behavior: 'smooth' }), 400)
  
    if (settings.dialogIndex === 2) {
      const text = dialogData[settings.dialogIndex] || 'test test'
      setTimeout(()=> {
        elements.dialogContainer.insertAdjacentHTML('beforeend', '<option-texts></option-texts>')
        setTimeout(()=> {
          elements.dialogContainer.parentNode.scrollTo({ top: elements.dialogContainer.parentNode.scrollHeight, behavior: 'smooth' })
        }, 400)
      }, text.length * 40)
    }
  
    if (settings.dialogIndex === 4) {
      this.removeElement(elements.dialogWindow)
      settings.isDialogOpen = false
    }
  }
}

export {
  Map,
  Sprite,
  Ui
}