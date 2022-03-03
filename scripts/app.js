

//*maybe design maps first.
//! temporal solution for image display added, but 
//! add ways to decorate map further
//! design other avatars and map

// TODO draw bunny face and animation function to populate .face during dialog
// Refactor before proceeding
import mapData from './data/mapData.js'
import avatars from './data/avatars.js'
import svgData from './data/svgData.js'
import { animateCell, startCellAnimations } from './utils/animation.js'


function init() {
  
  
  //* stops intervals firing while window is inactive
  let windowActive
  window.addEventListener('focus', ()=> windowActive = true)
  window.addEventListener('blur', ()=> windowActive = false)

  const decode = arr =>{
    return arr.split('').map(c=>{
      if (c === 'D') return '<path d="M'
      if (c === 'F') return '<path fill="#fff" d="M'
      if (c === '/') return '/>'
      if (c === 'N') return '-1' 
      if (c === 'T') return '-2'
      return c
    }).join('')
  }

  const decompress = arr =>{
    const output = []
    arr.split(',').forEach(x=>{
      const letter = x.split('').filter(y=>y * 0 !== 0).join('')
      const repeat = x.split('').filter(y=>y * 0 === 0).join('')
      for (let i = 0; i < repeat; i++){
        output.push(letter)
      }
    })
    return output
  }

  const transitionCover = document.querySelector('.transition_cover')
  const touchToggle = document.querySelector('.touch_toggle')
  const control = document.querySelector('.control')
  const controlButtons = document.querySelectorAll('.control_button')
  const wrapper = document.querySelector('.wrapper')
  const map = document.querySelector('.map')
  const mapImageContainer = document.querySelector('.map_image_container')
  const mapCover = document.querySelector('.map_cover')
  const mapImage = document.querySelector('.map_image')
  const location = document.querySelector('.location_indicator')
  const spriteContainer = document.querySelector('.sprite_container')
  const texts = document.querySelectorAll('.text')
  const sprite = document.querySelector('.sprite')
  const indicator = document.querySelector('.indicator')
  const spriteFace = document.querySelector('.face')
  let sprites

  
  // map related variables
  let height
  let width
  let iHeight
  let iWidth
  let start
  const cellD = 32
  let minicellD 
  const mapXY = {
    x: null,
    y: null
  }
  let mapTiles
  let locationTiles
  let mapImageTiles

  let animInterval

  // gameplay related variables
  let mapKey = 'one'
  const spawnData = []
  const bear = {
    spritePos: null,
    facingDirection: 'down',
    pos: null,
    motion: true,
    textCount: 0,
    pause: false,
    option: 0,
    choice: 0,
    prevChoices: {}, 
    animationTimer: [],
    //? could this be renamed to something else?
    dialog: {},
    dialogKey: null,
    dialogHistory: [],
    isTalking: false,
  }

  const directionKey = {
    9: 'right',
    6: 'left',
    3: 'up',
    0: 'down',
  }


  const setWidthAndHeight = ()=>{
    const { offsetWidth: w, offsetHeight:h } = wrapper
    const pWidth = w < 800 ? w : 800
    width = 2 * Math.floor((pWidth / cellD) / 2)
    const pHeight = h < 600 ? h : 600
    height = 2 * Math.floor((pHeight / cellD) / 2)
  }

  const setLocation = key => {
    mapKey = key
    setWidthAndHeight()
    
    const { iWidth:w, iHeight:h } = mapData[mapKey]   
    // TODO where does this get used?
    iHeight = h
    iWidth = w
    location.innerHTML = mapMap(w, h,'location_indicator_tile')
    locationTiles = document.querySelectorAll('.location_indicator_tile')
    mapImage.innerHTML = mapMap(w, h,'map_image_tile', mapImageTiles)
    mapImageTiles = document.querySelectorAll('.map_image_tile')
  }

  const setTargetSize = (target, w, h) => Object.assign(target.style, { width: `${w}px`, height: `${h}px` })
  const setTargetPos = (target, x, y) => Object.assign(target.style, { left: `${x}px`, top: `${y}px` })

  const placeInCenterOfMap = () =>{
    start = Math.floor((width * height) / 2) - Math.floor((width / 2)) - 1
  }

  const mapMap = (w, h, classToAdd)=>{
    const mapArr = new Array(w * h).fill('').map((_ele, i)=>i)
    return mapArr.map((_ele,i)=>{
      const dataX = i % w
      const dataY = Math.floor(i / w)
      return `
        <div class=${classToAdd} data-index=${i} data-x=${dataX} data-y=${dataY}>
          ${i}
        </div>  
      `
    }).join('')
  }

  const adjustRectSize = (target, w, h, cellD, cells) =>{
    setTargetSize(target, w * cellD, h * cellD) 
    cells && cells.forEach(cell=>{ setTargetSize(cell, cellD, cellD) })
  }

  let noWallList = ['b','do'] //! maybe switch this depending on the map?
  const noLeftEdgeList = ['pu','g']

  const noWall = pos =>{    
    if (!mapImageTiles[pos] || bear.pos === pos || spawnData.filter(s=>s.pos === pos).length) return false

    // prevents sprite walking beyond edge
    if (bear.facingDirection === 'left' && noLeftEdgeList.filter(w => mapImageTiles[pos + 1].classList.contains(w)).length) return false
    return noWallList.filter(w => mapImageTiles[pos].classList.contains(w)).length
  }

  const populateWithSvg = (key, target) =>{
    if (svgData[key]){
      const { svg, color, subColor, rotate, flip, frameNo, speed } = svgData[key]
      let colorAction = ''
      colorAction = typeof(color) === 'function' ? color() : color

      const svgContent = 
      `${svgWrapper({
          content: decode(subColor ? svg(subColor) : svg()),
          color: colorAction || '',
          rotate: rotate || 0,
          flip,
          wrapper: frameNo ? 'anim_wrapper' : 'svg_wrap',
          frameNo,
          speed
        })}`
      
      target.innerHTML = svgContent
    } 
  }



  const setUpWalls = target =>{
    const decompressedMap = decompress(mapData[mapKey].map)
    target.forEach((tile,i)=>{
      const letterCode = decompressedMap[i]
      tile.classList.add(letterCode)

      if (svgData[letterCode])  {
        target !== locationTiles
          ? populateWithSvg(letterCode, tile) 
          : populateWithSvg(letterCode, tile) // TODO change this logic to change map appearance
      }
    })
  }

  const spawnWalk = (actor, para, m, spawn) =>{
    actor[para] += m
    spawn.style[para] = `${actor[para]}px`
  }
  
  const spawnMotion = (spawn, i) =>{
    if (spawnData[i].pause || !windowActive) return
    spriteWalk({
      dir: ['down', 'right', 'up', 'left'][Math.floor(Math.random() * 4)],
      actor: spawnData[i], 
      sprite: sprites[i], 
      spawn
    })
  }

  const setPos = (key, num, dir) =>{
    mapXY[key] = num
    mapImage.style[dir] = `${num}px`
  }

  const setSpritePos = (num, actor, sprite) =>{
    actor.spritePos = num
    sprite.style.marginLeft = `${num}px`
  }

  const positionSprite = pos =>{
    setTargetPos(
      spriteContainer, 
      pos % width * cellD, 
      Math.floor(pos / width) * cellD
    )
  }
  
  const spawnCharacter = () =>{
    if (spawnData.length) spawnData.forEach(m=>clearInterval(m.interval))
    spawnData.length = 0

    mapData[mapKey].characters?.forEach((c, i)=>{
      const { pos, avatar, spritePos, event, name } = c
      const sx = Math.floor(pos % iWidth) * cellD
      const sy = Math.floor(pos / iWidth) * cellD
      spawnData[i] = {
        interval: null,
        left: sx,
        top: sy,
        animationTimer: ['',''],
        face: avatars[avatar].face,
        spritePos,
        event,
        pos,
        spawn: null,
        name
      }

      const spawnContainer = document.createElement('div')
      spawnContainer.classList.add('spawn_container')
      setTargetPos(spawnContainer, sx, sy)

      const spawn = document.createElement('div')
      const sprite = () =>{
        return `
        <svg class="sprite" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 112 16" style="height: ${cellD}px; width: ${cellD * 7}px;">
          ${decode(avatars[avatar].sprite)}
        </svg>  
        `
      }

      spawn.innerHTML = sprite()
      // spawn.innerHTML = spriteContainer.innerHTML //! this needs to be changed to whatever defined in avatar object
      spawn.classList.add('spawn')
      // spawn.style.fill = randomColor()
      spawn.style.fill = '#74645a'
      spawnContainer.appendChild(spawn)    
      mapImage.appendChild(spawnContainer)   
      spawnData[i].spawn = spawn
      spawnData[i].interval = setInterval(()=>{
        spawnMotion(spawnContainer, i)
      }, avatars[avatar].speed)
    })

    sprites = document.querySelectorAll('.sprite')
    sprites.forEach((sprite, i)=>{
      if (i === sprites.length - 1) return
      sprites[i].style.animationDelay = `${i * 0.1}s`
      turnSprite(directionKey[spawnData[i].spritePos], spawnData[i], sprite, false)
    })
  }


  const transition = () =>{
    transitionCover.classList.add('transition')
    bear.motion = false
    setTimeout(()=>{
      transitionCover.classList.remove('transition')
      bear.motion = true
    },500)
  }

  const displayChoiceDetails = () =>{
    indicator.innerHTML = (   
      `
        <div>
          <p>bear textCount: ${bear.textCount}</p>
          <p>bear choice: ${bear.choice}</p>
          <p>bear prevchoice: ${bear.prevChoice}</p>
        </div>
      ` )
  }

  const talk = () => {
    const key = { right: 1, left: -1, up: -iWidth, down: iWidth }
    const targetDirection = key[bear.facingDirection]
    const talkTargetIndex = spawnData.findIndex(actor => actor.pos === bear.pos + targetDirection)
    if (talkTargetIndex !== -1) {
      bear.isTalking = true
      texts[0].parentNode.classList.remove('hidden')
      const talkTarget = spawnData[talkTargetIndex]
      talkTarget.pause = true
      const opposite = Object.keys(key).find(k => key[k] === targetDirection * -1)
      turnSprite(opposite, talkTarget, sprites[talkTargetIndex], false)
      
      if (!bear.dialogKey) {
        bear.dialog = mapData[mapKey].eventContents[talkTarget.event]
        bear.dialogKey = 'first',
        bear.talkTarget = {
          face: talkTarget.face,
          interval: null
        }
      }

      bear.dialog[bear.dialogKey].text.length !== bear.textCount
        ? displayText(bear.textCount, false)
        : clearText()
    } 
  }
  

  
  // displays multiple choice
  const displayAnswer = prev =>{ 
    const eventPoint = bear.dialog[bear.dialogKey]
    bear.pause = true
    bear.choice = prev ? bear.prevChoices[bear.dialogKey] : 0 
    bear.optionTexts = Object.keys(eventPoint.choice)
    texts[1].innerHTML = bear.optionTexts.map((qu, i)=>{
      return `
        <div class="option ${i === bear.choice && 'selected'}">
          ${qu}
        </div>`
    }).join('')
    
    // makes multiple choice clickable
    bear.options = document.querySelectorAll('.option')
    bear.options.forEach((op, i)=>{
      op.addEventListener('click',()=>{
        bear.options.forEach(op => op.classList.remove('selected'))
        op.classList.add('selected')

        bear.choice = i
        select()
      })
    })
  }

  const displayTextGradual = (t, i) =>{
    texts[0].innerHTML = t.slice(0, i)
    if (i < t.length) {
      setTimeout(()=>{
        displayTextGradual(t, i + 1)
      },30)
    }
  }

  const clearText = () =>{
    Object.assign(bear, {
      textCount: 0,
      prevChoices: {},
      motion: true,
      pause: false,
      dialogHistory: [],
      dialog: {},
      dialogKey: null,
      talkTarget: null,
      isTalking: false
    })
    texts[0].parentNode.classList.add('hidden')
    texts.forEach(t => t.innerText = '')
    transitionCover.innerHTML = ''
    spriteFace.innerHTML = ''
  }

  const displayText = (count, prev) =>{
    const eventPoint = bear.dialog[bear.dialogKey]

    if (count < eventPoint.text.length){
      const text = eventPoint.text[count]

      // TODO could separate this bit out to control facial expression
      const targetExpression = (eventPoint.face && eventPoint.face[count]) || 'happy'

      spriteFace.innerHTML = svgWrapper({
        content: decode(bear.talkTarget.face[targetExpression].sprite),
        frameNo: bear.talkTarget.face[targetExpression].frameNo,
        frameSize: 32,
        wrapper: 'sprite_face',
        color: '#74645a'
      })
      animateCell({
        target: spriteFace.childNodes[1],
        start: 0,
        end: 1,
        interval: bear.talkTarget.interval
      })
      
      bear.textCount++
      bear.motion = false
      displayTextGradual(text, 0)
      if (eventPoint.choice && count === eventPoint.text.length - 1) {
        displayAnswer(prev)
      } 
      return
    }
    clearText()
  }

  const investigate = (count, eventPoint) =>{
    if (count < eventPoint.text.length){
      // displays text and answer
      const text = eventPoint.text[count]
      bear.textCount++
      bear.motion = false
      displayTextGradual(text, 0)
      if (eventPoint.art) transitionCover.innerHTML = `
        <div>
          <img src=${eventPoint.art} />
        </div>
      `
      return
    }
    clearText()
  }


  const check = count =>{
    const event = mapData[mapKey].events[bear.pos]
    if (event) {
      const eventPoint = mapData[mapKey].eventContents[event.index]
      if (eventPoint && bear.facingDirection === eventPoint.direction) {
        investigate(count, eventPoint)
        return
      }
    }
    talk()
  }

  function transport(key){
    // console.log('transport')
    transition()
    mapImage.classList.add('transition')
    const entryPoint = mapData[mapKey].entry[key]
    if (!entryPoint) return // this added to prevent error when user walks too fast
    
    noWallList = entryPoint.noWall || ['b','do']
    setLocation(entryPoint.map)
    bear.pos = entryPoint.cell
    setWidthAndHeightAndResize()
    setUpWalls(mapImageTiles)
    turnSprite(bear.facingDirection, bear, sprite, false)
    setTimeout(()=>turnSprite(entryPoint.direction, bear, sprite, false), 150)
    spawnCharacter()
    startCellAnimations(animInterval)

    setTimeout(()=> {
      mapImage.classList.remove('transition')
      setUpWalls(locationTiles)
    },400)
  }
  

  const turnSprite = (e = 'down', actor, sprite, animate) => {
    let m = -cellD
    actor.facingDirection = e
    const animateWalk = (a, b, c, turn) =>{
      actor.animationTimer.forEach(timer=> clearTimeout(timer))
      m = animate ? m * a : m * c
      if (turn) sprite.parentNode.classList.toggle('right') 
      if (animate){
        actor.animationTimer[0] = setTimeout(()=>setSpritePos(-cellD * b, actor, sprite), 100)
        actor.animationTimer[1] = setTimeout(()=>setSpritePos(-cellD * c, actor, sprite), 200) 
      }   
    }
    const spriteChange = { // TODO can refactor this bit?
      right: ()=> { 
        sprite.parentNode.classList.add('right')
        animateWalk(4, 6, 5, false)
      },
      left: ()=> { 
        sprite.parentNode.classList.remove('right')
        animateWalk(4, 6, 5, false)
      },
      up: ()=> animateWalk(2, 2, 3, true), 
      down: ()=> animateWalk(0, 0, 1, true)
    }
    spriteChange[e]()
    setSpritePos(m, actor, sprite)
  }

  const spriteWalk = ({ dir, actor, sprite, spawn }) =>{
    // when spawn is true, this function is used by spawn

    if (!dir || !bear.motion) return
    if (!spawn) locationTiles[actor.pos].classList.remove('mark')
    const { x, y } = mapXY

    // prevents bear from turning away from ladder
    mapImageTiles[bear.pos].classList.contains('la') || 
    (mapImageTiles[bear.pos - iWidth] && mapImageTiles[bear.pos - iWidth].classList.contains('la') 
    && dir === 'down')
      ? turnSprite('up', actor, sprite, true)
      : turnSprite(dir, actor, sprite, true)
      
    if (dir === 'right' && noWall(actor.pos + 1)) {
      spawn ? spawnWalk(actor, 'left', cellD, spawn) : setPos('x', x - cellD, 'left')
      actor.pos += 1 
    }
    if (dir === 'left' && noWall(actor.pos - 1)) {
      spawn ? spawnWalk(actor, 'left', -cellD, spawn) : setPos('x', x + cellD, 'left')
      actor.pos -= 1 
    }
    if (dir === 'up' && noWall(actor.pos - iWidth)) {
      spawn ? spawnWalk(actor, 'top', -cellD, spawn) : setPos('y', y + cellD, 'top')
      actor.pos -= iWidth 
    }
    if (dir === 'down' && noWall(actor.pos + iWidth)) {
      spawn ? spawnWalk(actor, 'top', cellD, spawn) : setPos('y', y - cellD, 'top')
      actor.pos += iWidth 
    }
      
    if (!spawn) locationTiles[actor.pos].classList.add('mark')
    
    // trigger event based on bear position
    if (!spawn && mapData[mapKey].events[bear.pos]) {
      const { event, gateway } = mapData[mapKey].events[bear.pos]
      if (gateway) setTimeout(()=> {
        event === 'transport' && transport(gateway)
        event === 'check' && check(gateway)
      },200)
    } 

    const { x: dataX, y: dataY } = mapImageTiles[bear.pos].dataset
    indicator.innerHTML = `x:${x} y:${y} pos:${locationTiles[bear.pos].dataset.index} dataX:${dataX} dataY:${dataY}`
  }

  const select = () =>{
    const { dialogKey } = bear
    texts[1].innerHTML = ''
    bear.pause = false
    bear.prevChoices[dialogKey] = bear.choice
    
    bear.textCount = 0
    const eventPoint = bear.dialog[dialogKey]
    bear.dialogHistory.push(dialogKey)
    bear.dialogKey = eventPoint.choice[bear.optionTexts[bear.choice]]
    displayText(bear.textCount, false)
  }

  const prevText = () =>{
    const { dialog, dialogKey, dialogHistory } = bear
    const currentdialogLength = dialog[dialogKey].text.length
    
    if (!dialogHistory.length && bear.textCount === 1) {
      // if beginning of dialog, end conversation
      clearText()
      return
    } else if ( currentdialogLength === 1 || (currentdialogLength > 1 && bear.textCount === 1)) {
      // return to previous dialog
      bear.dialogKey = bear.dialogHistory.pop()
      const previousdialog = dialog[bear.dialogKey].text
      bear.textCount = previousdialog.length - 1
    } else {
      // return within same dialog
      bear.textCount -= 2
    }
    texts[1].innerHTML = ''
    displayText(bear.textCount, true)
  }
  

  const handleKeyAction = e =>{
    const key = e.key ? e.key.toLowerCase().replace('arrow','') : e
    if (bear.isTalking) {
      if (bear.pause) {
        bear.options.forEach(option=>option.classList.remove('selected'))
        if (key === 'up' && bear.choice > 0) bear.choice--
        if (key === 'down' && bear.choice < bear.options.length - 1) bear.choice++
        if ([' ', 'enter', 'right'].some(k => k === key)) select()
        if (key === 'left') prevText()
        displayChoiceDetails()
        bear.options[bear.choice].classList.add('selected')
        return
      }
      if (key === 'left' && texts[0].innerHTML) prevText()
    }
    if (key === ' ' || key === 'enter' || (key === 'right' && bear.isTalking)) {
      check(bear.textCount)
      return
    }
    
    spriteWalk({
      dir: key, 
      actor: bear, 
      sprite: sprites[sprites.length - 1]
    })
  }


  const resize = () =>{
    positionSprite(start)

    // update offset margins
    const { x: dataX, y: dataY } = mapImageTiles[bear.pos].dataset
    const xMargin = dataX * -cellD + ((Math.floor(width / 2) - 1) * cellD)
    const yMargin = dataY * -cellD + ((Math.floor(height / 2) - 1) * cellD) 
    setPos('x', xMargin, 'left')  
    setPos('y', yMargin, 'top')

    // adjust sprite
    setSpritePos(-cellD, bear, sprite)
    setTargetSize(sprite, cellD * 7, cellD)
    setTargetSize(spriteContainer, cellD, cellD)

    // resize mapImageContainer
    adjustRectSize(mapImageContainer, width, height, cellD)
    
    // resize map
    map.innerHTML = mapMap(width,height,'map_tile', mapTiles)
    mapTiles = document.querySelectorAll('.map_tile')
    adjustRectSize(map, width, height, cellD, mapTiles)
    
    // setup location indicator
    minicellD = Math.floor(cellD / 8)
    adjustRectSize(location, iWidth, iHeight, minicellD, locationTiles)
    locationTiles[bear.pos].classList.add('mark')
  
    // setup map image
    adjustRectSize(mapImage, iWidth, iHeight, cellD, mapImageTiles)
    
    // setup mapcover
    adjustRectSize(mapCover, width, height, cellD)
  }
  
  const setWidthAndHeightAndResize = () =>{
    setWidthAndHeight()
    placeInCenterOfMap()
    resize()
  }
  

  // set up

  // key control
  window.addEventListener('keyup', (e)=>handleKeyAction(e))

  window.addEventListener('resize', setWidthAndHeightAndResize)

  controlButtons.forEach(c=>{
    c.addEventListener('click',()=>handleKeyAction(c.dataset.c))
  })

  touchToggle.addEventListener('change', ()=>{
    control.classList.toggle('hide')
    const status = document.querySelector('.touch_status')
    status.innerHTML = status.innerHTML === 'off' ? 'on' : 'off'
  })

  transport('start')


  const testButton = document.querySelector('.test_button')
  testButton.addEventListener('click', ()=>{
    const tontokoData = spawnData.filter(s => s.name === 'tontoko')[0]
    tontokoData.spawn.style.backgroundColor = 'yellow'
    tontokoData.pause = true

    console.log('sprite',tontokoData.spawn.parentNode)

    spriteWalk({
      dir: 'right', 
      actor: tontokoData, 
      sprite: tontokoData.spawn.childNodes[1],
      spawn: tontokoData.spawn.parentNode
    })
  })


}

window.addEventListener('DOMContentLoaded', init)


//*indicator


// console.log(
//   'cellD',cellD,
//   'dataX',dataX,
//   'dataY',dataY,
//   'x',x,
//   'y',y,
//   'los',bear.pos
//   )
  
