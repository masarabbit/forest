import { px, distanceBetween } from './utils.js'
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
  animationProps() {
    Object.assign(this, {
      frameOffset: 1,
      animationTimer: null,
    })
  }
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
  noWall() {
    this.newPos = { x: this.x, y: this.y }
    this.newPos.x += this.move.x
    this.newPos.y += this.move.y

    if (this.action) this.action()

    if ([
      ...settings.npcs.filter(el => el.id !== this.id), 
      ...settings.elements].some(el => {
      return distanceBetween(el, this.newPos) <= el.buffer 
            && distanceBetween(el, this) > el.buffer
    })) return

    const buffer = 40
    const noWallX = this.move.x > 0
      ? this.newPos.x + buffer < settings.map.w 
      : this.newPos.x - buffer > 0 
    const noWallY = this.move.y > 0
      ? this.newPos.y < settings.map.h - buffer
      : this.newPos.y - buffer > 0 

    return noWallX && noWallY
  }
  walk(dir) {
    if (!dir || settings.player.pause || !settings.isWindowActive) return
    if (this.noWall(this.action)) {
      this.animateSprite(dir)
      this.x += this.move.x
      this.y += this.move.y
      this.walkToPos()
    } else {
      this.stopSprite()
    }
  }
}

class Bunny extends Sprite {
  updateMove(dir) {
    const { d } = settings
    this.move = {
      down: { x: 0, y: d },
      up: { x: 0, y: -d },
      right: { x: d, y: 0 },
      left: { x: -d, y: 0 }
    }[dir]
  }
  triggerBunnyWalk() {
    this.animationTimer = setInterval(()=> {
      if (!settings.isWindowActive) return
      const dir = ['up', 'down', 'right', 'left'][Math.floor(Math.random() * 4)]
      this.updateMove(dir)
      this.walk(dir)
      setTimeout(()=> this.walk(dir), 300)
      setTimeout(()=> this.walk(dir), 600)
      setTimeout(()=> this.stopSprite, 900)
    }, 2000)
  }
  walkToPos() {
    this.el.style.zIndex = this.y
    this.setPos()
  }
}


class Player extends Sprite {
  action() {
    const bunnyToHug = settings.npcs.find(el => el.sad && el.id !== this.id && distanceBetween(el, this.newPos) <= el.buffer)
    if (bunnyToHug) {
      this.hugBunny(bunnyToHug)
      this.stopSprite()
      return 
    }
  }
  walkToPos() {
    settings.map.positionMap()
    settings.map.setPos()
    this.el.parentNode.style.zIndex = this.y
  }
  updateControlPos(e) {
    if (settings.isDialogOpen) return

    settings.player.stopSprite()
    const { left, top } = settings.map.el.getBoundingClientRect()

    if (e.targetTouches) {
      settings.controlPos = { 
        x: e.targetTouches[0].offsetX - left,
        y: e.targetTouches[0].offsetY - top
      }
    } else {
      settings.controlPos = { 
        x: e.pageX - left,
        y: e.pageY - top
      }
    }
    elements.indicator.innerHTML = `x2: ${settings.controlPos.x} | y: ${settings.controlPos.y}`
  }
  handleWalk(e) {
    this.updateControlPos(e)
    let dir = 'right'
    const { d } = settings
    this.walkingInterval = setInterval(()=>{
      if (Math.abs(this.y - settings.controlPos.y) > 20) {
        this.move.y = this.y > settings.controlPos.y ? -d : d
        dir = this.move.y === -d ? 'up' : 'down'
      } else {
        this.move.y = 0
      }
      if (Math.abs(this.x - settings.controlPos.x) > 20) {
        this.move.x = this.x > settings.controlPos.x ? -d : d
        dir = this.move.x === -d ? 'left' : 'right'
      } else {
        this.move.x = 0
      }
      this.move.x || this.move.y
        ? this.walk(dir)
        : this.stopSprite()
    }, 150)
  }
  hugBunny(bunny) {
    const classToAdd = bunny.x > this.x ? 'hug-bear-bunny' : 'hug-bunny-bear'
    this.el.classList.add('d-none')
    bunny.el.classList.add(classToAdd)
    clearInterval(bunny.animationTimer)
    this.pause = true
    bunny.sad = false

    this.y = bunny.y
    if (classToAdd === 'hug-bear-bunny') {
      this.x = bunny.x - 40
      this.animateSprite('right')
      bunny.animateSprite('left')
    } else {
      this.x = bunny.x + 40
      this.animateSprite('left')
      bunny.animateSprite('right')
    }
    settings.map.el.classList.add('slow-transition')
    this.walkToPos()

    setTimeout(()=> {
      this.el.classList.remove('d-none')
      ;[classToAdd, 'sad'].forEach(c => bunny.el.classList.remove(c))
      bunny.stopSprite()
      bunny.triggerBunnyWalk()
      this.pause = false
      settings.map.el.classList.remove('slow-transition')
      // triggerBunnyMessage(bunny, classToAdd === 'hug-bear-bunny' ? 'happy-left' : 'happy-right')
      // updateSadBunnyCount()
    }, 1800)
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
  Ui,
  Bunny,
  Player
}