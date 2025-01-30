import {
  getRandomPos,
  px,
  setPos,
  setSize
} from './utils.js'

import {
  elements,
  settings
} from './elements.js'

function init() {  


  const dialogData = [
    'Hi! Welcome to Masa land',
    'Here, you can walk around by touching or clicking on the map',
    'test test test 3'
  ]

  customElements.define('dialog-window',
    class extends HTMLElement {
      constructor() {
        super()
        this.innerHTML = `
          <div class="inner-dialog-wrapper">
            <div class="inner-dialog">
              <npc-text></npc-text>
            </div>  
          </div>  
          <div class="dialog-nav">
            <next-btn></next-btn>
          </div>
        `
        this.className = 'dialog-window'
    }
    connectedCallback () {
      elements.dialogContainer = this.querySelector('.inner-dialog')
      elements.dialogWindow = this
    }
  })

  const removeElement = el => {
    el.classList.add('scale-out')
    setTimeout(()=> {
      el.remove()
    }, 300)
  }

  const positionMap = () => {
    settings.map.x = settings.offsetPos.x - player.x
    settings.map.y = settings.offsetPos.y - player.y
  }

  const showNextNpcText = () => {
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
      removeElement(elements.dialogWindow)
      settings.isDialogOpen = false
    }
  }

  customElements.define('next-btn',
    class extends HTMLElement {
      constructor() {
        super()
        this.innerHTML = `
          next
        `
        this.className = 'next btn'
    }
    connectedCallback () {
      this.addEventListener('click', showNextNpcText)
    }
  })

  const updateOffset = () => {
    const { width, height } = elements.wrapper.getBoundingClientRect()
    settings.offsetPos = {
      x: (width / 2),
      y: (height / 2),
    }
  }

  const displayTextGradual = text =>{
    return text.split('').map((letter, i) => {
      return `<span style="animation-delay: ${i * 0.03}s">${letter}</span>`
    }).join('')
  }

  customElements.define('npc-text',
    class extends HTMLElement {
      constructor() {
        super()
        this.innerHTML = `
          <div class="text-wrapper">
            <div class="npc text">${displayTextGradual(dialogData[settings.dialogIndex] || 'test test')}</div>
          </div>
          <character-icon></character-icon>
        `
        this.className = 'npc-text'
    }
  })

  customElements.define('option-texts',
    class extends HTMLElement {
      constructor() {
        super()
        this.innerHTML = `
          ${['yes', 'no'].map((option, i) => `<button class="btn option-${i + 1}">${option}</button>`).join('')}
        `
        this.className = 'option-texts'
    }
    connectedCallback () {
      this.querySelector('.option-1').addEventListener('click', e => {
        settings.dialogOption = 'option-1'
        console.log('yes')
        showNextNpcText()
        e.target.classList.add('selected')
        // removeElement(this)
      })

      this.querySelector('.option-2').addEventListener('click', ()=> {
        settings.dialogOption = 'option-2'
        console.log('no')
        showNextNpcText()
        e.target.classList.add('selected')
        // removeElement(this)
      })
    
    }
  })


  customElements.define('character-icon',
    class extends HTMLElement {
      constructor() {
        super()
        this.innerHTML = `
        :)
        `
        this.className = 'character-icon'
    }
  })



  //* map


  
  const player = {
    id: 'bear',
    x: 0, y: 0,
    frameOffset: 1,
    animationTimer: null,
    el: elements.player,
    sprite: {
      el: document.querySelector('.player').childNodes[1],
      x: 0, y: 0
    },
    walkingDirection: '',
    walkingInterval: null,
    pause: false,
    buffer: 20,
    move: { x: 0, y: 0 }
  }



  // const addTree = () => {
  //   const tree = {
  //     id: `tree-${settings.elements.length + 1}`,
  //     x: getRandomPos('w'), y: getRandomPos('h'),
  //     el: Object.assign(document.createElement('div'), 
  //     { 
  //       className: 'tree',
  //       innerHTML: '<div></div>' 
  //     }),
  //     buffer: 40,
  //   }
  //   settings.elements.push(tree)
  //   settings.map.el.appendChild(tree.el)
  //   tree.el.style.zIndex = tree.y
  //   setPos(tree)
  // }

  const setBackgroundPos = ({ el, x, y }) => {
    el.style.setProperty('--bx', px(x))
    el.style.setProperty('--by', px(y))
  }

  const noWall = actor => {
    const newPos = {...actor}
    newPos.x += actor.move.x
    newPos.y += actor.move.y
    // if (actor === player && !player.pause) {
    //   const bunnyToHug = settings.bunnies.find(el => el.sad && el.id !== actor.id && distanceBetween(el, newPos) <= el.buffer)
    //   if (bunnyToHug) {
    //     hugBunny(bunnyToHug)
    //     stopSprite(player)
    //     return 
    //   }
    // } 
    // if ([
    //   ...settings.bunnies.filter(el => el.id !== actor.id), 
    //   ...settings.elements].some(el => {
    //   return distanceBetween(el, newPos) <= el.buffer 
    //         && distanceBetween(el, actor) > el.buffer
    // })) return

    const buffer = 40
    const noWallX = actor.move.x > 0
      ? newPos.x + buffer < settings.map.w 
      : newPos.x - buffer > 0 
    const noWallY = actor.move.y > 0
      ? newPos.y < settings.map.h - buffer
      : newPos.y - buffer > 0 

    return noWallX && noWallY
  }

  const animateSprite = (actor, dir) => {
    const h = -32 * 2
    actor.sprite.y = {
      down: 0,
      up: h,
      right: h * 2,
      left: h * 3
    }[dir]
    actor.frameOffset = actor.frameOffset === 1 ? 2 : 1
    actor.sprite.x = actor.frameOffset * (2 * -20)
    setBackgroundPos(actor.sprite)
  }

  const walk = (actor, dir) => {
    if (!dir || player.pause || !settings.isWindowActive || settings.isDialogOpen) return
    if (noWall(actor)) {
      animateSprite(actor, dir)
      actor.x += actor.move.x
      actor.y += actor.move.y
      if (actor === player) {
        positionMap()
        setPos(settings.map)
        player.el.parentNode.style.zIndex = player.y
      } else {
        setPos(actor)
        actor.el.style.zIndex = actor.y
      }
    } else {
      stopSprite(actor)
    }
  }

  const resizeAndRepositionMap = () => {
    settings.map.el.classList.add('transition')
    clearTimeout(settings.transitionTimer)
    settings.transitionTimer = setTimeout(()=> {
      settings.map.el.classList.remove('transition')
    }, 500)
    updateOffset()
    positionMap()
    setPos(settings.map)
  }

  const stopSprite = actor => {
    actor.sprite.x = 0
    setBackgroundPos(actor.sprite)
    clearInterval(actor.walkingInterval)
  }
  
  const handleWalk = () =>{
    let dir = 'right'
    const { d } = settings

      player.walkingInterval = setInterval(()=>{
      if (Math.abs(player.y - settings.controlPos.y) > 20) {
        player.move.y = player.y > settings.controlPos.y ? -d : d
        dir = player.move.y === -d ? 'up' : 'down'
      } else {
        player.move.y = 0
      }
      if (Math.abs(player.x - settings.controlPos.x) > 20) {
        player.move.x = player.x > settings.controlPos.x ? -d : d
        dir = player.move.x === -d ? 'left' : 'right'
      } else {
        player.move.x = 0
      }

      player.move.x || player.move.y
        ? walk(player, dir)
        : stopSprite(player)
    }, 150)
  }

  player.x = getRandomPos('w')
  player.y = getRandomPos('h')
  player.el.style.zIndex = player.y
  setSize(settings.map)

  document.addEventListener('click', e => {
    stopSprite(player)
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

    handleWalk()
  })

  // const elAngle = pos => {
  //   const { x, y } = pos
  //   const angle = radToDeg(Math.atan2(y - player.y, x - player.x)) - 90
  //   return Math.round(angle)
  // }


  window.addEventListener('focus', ()=> settings.isWindowActive = true)
  window.addEventListener('blur', ()=> settings.isWindowActive = false)


  window.addEventListener('resize', ()=> {
    resizeAndRepositionMap()
  })

  resizeAndRepositionMap()
}

window.addEventListener('DOMContentLoaded', init)

