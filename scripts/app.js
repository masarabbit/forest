

//*maybe design maps first.
//! add control button (enter)
//! add ways to decorate map further
//! design other avatars and map

// it breaks dialogue, so check why this is

import mapData from './data/mapData.js'
import avatars from './data/avatars.js'
import svgData from './data/svgData.js'
import { svgWrapper } from './data/svg.js'
import { animateCell, startCellAnimations } from './utils/animation.js'
import { decode, decompress } from './utils/compression.js'
import { setWidthAndHeight, setTargetSize, setTargetPos, adjustRectSize, centerOfMap, isObject, randomDirection, mouse } from './utils/utils.js'
import { map, bear, directionKey, walkDirections, testAct } from './state.js'
import { setSpritePos, turnSprite } from './utils/sprite.js'

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

    mapImage.innerHTML = mapMap(iWidth, iHeight,'map_image_tile', map.mapImageTiles)
    map.mapImageTiles = document.querySelectorAll('.map_image_tile')
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
    map.map = decompress(mapData[map.key].map)
    target.forEach((tile, i)=>{
      const letterCode = map.map[i]
      letterCode === 'v' && tile.classList.add(letterCode)

      if (svgData[letterCode])  {
        target !== map.locationTiles
          ? populateWithSvg(letterCode, tile) 
          : !map.noWallList.includes(letterCode) && tile.classList.add('wall') 
      }
    })
  }

  const spawnAnimation = i =>{
    const { spawnData, sprites } = map
    const { motion, animation, animationIndex: index } = spawnData[i]
    if (!motion || !windowActive) return
    if (animation === 'randomWalk') {
      spriteWalk({
        dir: randomDirection(),
        actor: spawnData[i], sprite: sprites[i], 
      })
    } else if (animation === 'randomTurn') {
      if (Math.random() < 0.5)
      turnSprite({
        e: randomDirection(), 
        actor: spawnData[i], sprite: sprites[i],
      })
    } else if (Array.isArray(animation)) {
      // if motion[index] is 0, it would be falsy so spriteWalk is skipped
      if (animation[index]) spriteWalk({
        dir: walkDirections[animation[index]],
        actor: spawnData[i], sprite: sprites[i], 
      })
      spawnData[i].animationIndex = index === animation.length - 1 ? 0 : index + 1
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
    const { iWidth, cellD } = map 

    mapData[map.key].characters?.forEach((c, i)=>{
      const { pos, avatar, spritePos, event, name, animation } = c
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
        animation,
        animationIndex: Array.isArray(animation) ? 0 : null,
        motion: true
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
        spawnAnimation(i)
      }, avatars[avatar].speed)
    })

    map.sprites = document.querySelectorAll('.sprite')
    map.sprites.forEach((sprite, i)=>{
      if (i === map.sprites.length - 1) return
      map.sprites[i].style.animationDelay = `${i * 0.1}s`
      turnSprite({
        e: directionKey[map.spawnData[i].spritePos], 
        actor: map.spawnData[i], sprite,
      })
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
      `<div>
        <p>bear textCount: ${bear.textCount}</p>
        <p>bear choice: ${bear.choice}</p>
        <p>bear prevchoice: ${bear.prevChoice}</p>
      </div>`
    )
  }

  const showDialog = ({ talkTarget, facingDirection, event }) =>{
    bear.isTalking = true
    talkTarget.motion = false
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
      motion: true,
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

    if (event){
      map.eventActive = true
      eventAnimation({
        act: event.act,
        index: map.eventIndex + 1
      })
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
      bear.motion = false
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
    console.log('trigger')
  }

  const investigate = (count, eventPoint) =>{
    if (count < eventPoint.text.length){
      // control.classList.add('deactivate')
      toggleControl('add')
      // displays text and answer
      const text = eventPoint.text[count]
      bear.textCount++
      bear.motion = false
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
    setUpWalls(map.mapImageTiles)
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
      
      // TODO indicate where the walls are
      // map.map.forEach((c, i) =>{
      //   if (map.noWallList.includes(c)) {
      //     map.mapImageTiles[i].classList.add('no_wall_show')
      //     map.mapImageTiles[i].setAttribute('letter_code', c)
      //   }  
      // })

    },400)
  }
  
  const spriteWalk = ({ dir, actor, sprite }) =>{
    if (!dir || !bear.motion) return
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
      if (act) {
        map.eventActive = true
        // bear.motion = false
        setTimeout(()=> {
          eventAnimation({ act: mapData[key].eventContents[act], index: 0 })
        }, 200)
      } 
      // TODO add some way to trigger eventAnimation
      //? need ways to make the event only trigger once
      //? need ways to enble character to move several times
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
    console.log('bear choice', bear.choice)
    bear.dialogKey = bear.dialog[dialogKey].choice[bear.optionTexts[bear.choice]]
    console.log('dialogKey', bear.dialogKey)
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
      if (!map.eventActive) {
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

  const eventAnimation = ({ act, index }) =>{
    if (index === act.length - 1){
      // TODO perhaps this should not be based on just index but some kind of end flag within the act
      // (otherwise, triggers when there are only one item in the act array)
      map.eventIndex = 0
      map.eventActive = false
    } else {
      console.log('event animation 1', act[index])
      Object.keys(act[index]).forEach(actor =>{
        const eventCode = walkDirections[act[index][actor]]
        if (actor === 'bear'){
          if (['u', 'd', 'r', 'l'].includes(act[index][actor])) spriteWalk({ dir: eventCode, actor: bear, sprite })
          if (['tu', 'td', 'tr', 'tl'].includes(act[index][actor])) turnSprite({ e: eventCode, actor: bear, sprite })
        } else {
          const actorData = map.spawnData.find(s => s.name === actor)
          // actorData.spawn.style.backgroundColor = 'red'
          actorData.motion = false
          const key = act[index][actor]
          const sprite = actorData.spawn.childNodes[1]
        
          if (eventCode === 'stop') console.log('hey')
          if (['u', 'd', 'r', 'l'].includes(key)) spriteWalk({ dir: eventCode, actor: actorData, sprite })
          if (['tu', 'td', 'tr', 'tl'].includes(key)) turnSprite({ e: eventCode, actor: actorData, sprite })
          if (eventCode === 'resume') actorData.motion = true
          // TODO for some reason, spawn turns when the dialog ends, so this needs to be checked
          // TODO  disable turn if dialog initiated via event?
          if (isObject(key)) showDialog({ talkTarget: actorData, event: key.event }) 
        }
      })
      if (!Object.keys(act[index]).some(k => isObject(act[index][k])) && index < act.length - 1 && map.eventActive){
        map.eventIndex = index + 1
        setTimeout(()=>{
          eventAnimation({ act, index: map.eventIndex })
        }, 600)
      } else {
        // stops eventAnimation proceeding
        map.eventActive = false
        // bear.motion = true
      }
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


  const testButton = document.querySelector('.test_button')
  testButton.addEventListener('click', ()=> {
    if (map.eventIndex === 0) {
      map.eventActive = true
      eventAnimation({ act: testAct, index: 0 })
    }  

    //? should the animation be recoreded as a scenario which houses all motions? array of acts?  
  })
  
  const touchControl = {
    active: false,
    timer: null,
    direction: null,
  }

  const distanceBetween = (a, b) => Math.round(Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)))


  const drag = (target, pos, x, y) =>{
    pos.a = pos.c - x
    pos.b = pos.d - y
    const newX = target.offsetLeft - pos.a
    const newY = target.offsetTop - pos.b
    if (distanceBetween({x: 0,y: 0}, {x: newX, y: newY}) < 35) {
      setTargetPos(target, newX, newY)
      touchControl.direction = Math.abs(newX) < Math.abs(newY)
        ? newY < 0 ? 'up' : 'down'
        : newX < 0 ? 'left' : 'right'
    }  
  }


  const client = (e, type) => e.type[0] === 'm' ? e[`client${type}`] : e.touches[0][`client${type}`]
  const roundedClient = (e, type) => Math.round(client(e, type))
  
  const addTouchAction = target =>{
    const pos = { a: 0, b: 0, c: 0, d: 0 }
    
    const onGrab = e =>{
      pos.c = roundedClient(e, 'X')
      pos.d = roundedClient(e, 'Y')  
      mouse.up(document, 'add', onLetGo)
      mouse.move(document, 'add', onDrag)
      touchControl.active = true
      touchControl.timer = setInterval(()=> {
        if (touchControl.active) handleKeyAction(touchControl.direction)
      }, 200)
    }
    const onDrag = e =>{
      const x = roundedClient(e, 'X')
      const y = roundedClient(e, 'Y')
      drag(target, pos, x, y)
      pos.c = x
      pos.d = y
    }
    const onLetGo = () => {
      mouse.up(document, 'remove', onLetGo)
      mouse.move(document,'remove', onDrag)
      target.style.transition = '0.2s'
      setTargetPos(target, 0 ,0)
      setTimeout(()=>{
        target.style.transition = '0s'
      }, 200)
      clearInterval(touchControl.timer)
      touchControl.active = false
    }
    mouse.down(target,'add', onGrab)
  }
  // console.log(control.childNodes[1].childNodes)
  addTouchAction(control.childNodes[1].childNodes[1])
  
}

window.addEventListener('DOMContentLoaded', init)

