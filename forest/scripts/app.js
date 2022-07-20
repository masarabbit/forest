

//*maybe design maps first.
//! add control button (enter)
//! add ways to decorate map further
//! design other avatars and map

// TODO could some events take place more than once?
// TODO could event trigger be visualised? (make text box visible on top and bottom.)


import mapData from './data/mapData.js'
import avatars from './data/avatars.js'
// import svgData from './data/svgData.js'
import { svgWrapper } from './data/svg.js'
import { animateCell, startCellAnimations } from './utils/animation.js'
import { decode, decompress } from './utils/compression.js'
import { setWidthAndHeight, setTargetSize, setTargetPos, adjustRectSize, centerOfMap, isObject, randomDirection } from './utils/utils.js'
import { map, bear, directionKey, walkDirections } from './state.js'
import { setSpritePos, turnSprite } from './utils/sprite.js'
import { addTouchAction } from './utils/touchControl.js'

import {
  transitionCover,
  touchToggle,
  control,
  controlButtons,
  mapContainer,
  mapCover,
  mapImage,
  location,
  spriteContainer,
  texts,
  sprite,
  indicator,
  spriteFace,
  elements
} from './elements.js'

function init() {

  //* stops intervals firing while window is inactive
  let windowActive = true
  window.addEventListener('focus', ()=> windowActive = true)
  window.addEventListener('blur', ()=> windowActive = false)


  const setLocation = key => {
    map.key = key
    setWidthAndHeight()
    
    const { iWidth, iHeight } = mapData[map.key]   
    map.iHeight = iHeight
    map.iWidth = iWidth
    location.innerHTML = mapMap(iWidth, iHeight,'location_indicator_tile')
    map.locationTiles = document.querySelectorAll('.location_indicator_tile')
    drawMap(iWidth, iHeight)
  }

  const mapMap = (w, h, classToAdd)=>{
    const mapArr = new Array(w * h).fill('').map((_ele, i)=>i)
    return mapArr.map((_ele, i)=>{
      return `<div class=${classToAdd} data-index=${i}>${i}</div>`
    }).join('')
  }
  
  const mapX = () => bear.pos % map.iWidth  
  const mapY = () => Math.floor(bear.pos / map.iWidth)

  const noWall = pos =>{    
    const { spawnData, noLeftEdgeList, noWallList, map:mapcode } = map
    if (!mapcode[pos] || bear.pos === pos || spawnData.some(s => s.pos === pos)) return false

    // prevents sprite walking beyond edge
    if (bear.facingDirection === 'left' && noLeftEdgeList.some(c => mapcode[pos + 1] === c)) return false
    return noWallList.some(c => mapcode[pos] === c)
  }
  

  const resizeCanvas = (target, w, h) =>{
    target.setAttribute('width', w)
    target.setAttribute('height', h || w)
  }

  const tiles = [
    'z','ta','tb','tc','td','t','w','o','d',
    's','bt','br','bb','bl','bx','by','rr','rl',
    'ry','rt','g','y','iw','do','wi','sw','sl',
    'sr','nw','nr','at','ar','ab','al','rc','pt',
    'pr','pb','pu','r','rh','ra','rb','rd','re',
    'la','e','lh','st','aa','gr','','',''
  ]
  const riverTiles = ['r', 'rh', 'ra', 'rb','rd', 're']
  const plainColors = {
    p: '#fff',
    rp: '#58d3d8',
    bd: '#0d8799'
  }

  const output = ({ ctx, i, x, y, tile, sprite }) =>{
    const { cellD: d, iWidth } = map
    const mapX = (i % iWidth) * d
    const mapY = Math.floor(i / iWidth) * d

    if (tile !== 'v') {
      ctx.fillStyle = plainColors[tile] || '#a2fcf0'
      ctx.fillRect(mapX, mapY, d, d)
      ctx.drawImage(sprite, x, y, d / 2, d / 2, mapX, mapY, d, d)
    }
  }

  const createCanvas = (ctx, w, h) => {
    const canvas = document.createElement('canvas')
    mapImage.appendChild(canvas)
    if (ctx === 'animCtx') canvas.classList.add('blink')
    resizeCanvas(canvas, w * map.cellD, h * map.cellD)
    elements[ctx] = canvas.getContext('2d')
    elements[ctx].imageSmoothingEnabled = false
  }

  const drawMap = (w, h) => {
    map.map = decompress(mapData[map.key].map)
    mapImage.innerHTML = ''

    createCanvas('ctx', w, h)
    map.map.forEach((tile, i) =>{
      const index = tiles.indexOf(tile)
      output({ 
        ctx: elements.ctx, i, tile, 
        x: (index % 9) * 16, y: Math.floor(index / 9) * 16,
        sprite: elements.spriteSheets[0]
      })
    })

    createCanvas('animCtx', w, h)
    map.map.forEach((tile, i) =>{
      const index = riverTiles.indexOf(tile)
      if (index !== -1) {
        output({ 
          ctx: elements.animCtx, i, tile, 
          x: (index % 6) * 16, y: 0,
          sprite: elements.spriteSheets[1]
        })
      }
    })
  }

  const setUpWalls = target =>{
    target.forEach((tile, i)=>{
      !map.noWallList.includes(map.map[i]) && tile.classList.add('wall') 
    })
  }

  const spawnMotion = i =>{
    const { spawnData, sprites } = map
    const { pause, motion, motionIndex: index } = spawnData[i]
    if (pause || !windowActive) return
    if (motion === 'randomWalk') {
      spriteWalk({
        dir: randomDirection(),
        actor: spawnData[i], sprite: sprites[i], 
      })
    } else if (motion === 'randomTurn') {
      if (Math.random() < 0.5)
      turnSprite({
        e: randomDirection(), 
        actor: spawnData[i], sprite: sprites[i],
      })
    } else if (Array.isArray(motion)) {
      // if motion[index] is 0, it would be falsy so spriteWalk is skipped
      if (motion[index]) spriteWalk({
        dir: walkDirections[motion[index]],
        actor: spawnData[i], sprite: sprites[i], 
      })
      spawnData[i].motionIndex = index === motion.length - 1 ? 0 : index + 1
    }
    
  }

  const setPos = (para, num) =>{
    map.mapXY[para === 'left' ? 'x' : 'y'] = num
    const { x, y } = map.mapXY
    mapImage.style.transform = `translate(${x}px,${y}px)`
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
    if (map.spawnData.length) map.spawnData.forEach(m => clearInterval(m.interval))
    map.spawnData.length = 0
    // mapImage.innerHTML = '' // TODO need to clear old sprites from mapImage
    const { iWidth, cellD } = map 

    mapData[map.key].characters?.forEach((c, i)=>{
      const { pos, avatar, spritePos, event, name, motion } = c
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
        name,
        motion,
        motionIndex: Array.isArray(motion) ? 0 : null,
        pause: false
      }

      const spawn = document.createElement('div')
      spawn.classList.add('spawn_container')
      setTargetPos(spawn, sx, sy)
      
      const fill = '#74645a'
      spawn.innerHTML = `
      <div class="spawn">
        <svg class="sprite" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 112 16" style="height: ${cellD}px; width: ${cellD * 7}px; fill: ${fill};">
          ${decode(avatars[avatar].sprite)}
        </svg>
      </div>`  

      mapImage.appendChild(spawn)   
      map.spawnData[i].spawn = spawn.childNodes[1]
      map.spawnData[i].interval = setInterval(()=>{
        spawnMotion(i)
      }, avatars[avatar].speed)
    })
    
    map.sprites = document.querySelectorAll('.sprite')
    map.sprites.forEach((sprite, i)=>{
      if (i === map.sprites.length - 1) return
      turnSprite({
        e: directionKey[map.spawnData[i].spritePos], 
        actor: map.spawnData[i], sprite,
      })
    })
  }

  const transition = () =>{
    transitionCover.classList.add('transition')
    bear.pause = true
    setTimeout(()=>{
      transitionCover.classList.remove('transition')
      bear.pause = false
    },500)
  }

  const displayChoiceDetails = () =>{
    indicator.innerHTML = (   
      `<div>
        <p>bear textCount: ${bear.textCount}</p>
        <p>bear choice: ${bear.choice}</p>
        <p>bear prevchoice: ${bear.prevChoice}</p>
      </div>`
    )
  }

  const showDialog = ({ talkTarget, facingDirection, event }) =>{
    bear.isTalking = true
    talkTarget.pause = true
    texts[0].parentNode.classList.remove('hidden')
    if (facingDirection) turnSprite({
      e: facingDirection,
      actor: talkTarget, 
      sprite: talkTarget.spawn.childNodes[1]
    })
    
    if (!bear.dialogKey) {
      bear.dialog = mapData[map.key].eventContents[event || talkTarget.event]
      bear.dialogKey = 'first'
      bear.talkTarget = talkTarget
    }

    bear.dialog[bear.dialogKey].text.length !== bear.textCount
      ? displayText(bear.textCount, false)
      : clearText()
  }

  const talk = talkTarget => {   
    if (talkTarget) showDialog({
      talkTarget, 
      facingDirection: { r: 'left', l: 'right', u: 'down', d: 'up' }[bear.facingDirection[0]]
    })
  }
  
  
  // displays multiple choice
  const displayAnswer = prev =>{ 
    const eventPoint = bear.dialog[bear.dialogKey]
    bear.answering = true
    bear.choice = prev ? bear.prevChoices[bear.dialogKey] : 0 
    bear.optionTexts = Object.keys(eventPoint.choice)
    texts[1].innerHTML = bear.optionTexts.map((qu, i)=>{
      return `<div class="option ${i === bear.choice && 'selected'}">${qu}</div>`
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
      }, 30)
    }
  }

  const clearText = () =>{
    const event = bear.dialogKey && bear.dialog[bear.dialogKey].event

    Object.assign(bear, {
      textCount: 0,
      prevChoices: {},
      pause: false,
      answering: false,
      dialogHistory: [],
      dialog: {},
      dialogKey: null,
      talkTarget: null,
      isTalking: false
    })
    texts[0].parentNode.classList.add('hidden')
    texts[0].classList.remove('face_displayed')
    texts.forEach(t => t.innerText = '')
    transitionCover.innerHTML = ''
    spriteFace.innerHTML = ''
    // control.classList.remove('deactivate')
    toggleControl('remove')

    if (event && !map.completedEvents.some(e => e === event.act)){
      map.activeEvent = event.act
      eventAnimation({ act: event.act, index: map.eventIndex + 1 })
    } else {
      map.eventIndex = 0
    }
  }

  const updateNextButtonText = (count, text) => controlButtons[0].innerHTML = count === text.length - 1? 'end' : 'next'

  const displayText = (count, prev) =>{
    const eventPoint = bear.dialog[bear.dialogKey]
    const nextButton = controlButtons[0]
    texts[0].classList.add('face_displayed')
    // control.classList.add('deactivate')
    toggleControl('add')

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
      bear.pause = true
      displayTextGradual(text, 0)
      if (eventPoint.choice && count === eventPoint.text.length - 1) {
        displayAnswer(prev)
        nextButton.classList.add('hide')
      } else {
        nextButton.classList.remove('hide')
        updateNextButtonText(count, eventPoint.text)
      }
      return
    }
    clearText()
  }

  const toggleControl = action =>{
    control.classList[action]('deactivate')
    touchToggle.parentNode.classList[action]('deactivate')
    // console.log('trigger')
  }

  const investigate = (count, eventPoint) =>{
    if (count < eventPoint.text.length){
      // control.classList.add('deactivate')
      toggleControl('add')
      // displays text and answer
      const text = eventPoint.text[count]
      bear.textCount++
      bear.pause = true
      texts[0].parentNode.classList.remove('hidden')
      updateNextButtonText(count, eventPoint.text)
      displayTextGradual(text, 0)
      if (eventPoint.art && !transitionCover.innerHTML) transitionCover.innerHTML = `<div class="art_work"><img src=${eventPoint.art} /></div>`
      // TODO add trigger for event?
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
    const { spawnData, iWidth } = map
    const targetDirection = { r: 1, l: -1, u: -iWidth, d: iWidth }[bear.facingDirection[0]]
    const talkTarget = bear.talkTarget || spawnData[spawnData.findIndex(actor => actor.pos === bear.pos + targetDirection)]
    talk(talkTarget)
  }

  const transport = key =>{
    transition()
    mapImage.classList.add('transition')
    const entryPoint = mapData[map.key].entry[key]
    if (!entryPoint) return // this added to prevent error when user walks too fast
    
    map.noWallList = entryPoint.noWall || ['b','do', 'gr']

    setLocation(entryPoint.map)
    bear.pos = entryPoint.cell
    setWidthAndHeightAndResize()
    turnSprite({
      e: bear.facingDirection, 
      actor: bear, sprite
    })

    setTimeout(()=> {
      turnSprite({ 
        e: entryPoint.direction, 
        actor: bear, sprite
      })
    }, 150)
    spawnCharacter()
    startCellAnimations(map.animInterval)

    setTimeout(()=> {
      mapImage.classList.remove('transition')
      setUpWalls(map.locationTiles)
      
      // TODO indicate where the walls are - this needs to be done some other way
      // map.map.forEach((c, i) =>{
      //   if (map.noWallList.includes(c)) {
      //     map.mapImageTiles[i].classList.add('no_wall_show')
      //     map.mapImageTiles[i].setAttribute('letter_code', c)
      //   }  
      // })

    },400)
  }
  
  const spriteWalk = ({ dir, actor, sprite }) =>{
    if (!dir || bear.pause) return
    const isBear = actor === bear

    if (isBear) map.locationTiles[actor.pos].classList.remove('mark')
    const { key, iWidth, cellD, map:mapcode } = map
    const { x, y } = map.mapXY

    // prevents bear from turning away from ladder
    turnSprite({
      e: isBear && mapcode[bear.pos] === 'la' ? 'up' : dir,
      actor, sprite, animate: true
    })

    const { diff, para, dist } = {
      right: { diff: 1, para: 'left', dist: -cellD },
      left: { diff: -1, para: 'left', dist: cellD },
      up: { diff: -iWidth, para: 'top', dist: cellD },
      down: { diff: iWidth, para: 'top', dist: -cellD }
    }[dir] 

    if (noWall(actor.pos + diff)) { 
      if (isBear) {
        setPos(para, (para === 'left' ? x : y ) + dist)
      } else {
        actor[para] -= dist // note that dist needs to be flipped around
        actor.spawn.parentNode.style[para] = `${actor[para]}px`
      } 
      actor.pos += diff
    }  
      
    if (isBear) map.locationTiles[actor.pos].classList.add('mark')
    
    // trigger event based on bear position
    if (isBear && mapData[key].events[bear.pos]) {
      const { gateway, act } = mapData[map.key].events[bear.pos]
      if (gateway) setTimeout(()=> {
        transport(gateway)
      }, 200)
      if (act && !map.completedEvents.some(e => e === act)) {
        map.activeEvent = act
        setTimeout(()=> {
          eventAnimation({ act: mapData[key].eventContents[act], index: 0 })
        }, 200)
      } 
    } 

    if(isBear) indicator.innerHTML = `x:${x} y:${y} pos:${bear.pos} dataX:${mapX()} dataY:${mapY()}`
  }

  const select = () =>{
    const { dialogKey } = bear
    texts[1].innerHTML = ''
    bear.answering = false
    bear.prevChoices[dialogKey] = bear.choice
    bear.textCount = 0
    bear.dialogHistory.push(dialogKey)
    bear.dialogKey = bear.dialog[dialogKey].choice[bear.optionTexts[bear.choice]]
    displayText(bear.textCount, false)
  }

  const prevText = () =>{
    const { dialog, dialogKey, dialogHistory } = bear
    const currentDialogLength = dialog[dialogKey].text.length
    
    if (!dialogHistory.length && bear.textCount === 1) {
      // if beginning of dialog, end conversation
      clearText()
      return
    } else if ( currentDialogLength === 1 || (currentDialogLength > 1 && bear.textCount === 1)) {
      // return to previous dialog
      bear.dialogKey = bear.dialogHistory.pop()
      const previousDialog = dialog[bear.dialogKey].text
      bear.textCount = previousDialog.length - 1
    } else {
      // return within same dialog
      bear.textCount -= 2
    }
    texts[1].innerHTML = ''
    displayText(bear.textCount, true)
  }
  

  const handleKeyAction = e =>{
    const key = e.key ? e.key.toLowerCase().replace('arrow','') : e
    if (['up', 'down', 'left', 'right', ' ', 'enter'].includes(key)) {
      const { answering, options, choice, isTalking, textCount } = bear
      const { sprites } = map
  
      if (isTalking) {
        if (answering) {
          options.forEach(option => option.classList.remove('selected'))
          if (key === 'up' && choice > 0) bear.choice--
          if (key === 'down' && choice < options.length - 1) bear.choice++
          if ([' ', 'enter', 'right'].includes(key)) select()
          if (key === 'left') prevText()
          displayChoiceDetails()
          options[bear.choice].classList.add('selected')
          return
        }
        if (key === 'left' && texts[0].innerHTML) prevText()
      }
      if ([' ', 'enter'].includes(key) || (key === 'right' && isTalking)) {
        check(textCount)
        return
      }
      if (!map.activeEvent) {
        spriteWalk({
          dir: key, 
          actor: bear, 
          sprite: sprites[sprites.length - 1]
        })
      }
    }
  }


  const resize = () =>{
    const { width, height, iWidth, iHeight, cellD, start } = map
    positionSprite(start)
    
    // update offset margins
    setPos('left', mapX() * -cellD + ((Math.floor(width / 2) - 1) * cellD))  
    setPos('top', mapY() * -cellD + ((Math.floor(height / 2) - 1) * cellD))

    // adjust sprite
    setSpritePos(-cellD, bear, sprite)
    setTargetSize(sprite, cellD * 7, cellD)
    setTargetSize(spriteContainer, cellD, cellD)

    // resize mapContainer
    adjustRectSize({
      target: mapContainer, 
      w: width, h: height, 
      cellD
    })
    
    // setup location indicator
    map.minicellD = Math.floor(cellD / 8)
    adjustRectSize({
      target: location, 
      w: iWidth, h: iHeight, 
      cellD: map.minicellD, 
      cells: map.locationTiles
    })
    map.locationTiles[bear.pos].classList.add('mark')
  
    // setup map image
    adjustRectSize({ 
      target: mapImage, 
      w: iWidth, h: iHeight, 
      cellD, 
      cells: map.mapImageTiles
    })
    
    // setup mapcover
    adjustRectSize({
      target: mapCover, 
      w: width, h: height, 
      cellD
    })
  }
  
  const setWidthAndHeightAndResize = () =>{
    setWidthAndHeight()
    map.start = centerOfMap(map.width, map.height)
    resize()
  }

  const checkAndContinueEvent = ({ act, index }) =>{ 
     // carries on event
    if (!Object.keys(act[index]).some(k => isObject(act[index][k])) && index < act.length - 1 && map.activeEvent){
      // console.log('event', map.eventIndex)
      map.eventIndex = index + 1
      setTimeout(()=>{
        eventAnimation({ act, index: map.eventIndex })
      }, 600)
    } else {
      endEvent()
    }
  }

  const endEvent = () => {
    map.completedEvents.push(map.activeEvent)
    map.eventIndex = 0
    map.activeEvent = null
  }

  const animateActor = ({ frame, actor }) =>{ 
    const eventCode = walkDirections[frame]
    const isBear = actor === 'bear'
    const actorData = isBear ? bear : map.spawnData.find(s => s.name === actor)
    const actorSprite = isBear ? sprite : actorData.spawn.childNodes[1]
    if (!isBear) actorData.pause = true
    if (['u', 'd', 'r', 'l'].includes(frame)) spriteWalk({ dir: eventCode, actor: actorData, sprite: actorSprite })
    if (['tu', 'td', 'tr', 'tl'].includes(frame)) turnSprite({ e: eventCode, actor: actorData, sprite: actorSprite })
    if (eventCode === 'stop') console.log('stop')
    if (eventCode === 'resume') actorData.pause = false
    if (isObject(frame)) showDialog({ talkTarget: actorData, event: frame.event }) 
  }

  const chainAnimation = ({ act, index, actorData, motionIndex }) =>{
    const frame = decompress(act[index][actorData.name])
    animateActor({ frame: frame[motionIndex], actor: actorData.name })
    if (motionIndex <= frame.length) {
      actorData.motionIndex++
      setTimeout(()=>{
        chainAnimation({ act, index, actorData, motionIndex: actorData.motionIndex })
      }, 300)
    } else {
      map.eventChainActors = map.eventChainActors.filter(name => name !== actorData.name)
      if (!map.eventChainActors.length) checkAndContinueEvent({ act, index })
    }
  }


  const eventAnimation = ({ act, index }) =>{
    if (act[index] === 'end'){
      endEvent()
    } else {
      Object.keys(act[index]).forEach(actor =>{
        const frame = act[index][actor]
        if(Array.isArray(frame)) {
          map.eventChainActors.push(actor)
          const actorData = actor === 'bear' ? bear : map.spawnData.find(s => s.name === actor)
          actorData.motionIndex = 0
          chainAnimation({ act, index, actorData, motionIndex: actorData.motionIndex })
        } else {
          animateActor({ frame, actor })
        }
      })
      if (!map.eventChainActors.length) checkAndContinueEvent({ act, index })
    }
  }
  

  // set up

  // key control
  window.addEventListener('keyup', e => handleKeyAction(e))
  window.addEventListener('resize', setWidthAndHeightAndResize)

  controlButtons.forEach(c =>{
    c.addEventListener('click', ()=> handleKeyAction(c.dataset.c))
  })

  touchToggle.addEventListener('change', ()=>{
    control.classList.toggle('hide')
    const status = document.querySelector('.touch_status')
    status.innerHTML = status.innerHTML === 'off' ? 'on' : 'off'
  })

  transport('start')

  
  addTouchAction(control.childNodes[1].childNodes[1], handleKeyAction)
  
}

window.addEventListener('DOMContentLoaded', init)

