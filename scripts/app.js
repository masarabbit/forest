

//*maybe design maps first.
//! temporal solution for image display added, but 
//! add ways to decorate map further
//! design other avatars and map

// TODO draw bunny face and animation function to populate .face during dialog
// Refactor before proceeding
import mapData from './data/mapData.js'
import avatars from './data/avatars.js'
import svgData from './data/svgData.js'
import { svgWrapper } from './data/svg.js'
import { animateCell, startCellAnimations } from './utils/animation.js'
import { decode, decompress } from './utils/compression.js'
import { setTargetSize, setTargetPos, adjustRectSize, centerOfMap } from './utils/utils.js'

function init() {

  //* stops intervals firing while window is inactive
  let windowActive
  window.addEventListener('focus', ()=> windowActive = true)
  window.addEventListener('blur', ()=> windowActive = false)


  const transitionCover = document.querySelector('.transition_cover')
  const touchToggle = document.querySelector('.touch_toggle')
  const control = document.querySelector('.control')
  const controlButtons = document.querySelectorAll('.control_button')
  const wrapper = document.querySelector('.wrapper')
  const mapDisplay = document.querySelector('.map')
  const mapImageContainer = document.querySelector('.map_image_container')
  const mapCover = document.querySelector('.map_cover')
  const mapImage = document.querySelector('.map_image')
  const location = document.querySelector('.location_indicator')
  const spriteContainer = document.querySelector('.sprite_container')
  const texts = document.querySelectorAll('.text')
  const sprite = document.querySelector('.sprite')
  const indicator = document.querySelector('.indicator')
  const spriteFace = document.querySelector('.face')


  const map = {
    height: 0, width: 0,
    iHeight: 0, iWidth: 0,
    start: 0,
    cellD: 32,
    minicellD: 0, 
    mapXY: {
      x: null,
      y: null
    },
    mapTiles: null,
    locationTiles: null,
    mapImageTiles: null,
    animInterval: null,
    noWallList: ['b','do'],
    noLeftEdgeList: ['pu','g'],
    key: 'one',
    spawnData: [],
    sprites: null
  }

  // gameplay related variables
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
    map.width = 2 * Math.floor((pWidth / map.cellD) / 2)
    const pHeight = h < 600 ? h : 600
    map.height = 2 * Math.floor((pHeight / map.cellD) / 2)
  }

  const setLocation = key => {
    map.key = key
    setWidthAndHeight()
    
    const { iWidth:w, iHeight:h } = mapData[map.key]   
    // TODO where does this get used?
    map.iHeight = h
    map.iWidth = w
    location.innerHTML = mapMap(w, h,'location_indicator_tile')
    map.locationTiles = document.querySelectorAll('.location_indicator_tile')

    mapImage.innerHTML = mapMap(w, h,'map_image_tile', map.mapImageTiles)
    map.mapImageTiles = document.querySelectorAll('.map_image_tile')
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


  const noWall = pos =>{    
    const { mapImageTiles:mTiles, spawnData } = map
    if (!mTiles[pos] || bear.pos === pos || spawnData.filter(s=>s.pos === pos).length) return false

    // prevents sprite walking beyond edge
    if (bear.facingDirection === 'left' && map.noLeftEdgeList.filter(w => mTiles[pos + 1].classList.contains(w)).length) return false
    return map.noWallList.filter(w => mTiles[pos].classList.contains(w)).length
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
    const decompressedMap = decompress(mapData[map.key].map)
    target.forEach((tile,i)=>{
      const letterCode = decompressedMap[i]
      tile.classList.add(letterCode)

      if (svgData[letterCode])  {
        target !== map.locationTiles
          ? populateWithSvg(letterCode, tile) 
          : populateWithSvg(letterCode, tile) // TODO change this logic to change map appearance
      }
    })
  }

  const spawnWalk = (actor, para, m) =>{
    actor[para] += m
    actor.spawn.parentNode.style[para] = `${actor[para]}px`
  }
  
  const spawnMotion = i =>{
    const { spawnData, sprites } = map
    if (spawnData[i].pause || !windowActive) return
    spawnSpriteWalk({
      dir: ['down', 'right', 'up', 'left'][Math.floor(Math.random() * 4)],
      actor: spawnData[i], 
      sprite: sprites[i], 
    })
  }

  const setPos = (key, num, dir) =>{
    map.mapXY[key] = num
    mapImage.style[dir] = `${num}px`
  }

  const setSpritePos = (num, actor, sprite) =>{
    actor.spritePos = num
    sprite.style.marginLeft = `${num}px`
  }

  const positionSprite = pos =>{
    const { width, cellD } = map
    setTargetPos(
      spriteContainer, 
      pos % width * cellD, 
      Math.floor(pos / width) * cellD
    )
  }
  
  const spawnCharacter = () =>{
    if (map.spawnData.length) map.spawnData.forEach(m=>clearInterval(m.interval))
    map.spawnData.length = 0
    const { iWidth, cellD } = map 

    mapData[map.key].characters?.forEach((c, i)=>{
      const { pos, avatar, spritePos, event, name } = c
      const sx = Math.floor(pos % iWidth) * cellD
      const sy = Math.floor(pos / iWidth) * cellD
      map.spawnData[i] = {
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
      map.spawnData[i].spawn = spawn
      map.spawnData[i].interval = setInterval(()=>{
        spawnMotion(i)
      }, avatars[avatar].speed)
    })

    map.sprites = document.querySelectorAll('.sprite')
    map.sprites.forEach((sprite, i)=>{
      if (i === map.sprites.length - 1) return
      map.sprites[i].style.animationDelay = `${i * 0.1}s`
      turnSprite(directionKey[map.spawnData[i].spritePos], map.spawnData[i], sprite, false)
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
    const key = { right: 1, left: -1, up: -map.iWidth, down: map.iWidth }
    const { spawnData, sprites } = map
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
        bear.dialog = mapData[map.key].eventContents[talkTarget.event]
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
    const event = mapData[map.key].events[bear.pos]
    if (event) {
      const eventPoint = mapData[map.key].eventContents[event.index]
      if (eventPoint && bear.facingDirection === eventPoint.direction) {
        investigate(count, eventPoint)
        return
      }
    }
    talk()
  }

  const transport = key =>{
    // console.log('transport')
    transition()
    mapImage.classList.add('transition')
    const entryPoint = mapData[map.key].entry[key]
    if (!entryPoint) return // this added to prevent error when user walks too fast
    
    map.noWallList = entryPoint.noWall || ['b','do']
    setLocation(entryPoint.map)
    bear.pos = entryPoint.cell
    setWidthAndHeightAndResize()
    setUpWalls(map.mapImageTiles)
    turnSprite(bear.facingDirection, bear, sprite, false)
    setTimeout(()=>turnSprite(entryPoint.direction, bear, sprite, false), 150)
    spawnCharacter()
    startCellAnimations(map.animInterval)

    setTimeout(()=> {
      mapImage.classList.remove('transition')
      setUpWalls(map.locationTiles)
    },400)
  }
  

  const turnSprite = (e = 'down', actor, sprite, animate) => {
    const { cellD } = map
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

  const spriteWalk = ({ dir, actor, sprite }) =>{
    if (!dir || !bear.motion) return
    map.locationTiles[actor.pos].classList.remove('mark')
    const { iWidth, cellD, mapImageTiles: mTiles } = map
    const { x, y } = map.mapXY

    // prevents bear from turning away from ladder
    mTiles[bear.pos].classList.contains('la') || 
    mTiles?.[bear.pos - iWidth].classList.contains('la')
    && dir === 'down'
      ? turnSprite('up', actor, sprite, true)
      : turnSprite(dir, actor, sprite, true)
      
    if (dir === 'right' && noWall(actor.pos + 1)) {
      setPos('x', x - cellD, 'left')
      actor.pos += 1 
    }
    if (dir === 'left' && noWall(actor.pos - 1)) {
      setPos('x', x + cellD, 'left')
      actor.pos -= 1 
    }
    if (dir === 'up' && noWall(actor.pos - iWidth)) {
      setPos('y', y + cellD, 'top')
      actor.pos -= iWidth 
    }
    if (dir === 'down' && noWall(actor.pos + iWidth)) {
      setPos('y', y - cellD, 'top')
      actor.pos += iWidth 
    }
      
    map.locationTiles[actor.pos].classList.add('mark')
    
    // trigger event based on bear position
    if (mapData[map.key].events[bear.pos]) {
      const { event, gateway } = mapData[map.key].events[bear.pos]
      if (gateway) setTimeout(()=> {
        event === 'transport' && transport(gateway)
        event === 'check' && check(gateway)
      },200)
    } 

    const { x: dataX, y: dataY } = map.mapImageTiles[bear.pos].dataset
    indicator.innerHTML = `x:${x} y:${y} pos:${map.locationTiles[bear.pos].dataset.index} dataX:${dataX} dataY:${dataY}`
  }

  const spawnSpriteWalk = ({ dir, actor, sprite }) =>{
    if (!dir || !bear.motion) return
    const { iWidth, cellD } = map
    turnSprite(dir, actor, sprite, true)
      
    if (dir === 'right' && noWall(actor.pos + 1)) {
      spawnWalk(actor, 'left', cellD)
      actor.pos += 1 
    }
    if (dir === 'left' && noWall(actor.pos - 1)) {
      spawnWalk(actor, 'left', -cellD)
      actor.pos -= 1 
    }
    if (dir === 'up' && noWall(actor.pos - iWidth)) {
      spawnWalk(actor, 'top', -cellD)
      actor.pos -= iWidth 
    }
    if (dir === 'down' && noWall(actor.pos + iWidth)) {
      spawnWalk(actor, 'top', cellD)
      actor.pos += iWidth 
    }
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
    const { sprites } = map
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
    positionSprite(map.start)
    const { width, height, iWidth, iHeight, cellD, } = map

    // update offset margins
    const { x: dataX, y: dataY } = map.mapImageTiles[bear.pos].dataset
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
    mapDisplay.innerHTML = mapMap(width, height,'map_tile', map.mapTiles)
    map.mapTiles = document.querySelectorAll('.map_tile')
    adjustRectSize(mapDisplay, width, height, cellD, map.mapTiles)
    
    // setup location indicator
    map.minicellD = Math.floor(cellD / 8)
    adjustRectSize(location, iWidth, iHeight, map.minicellD, map.locationTiles)
    map.locationTiles[bear.pos].classList.add('mark')
  
    // setup map image
    adjustRectSize(mapImage, iWidth, iHeight, cellD, map.mapImageTiles)
    
    // setup mapcover
    adjustRectSize(mapCover, width, height, cellD)
  }
  
  const setWidthAndHeightAndResize = () =>{
    setWidthAndHeight()
    map.start = centerOfMap(map.width, map.height)
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
    const tontokoData =map.spawnData.filter(s => s.name === 'tontoko')[0]
    tontokoData.spawn.style.backgroundColor = 'yellow'
    tontokoData.pause = true

    console.log('sprite',tontokoData.spawn.parentNode)

    spawnSpriteWalk({
      dir: 'right', 
      actor: tontokoData, 
      sprite: tontokoData.spawn.childNodes[1],
      // spawn: tontokoData.spawn.parentNode
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
