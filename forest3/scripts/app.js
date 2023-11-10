

//*maybe design maps first.
//! add control button (enter)
// TODO maybe handle wall in separate layer? (reduces need to define wall separately)
// TODO could the location entry logic be updated?
// TODO revent other events triggering during eventAnimation


import mapData from './data/mapData.js'
import avatars from './data/avatars.js'
import { animateCell } from './utils/animation.js'
import { decompress } from './utils/compression.js'
import { setWidthAndHeight, setTargetSize, setTargetPos, adjustRectSize, centerOfMap, isObject, randomDirection, resizeCanvas, degToRad } from './utils/utils.js'
import { map, bear, walkDirections } from './state.js'
import { setSpritePos, turnSprite, spriteWrapper } from './utils/sprite.js'
import { addTouchAction } from './utils/touchControl.js'
import { tiles, editConfig, tilesList, tileSheetData,  tileX, tileY } from './data/tileData.js'
import { elements } from './elements.js'

// bear.pause is used for pausing during animation as well as talking
// bear.isTalking is for triggering dialogue

function init() {
  //* stops intervals firing while window is inactive
  let windowActive = true
  window.addEventListener('focus', ()=> windowActive = true)
  window.addEventListener('blur', ()=> windowActive = false)

  const setLocation = key => {
    map.key = key
    setWidthAndHeight()
    
    const { column, row } = mapData[map.key]   
    map.row = row
    map.column = column
    drawMap(column, row)
  }
  
  const mapX = () => bear.pos % map.column  
  const mapY = () => Math.floor(bear.pos / map.column)

  const noWall = pos =>{    
    const { spawnData, map:mapcode
      // noLeftEdgeList, noWallList, 
      } = map
    if (!mapcode[pos] || bear.pos === pos || spawnData.some(s => s.pos === pos)) return false

    // prevents sprite walking beyond edge
    // if (bear.facingDirection === 'left' && noLeftEdgeList.some(c => mapcode[pos + 1] === c)) return false
    // return noWallList.some(c => mapcode[pos] === c)
    return map.walls[pos] !== '$'
  }

  const createSpriteSheet = () => {
    resizeCanvas({
      canvas: elements.spriteSheet,
      w: tileSheetData.cellD * tileSheetData.column, 
      h: tileSheetData.cellD * tileSheetData.row
    })
    const triggerLast = {
      count: 0,
      limit: tilesList.length - 1,
      action: ()=> elements.startButton.classList.remove('hidden')
    }
    tilesList.forEach((code, i) => {
      const tile = code[0]?.split('.')?.[0] || code[0]
      const edit = code[0]?.split('.')?.[1]
  
      const url = tiles[tile]?.frames 
        ? tiles[tile].frames[code[1]] 
        : tiles[tile]?.img
  
      drawDataUrl({
        url,
        color: tiles[tile]?.color,
        index: i,
        edit,
        ctx: elements.sCtx,
        gridData: tileSheetData,
        triggerLast
      })  
    })
  }


  const outputLocationWall = ({ ctx, i, tile }) => {
    const { column } = map
    const d = 4
    const mapX = (i % column) * d
    const mapY = Math.floor(i / column) * d
    ctx.fillStyle = tile === '$' ? '#a2fcf0' : '#06a1a1'
    ctx.fillRect(mapX, mapY, d, d)
  }

  const createCanvas = (target, ctx, w, h) => {
    target.innerHTML = ''
    const canvas = document.createElement('canvas')
    target.appendChild(canvas)
    resizeCanvas({ canvas, w, h })
    elements[ctx] = canvas.getContext('2d')
    elements[ctx].imageSmoothingEnabled = false
  }

  const animateMap = () => {
    const { cellD: d, column } = map
    clearInterval(map.animInterval)
    map.animInterval = setInterval(()=> {
      map.animCounter++
      if (map.animCounter === 6) map.animCounter = 0

      map.map.forEach((code, i) =>{
        const tile = code?.split('.')?.[0] || code
        if (tiles[tile]?.frames && tiles[tile]?.sequence) {
          outputFromSpriteSheet({ 
            d, column, code, i, offset: tiles[tile].sequence[map.animCounter] 
          })
        }
      })
    }, 500)
  }

  const createLocationMark = () => {
    elements.mark = document.createElement('div')
    elements.mark.classList.add('mark')
    setTargetSize(elements.mark, 4)
    elements.location.appendChild(elements.mark)
    setTargetPos(elements.mark, mapX() * 4, mapY() * 4)
  }

  const drawLocationMap = () => {
    createCanvas(elements.location, 'locationCtx', map.column * 4, map.row * 4)
    map.walls.forEach((tile, i) =>{
      outputLocationWall({ 
        ctx: elements.locationCtx, 
        i, d: 4, tile
      })
    })
  }


  const placeTile = ({ mapIndex, color, url, ctx, gridData, triggerLast }) =>{
    const { cellD: d, column } = gridData
    const mapX = (mapIndex % column) * d
    const mapY = Math.floor(mapIndex / column) * d
  
    if (color === 'transparent') {
      ctx.clearRect(mapX, mapY, d, d)
    } else {
      ctx.imageSmoothingEnabled = false
      ctx.fillStyle = color || '#a2fcf0'
      ctx.fillRect(mapX, mapY, d, d)
    }
  
    if (url) ctx.drawImage(elements.drawboard, mapX, mapY, d, d)
    if (triggerLast) {
      triggerLast.count++
      if (triggerLast.count === triggerLast.limit) triggerLast.action()
    }
  }



  const drawDataUrl = ({ url, color, index, edit, ctx, gridData = map, triggerLast }) => {
    const { dCtx } = elements
    const img = new Image()
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img
      dCtx.imageSmoothingEnabled = false
      resizeCanvas({ canvas: elements.drawboard, w, h })
      if (edit) {
        dCtx.save()
        dCtx.translate(w / 2, h / 2)
        dCtx.rotate(degToRad(editConfig?.[edit[0]]))
        dCtx.scale(edit.includes('h') ? -1 : 1, edit.includes('v') ? -1 : 1)
        dCtx.translate(-w / 2, -h / 2)     
      }
      dCtx.drawImage(img, 0, 0, w, h)
      dCtx.restore()
      
      placeTile({ mapIndex: index, ctx, url, edit, color, gridData, triggerLast  })
    }
    if (url) {
      img.src = url
    } else {
      placeTile({ mapIndex: index, ctx, color, gridData, triggerLast  })
    }
  }

  const outputFromSpriteSheet = ({ d, column, code, i, offset = 0 }) => {
    const mapX = (i % column) * d
    const mapY = Math.floor(i / column) * d
    const { ctx } = elements 
    const index = tilesList.map(t => t[0]).indexOf(code) + offset

    ctx.imageSmoothingEnabled = false
    ctx.drawImage(elements.spriteSheet, tileX(index), tileY(index), 16, 16, mapX, mapY, d, d)
  }

  const drawMap = (w, h) => {
    map.map = decompress(mapData[map.key].map)
    map.walls = decompress(mapData[map.key].walls)
    const { cellD: d, column } = map
    createCanvas(elements.mapImage, 'ctx', w * d, h * d)

    map.map.forEach((code, i) => {
      outputFromSpriteSheet({ d, column, code, i })
    })
    animateMap()
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
    } else if (motion.includes('facing')) {
      turnSprite({
        e: walkDirections[motion.split('-')[1]], 
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
    elements.mapImage.style.transform = `translate(${x}px,${y}px)`
  }

  const positionSprite = pos =>{
    const { width, cellD } = map
    setTargetPos(
      elements.spriteContainer, 
      pos % width * cellD, 
      Math.floor(pos / width) * cellD
    )
  }
  
  const spawnCharacter = () =>{
    if (map.spawnData.length) map.spawnData.forEach(m => clearInterval(m.interval))
    map.spawnData.length = 0
    // elements.mapImage.innerHTML = '' // TODO need to clear old sprites from elements.mapImage
    const { column, cellD } = map 

    mapData[map.key].characters?.forEach((c, i)=>{
      const { pos, avatar, motion } = c
      const sx = Math.floor(pos % column) * cellD
      const sy = Math.floor(pos / column) * cellD
      map.spawnData[i] = {
        ...c,
        interval: null,
        left: sx,
        top: sy,
        animationTimer: null,
        frameOffset: 0,
        face: avatars[avatar].face,
        spawn: null,
        motionIndex: Array.isArray(motion) ? 0 : null,
        pause: false
      }
      
      const spawn = document.createElement('div')
      spawn.classList.add('spawn_container')
      setTargetPos(spawn, sx, sy)
      spawn.innerHTML = `<div class="spawn"><div class="sprite ${avatars[avatar].sprite}"></div></div>`

      elements.mapImage.appendChild(spawn)   
      map.spawnData[i].spawn = spawn.childNodes[0]
      map.spawnData[i].interval = setInterval(()=>{
        spawnMotion(i)
      }, avatars[avatar].speed)
    })
    map.sprites = document.querySelectorAll('.sprite')
    map.sprites.forEach((sprite, i)=>{
      if (i === map.sprites.length - 1) return
      turnSprite({
        e: map.spawnData[i].defaultDir, 
        actor: map.spawnData[i], sprite,
      })
    })
  }

  const transition = () =>{
    elements.transitionCover.classList.add('transition')
    bear.pause = true
    setTimeout(()=> {
      elements.transitionCover.classList.remove('transition')
      bear.pause = false
    }, 500)
  }

  const displayChoiceDetails = () =>{
    elements.indicator.innerHTML = (   
      `<div>
        <p>bear textCount: ${bear.textCount}</p>
        <p>bear choice: ${bear.choice}</p>
        <p>bear prevchoice: ${bear.prevChoice}</p>
      </div>`
    )
  }

  const showDialog = ({ talkTarget, facingDirection, dialog }) =>{
    bear.isTalking = true
    // talkTarget.pause = true //TODO check if this is necessary
    elements.texts[0].parentNode.parentNode.classList.remove('hidden')
    if (facingDirection) turnSprite({
      e: facingDirection,
      actor: talkTarget, 
      sprite: talkTarget.spawn.childNodes[0]
    })
    if (!bear.dialogKey) {
      bear.dialog = mapData[map.key].eventContents[dialog || talkTarget.event]
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
    elements.texts[2].innerHTML = bear.optionTexts.map((op, i) => {
      return `<div class="option ${i === bear.choice ? 'selected' : ''}">${op}</div>`
    }).join('')
    
    // makes multiple choice clickable
    bear.options = document.querySelectorAll('.option')
    bear.options.forEach((op, i) => {
      op.addEventListener('click',() => {
        bear.options.forEach(op => op.classList.remove('selected'))
        op.classList.add('selected')

        bear.choice = i
        select()
      })
    })
  }

  const displayTextGradual = (t, i) =>{
    elements.texts[1].innerHTML = t.slice(0, i)
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
    elements.texts[0].parentNode.parentNode.classList.add('hidden')
    elements.texts[1].classList.remove('face_displayed')
    elements.texts.forEach(t => t.innerText = '')
    elements.transitionCover.innerHTML = ''
    elements.spriteFace.innerHTML = ''
    toggleControl('remove')

    if (event && !map.completedEvents.some(e => e === event.act)){
      map.activeEvent = event.act
      eventAnimation({ act: event.act.sequences, index: map.eventIndex })
    } else {
      map.eventIndex = 0
    }
  }

  const updateNextButtonText = (count, text) => elements.controlButtons[0].innerHTML = count === text.length - 1? 'end' : 'next'

  const displayText = (count, prev) =>{
    const eventPoint = bear.dialog[bear.dialogKey]
    const nextButton = elements.controlButtons[0]
    elements.texts[1].classList.add('face_displayed')
    elements.texts[0].innerHTML = bear.talkTarget.name
    toggleControl('add')

    if (count < eventPoint.text.length){
      const text = eventPoint.text[count]
      const targetExpression = (eventPoint.face && eventPoint.face[count]) || 'happy'
      
      elements.spriteFace.innerHTML = spriteWrapper({
        url: bear.talkTarget.face[targetExpression].sprite,
        frameNo: bear.talkTarget.face[targetExpression].frameNo,
        frameSize: 64,
        wrapper: 'sprite_face',
      })
      animateCell({
        target: elements.spriteFace.childNodes[1],
        start: 0, end: 1,
        interval: bear.talkTarget.interval
      })
      bear.textCount++
      // TODO check why bear is pausing at this timing and not elsewhere
      bear.pause = true
      displayTextGradual(text, 0)
      if (eventPoint.choice && count === eventPoint.text.length - 1) {
        displayAnswer(prev)
        nextButton.classList.add('hide')
      } else {
        updateNextButtonText(count, eventPoint.text)
        nextButton.classList.remove('hide')
      }
    } else {
      clearText()
    }
  }

  const toggleControl = action =>{
    elements.control.classList[action]('deactivate')
    elements.touchToggle.parentNode.classList[action]('deactivate')
  }

  const investigate = (count, eventPoint) =>{
    if (count < eventPoint.text.length){
      toggleControl('add')
      // displays text and answer
      const text = eventPoint.text[count]
      bear.textCount++
      bear.pause = true
      elements.texts[0].parentNode.parentNode.classList.remove('hidden')
      updateNextButtonText(count, eventPoint.text)
      displayTextGradual(text, 0)
      if (eventPoint.art && !elements.transitionCover.innerHTML) elements.transitionCover.innerHTML = `<div class="art_work"><img src=${eventPoint.art} /></div>`
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
    const { spawnData, column } = map
    const targetDirection = { r: 1, l: -1, u: -column, d: column }[bear.facingDirection[0]]
    const talkTarget = bear.talkTarget || spawnData[spawnData.findIndex(actor => actor.pos === bear.pos + targetDirection)]
    talk(talkTarget)
  }

  const transport = key =>{
    transition()
    elements.mapImage.classList.add('transition')
    const entryPoint = mapData[map.key].entry[key]
    if (!entryPoint) return // this added to prevent error when user walks too fast

    setLocation(entryPoint.map)
    bear.pos = entryPoint.cell

    setWidthAndHeightAndResize()
    const { sprite } = elements

    spawnCharacter()

    setTimeout(()=> {
      elements.mapImage.classList.remove('transition')
      drawLocationMap()
      createLocationMark()

      turnSprite({ 
        e: entryPoint.direction, 
        actor: bear, sprite
      })
      
      checkAndTriggerEvent()
    }, 400)
  }

  const triggerEventAnimation = (act, key) => {
    map.activeEvent = act
    setTimeout(()=> {
      elements.eventCover.classList.remove('hidden')
      eventAnimation({ act: mapData[key].eventContents[act].sequences, index: 0 })
    }, 200)
  }

  const checkAndTriggerEvent = () => {
    const { key } = map
    if (mapData[key].events[bear.pos]) {
      const { gateway, act } = mapData[key].events[bear.pos]
      if (gateway) setTimeout(()=> {
        transport(gateway)
      }, 200)
      if (act && !map.completedEvents.some(e => e === act)) {
        triggerEventAnimation(act, key)
      } 
    } 
  }
  
  const spriteWalk = ({ dir, actor, sprite }) =>{
    if (!dir || bear.pause) return
    const isBear = actor === bear

    const { column, cellD, map:mapcode } = map
    const { x, y } = map.mapXY
    // prevents bear from turning away from ladder
    turnSprite({
      e: isBear && mapcode[bear.pos] === 'la' ? 'up' : dir,
      actor, sprite, animate: true
    })

    const { diff, para, dist } = {
      right: { diff: 1, para: 'left', dist: -cellD },
      left: { diff: -1, para: 'left', dist: cellD },
      up: { diff: -column, para: 'top', dist: cellD },
      down: { diff: column, para: 'top', dist: -cellD }
    }[dir] 

    if (noWall(actor.pos + diff)) { 
      if (isBear) {
        setPos(para, (para === 'left' ? x : y ) + dist)
        actor.pos += diff
        
        // trigger event based on bear position
        checkAndTriggerEvent()
        elements.indicator.innerHTML = `x:${x} y:${y} pos:${bear.pos} dataX:${mapX()} dataY:${mapY()}`
        setTargetPos(elements.mark, mapX() * 4, mapY() * 4)
      } else {
        actor[para] -= dist // note that dist needs to be flipped around
        actor.spawn.parentNode.style[para] = `${actor[para]}px`
        actor.pos += diff
      } 
    }  
  }

  const select = () =>{
    const { dialogKey } = bear
    elements.texts[2].innerHTML = ''
    bear.answering = false
    bear.prevChoices[dialogKey] = bear.choice
    bear.textCount = 0
    bear.dialogHistory.push(dialogKey)
    bear.dialogKey = bear.dialog[dialogKey].choice[bear.optionTexts[bear.choice]]
    displayText(bear.textCount, false)
  }

  // this enables user to go back during conversation, but better not to have
  // because it causes conversation to end
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
    elements.texts[2].innerHTML = ''
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
          // if (key === 'left') prevText()

          // TODO development code. remove later
          displayChoiceDetails()

          options[bear.choice].classList.add('selected')
          return
        }
        // if (key === 'left' && elements.texts[0].innerHTML) prevText()
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
    const { width, height, column, row, cellD, start } = map
    positionSprite(start)
    // update offset margins
    setPos('left', mapX() * -cellD + ((Math.floor(width / 2) - 1) * cellD))  
    setPos('top', mapY() * -cellD + ((Math.floor(height / 2) - 1) * cellD))
    // adjust sprite
    setSpritePos(-cellD, bear, elements.sprite)
    setTargetSize(elements.sprite, cellD * 7, cellD)
    setTargetSize(elements.spriteContainer, cellD)
    // resize mapContainer
    adjustRectSize({
      target: elements.mapContainer, 
      w: width, h: height, 
      cellD
    })
    // setup location indicator
    map.minicellD = Math.floor(cellD / 8)
    adjustRectSize({
      target: elements.location, 
      w: column, h: row, 
      cellD: map.minicellD, 
      cells: map.locationTiles
    })
    // setup map image
    adjustRectSize({ 
      target: elements.mapImage, 
      w: column, h: row, 
      cellD, 
      // cells: map.mapImageTiles
    })
    // setup mapcover
    adjustRectSize({
      target: elements.mapCover, 
      w: width, h: height, 
      cellD
    })
  }
  
  const setWidthAndHeightAndResize = () =>{
    setWidthAndHeight()
    map.start = centerOfMap(map.width, map.height)
    resize()
    turnSprite({
      e: bear.facingDirection, 
      actor: bear, 
      sprite: elements.sprite
    })
    elements.mapImage.classList.add('transition')
    clearTimeout(map.transitionTimer)
    map.transitionTimer = setTimeout(()=> {
      elements.mapImage.classList.remove('transition')
    }, 500)
  }

  const checkAndContinueEvent = ({ act, index }) =>{ 
    // carries on event
    if (!Object.keys(act[index]).some(k => isObject(act[index][k])) && index < act.length - 1 && map.activeEvent){
      map.eventIndex = index + 1
      setTimeout(()=>{
        eventAnimation({ act, index: map.eventIndex })
      }, 600)
    } else {
      endEvent()
    }
  }

  const endEvent = () => {
    // only add to completed events when event is non repeat type
    // console.log(mapData[map.key].eventContents[map.activeEvent])
    !mapData[map.key].eventContents[map.activeEvent]?.repeat && map.completedEvents.push(map.activeEvent)
    map.eventIndex = 0
    map.activeEvent = null
    elements.eventCover.classList.add('hidden')
  }

  const animateActor = ({ frame, actor }) =>{ 
    const eventCode = walkDirections[frame]
    const isBear = actor === 'bear'
    const actorData = isBear ? bear : map.spawnData.find(s => s.name === actor)
    const actorSprite = isBear ? elements.sprite : actorData.spawn.childNodes[0]
    if (!isBear) {
      actorData.pause = true
    }
    if (['u', 'd', 'r', 'l'].includes(frame)) spriteWalk({ dir: eventCode, actor: actorData, sprite: actorSprite })
    if (['tu', 'td', 'tr', 'tl'].includes(frame)) turnSprite({ e: eventCode, actor: actorData, sprite: actorSprite })
    // if (eventCode === 'stop') console.log('stop') // TODO possibly redundant?
    // if (eventCode === 'resume') actorData.pause = false
    if (isObject(frame)) showDialog({ talkTarget: actorData, dialog: frame.dialog }) 
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
    } else if (act[index]?.gateway) {
      transport(act[index].gateway)
      endEvent()
    } else {
      elements.eventCover.classList.remove('hidden')
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
  
  const handleWalk = e =>{
    if (bear.walkingDirection !== e){
      clearInterval(bear.walkingInterval)
      bear.walkingDirection = e
      bear.walkingInterval = setInterval(()=>{
        !bear.walkingDirection
          ? clearInterval(bear.walkingInterval)
          : handleKeyAction(e)
      }, 150)
    }
  }

  // set up

  // key control
  window.addEventListener('keyup', () => {
    bear.walkingDirection = null
    clearInterval(bear.walkingInterval)
  })
  window.addEventListener('keydown', e => {
    if (bear.isTalking || (e.key[0] !== 'A')) {
      handleKeyAction(e)
    } else if (e.key[0] === 'A'){
      handleWalk(e)
    }
  })
  window.addEventListener('resize', setWidthAndHeightAndResize)

  elements.controlButtons.forEach(c =>{
    c.addEventListener('click', ()=> handleKeyAction(c.dataset.c))
  })

  elements.touchToggle.addEventListener('change', ()=>{
    elements.control.classList.toggle('hide')
    const status = document.querySelector('.touch_status')
    status.innerHTML = status.innerHTML === 'off' ? 'on' : 'off'
  })

  elements.startButton.addEventListener('click', e => {
    e.preventDefault()
    elements.transitionCover.classList.remove('intro')
    transport('start')
  })
  

  addTouchAction(elements.control.childNodes[1].childNodes[1], handleKeyAction)

  resizeCanvas({ canvas: elements.drawboard, w: map.cellD })
  createSpriteSheet()
}

window.addEventListener('DOMContentLoaded', init)

