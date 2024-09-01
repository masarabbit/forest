import { elements } from './elements.js'
import { player, data } from './state.js'
import { animateCell } from './utils/animation.js'
import { spriteWrapper, turnSprite, spawnNpcs, clearNpcs } from './utils/sprite.js'
import { settings } from './state.js'
import { decompress } from './utils/compression.js'
import { walkDirections } from './data/config.js'
import { setStyles, isObject, setPos } from './utils/utils.js'
import { outputFromSpriteSheet, animateMap, mapX, mapY, setUpCanvas, adjustMapWidthAndHeight, positionMapImage } from './mapDraw.js'

const getWalkConfig = dir => {
  const { map: { column }, d } = settings
  return {
    right: { diff: 1, para: 'x', dist: -d },
    left: { diff: -1, para: 'x', dist: d },
    up: { diff: -column, para: 'y', dist: d },
    down: { diff: column, para: 'y', dist: -d }
  }[dir] 
}

const transition = () =>{
  elements.transitionCover.classList.add('transition')
  elements.location.mark.classList.add('d-none')
  player.pause = true
  setTimeout(()=> {
    elements.transitionCover.classList.remove('transition')
    elements.location.mark.classList.remove('d-none')
    player.pause = false
  }, 400)
}

const toggleControl = action =>{
  elements.control.classList[action]('deactivate')
  elements.touchToggle.classList[action]('deactivate')
}

const updateNextButtonText = (count, text) => {
  elements.controlButtons[0].innerHTML = count === text.length - 1 ? 'end' : 'next'
}

const displayTextGradual = text =>{
  elements.texts[1].innerHTML = text.split('').map((letter, i) => {
    return `<span style="animation-delay: ${i * 0.03}s">${letter}</span>`
  }).join('')
}

const resumeOrEndEvent = event => {
  if (event && !settings.completedEvents.some(e => e === event.act)){
    settings.activeEvent = event.act
    eventAnimation(event.act.sequences, settings.eventIndex)
  } else {
    settings.eventIndex = 0
  }
}

const clearText = () =>{
  const event = player.dialogKey && player.dialog[player.dialogKey].event

  Object.assign(player, {
    textCount: 0,
    prevChoices: {},
    pause: false,
    dialogHistory: [],
    dialog: {},
    dialogKey: null,
    talkTarget: null,
    isTalking: false, // maybe this and answering can be combined or referenced from active event instead
    answering: false,
  })
  elements.texts[0].parentNode.parentNode.classList.add('hidden')
  elements.texts[1].classList.remove('face_displayed')
  elements.texts.forEach(t => t.innerText = '')
  elements.artwork.innerHTML = ''
  elements.spriteFace.innerHTML = ''
  toggleControl('remove')

  resumeOrEndEvent(event)
}


const investigate = (count, eventPoint) =>{
  if (count < eventPoint.text.length){
    toggleControl('add')
    // displays text and answer
    const text = eventPoint.text[count]
    player.textCount++
    player.pause = true
    elements.texts[0].parentNode.parentNode.classList.remove('hidden')
    updateNextButtonText(count, eventPoint.text)
    displayTextGradual(text)
    if (eventPoint.art && !elements.artwork.innerHTML) elements.artwork.innerHTML = `<img src=${eventPoint.art} />`
    // TODO add trigger for event?
    return
  }
  clearText() 
}

const select = () =>{
  const { dialogKey: key } = player
  elements.texts[2].innerHTML = ''
  player.answering = false
  player.prevChoices[key] = player.choice
  player.textCount = 0
  player.dialogHistory.push(key)
  player.dialogKey = player.dialog[key].choice[player.optionTexts[player.choice]]
  displayText({ count: player.textCount, prev: false })
}

// displays multiple choice
const displayOptions = prev =>{ 
  const eventPoint = player.dialog[player.dialogKey]
  player.answering = true
  player.choice = prev ? player.prevChoices[player.dialogKey] : 0 
  player.optionTexts = Object.keys(eventPoint.choice)
  elements.texts[2].innerHTML = player.optionTexts.map((op, i) => {
    return `<div class="option ${i === player.choice ? 'selected' : ''}">${op}</div>`
  }).join('')
  
  // makes multiple choice clickable
  player.options = document.querySelectorAll('.option')
  player.options.forEach((op, i) => {
    op.addEventListener('click',() => {
      player.options.forEach(op => op.classList.remove('selected'))
      op.classList.add('selected')

      player.choice = i
      select()
    })
  })
}

const displayText = ({ count, prev }) =>{
  const eventPoint = player.dialog[player.dialogKey]
  const nextButton = elements.controlButtons[0]
  elements.texts[1].classList.add('face-displayed')
  elements.texts[0].innerHTML = player.talkTarget.name
  toggleControl('add')

  if (count < eventPoint.text.length){
    const text = eventPoint.text[count]
    const targetExpression = (eventPoint?.face?.[count]) || 'happy'
    const { img, frameNo } = player.talkTarget.face[targetExpression]
    
    elements.spriteFace.innerHTML = spriteWrapper({
      img,
      frameNo,
      wrapper: 'sprite-face',
    })
    animateCell({
      el: elements.spriteFace.childNodes[1],
      start: 0, end: 1,
      interval: player.talkTarget.interval
    })
    player.textCount++
    // TODO check why player is pausing at this timing and not elsewhere
    player.pause = true
    displayTextGradual(text)
    if (eventPoint.choice && count === eventPoint.text.length - 1) {
      displayOptions(prev)
      nextButton.classList.add('hide')
    } else {
      updateNextButtonText(count, eventPoint.text)
      nextButton.classList.remove('hide')
    }
  } else {
    clearText()
  }
}

const showDialog = ({ talkTarget, dir, dialog }) =>{
  player.isTalking = true
  // talkTarget.pause = true //TODO check if this is necessary
  elements.texts[0].parentNode.parentNode.classList.remove('hidden')
  if (dir) turnSprite({ actor: talkTarget, dir })
  if (!player.dialogKey) {
    player.dialog = settings.map.eventContents[dialog || talkTarget.event]
    player.dialogKey = 'first'
    player.talkTarget = talkTarget
  }

  player.dialog[player.dialogKey].text.length !== player.textCount
    ? displayText({ count: player.textCount, prev: false })
    : clearText()
}


const checkAndContinueEvent = (act, index) =>{ 
  // carries on event
  if (!Object.keys(act[index]).some(k => isObject(act[index][k])) && index < act.length - 1 && settings.activeEvent){
    settings.eventIndex = index + 1
    setTimeout(()=>{
      eventAnimation(act, settings.eventIndex)
    }, 600)
  } else {
    endEvent()
  }
}

const endEvent = () => {
  // only add to completed events when event is non repeat type
  !settings.map.eventContents[settings.activeEvent]?.repeat && settings.completedEvents.push(settings.activeEvent)
  settings.eventIndex = 0
  settings.activeEvent = null
  elements.eventCover.classList.add('hidden')
}

const getActorData = actor => actor === 'player' ? player : settings.npcs.find(npc => npc.name === actor)

const animateActor = ({ frame, actor }) =>{ 
  const dir = walkDirections[frame]
  const isPlayer = actor === 'player'
  const actorData = getActorData(actor)
  if (!isPlayer) {
    actorData.pause = true
  }
  if (['u', 'd', 'r', 'l'].includes(frame)) walk(actorData, dir)
  if (['tu', 'td', 'tr', 'tl'].includes(frame)) turnSprite({ dir, actor: actorData })
  // if (dir === 'stop') console.log('stop') // TODO possibly redundant?
  // if (dir === 'resume') actorData.pause = false
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
    settings.eventChainActors = settings.eventChainActors.filter(name => name !== actorData.name)
    if (!settings.eventChainActors.length) checkAndContinueEvent(act, index)
  }
}

const eventAnimation = (act, index) =>{
  if (act[index] === 'end'){
    endEvent()
  } else if (act[index]?.gateway) {
    transport(act[index].gateway)
    endEvent()
  } else {
    elements.eventCover.classList.remove('hidden')
    Object.keys(act[index]).forEach(actor =>{
      const frame = act[index][actor]
      if (Array.isArray(frame)) {
        settings.eventChainActors.push(actor)
        const actorData = getActorData(actor)
        actorData.motionIndex = 0
        chainAnimation({ act, index, actorData, motionIndex: actorData.motionIndex })
      } else {
        animateActor({ frame, actor })
      }
    })
    if (!settings.eventChainActors.length) checkAndContinueEvent(act, index)
  }
}

const triggerEventAnimation = act => {
  settings.activeEvent = act
  setTimeout(()=> {
    elements.eventCover.classList.remove('hidden')
    eventAnimation(settings.map.eventContents[act].sequences, 0)
  }, 200)
}

const noWall = pos =>{    
  const { map: { data }, npcs } = settings
  if (!data[pos] || player.pos === pos || npcs.some(s => s.pos === pos)) return false
  return settings.map.walls[pos] !== '$'
}

// const positionPlayer = () => {
//   setPos({
//     el: player.el,
//     x: settings.offsetPos.x - settings.mapImage.x,
//     y: settings.offsetPos.y - settings.mapImage.y,
//   })
// }

const walk = (actor, dir) => {
  if (!dir || player.pause) return

  turnSprite({ dir, actor, animate: true })
  const { diff, para, dist } = getWalkConfig(dir) 

  if (noWall(actor.pos + diff)) {
    if (actor === player) {
      settings.mapImage[para] += dist
      setPos(settings.mapImage)
      player.pos += diff
      player.el.parentNode.style.zIndex = mapY() * 32
      positionMapImage()
      checkAndTriggerEvent()
      setPos({ el: elements.location.mark, x: mapX() * 4, y: mapY() * 4 })
      elements.indicator.innerHTML = `pos:${player.pos} dataX:${mapX()} dataY:${mapY()}`
      // positionPlayer()
    } else {
      actor[para] -= dist // note that dist needs to be flipped around
      setPos(actor)
      actor.pos += diff
    }
  }
}

const checkAndTriggerEvent = () => {
  const event = settings.map.events[player.pos]
  if (event) {
    const { gateway, act, url } = event
    if (gateway) setTimeout(()=> transport(gateway), 100)
    if (act && !settings.completedEvents.some(e => e === act)) {
      triggerEventAnimation(act)
    }
    if (url) {
      console.log('url', url)
      window.location = url
      window.location.reload()
    }
  }
}

const createMap = key => {
  const { mapData } = data
  settings.map = {
    ...settings.map,
    ...mapData[key],
    key,
    d: settings.d,
    data: decompress(mapData[key].map),
    walls: decompress(mapData[key].walls),
    w: mapData[key].column,
    h: mapData[key].row,
  }
  const { w, h, d } = settings.map
  settings.mapImage.w = w * d
  settings.mapImage.h = h * d
  setUpCanvas({ canvas: elements.mapImage, w, h, d })

  // create location map
  settings.location.w = w * 4
  settings.location.h = h * 4
  setStyles(settings.location)
  setUpCanvas({ canvas: elements.location, w, h, d: 4 })
  setPos({ el: elements.location.mark, x: mapX() * 4, y: mapY() * 4 })
}

const outputLocationWall = ({ i, tile, d }) => {
  const { column } = settings.map
  const mapX = (i % column) * d
  const mapY = Math.floor(i / column) * d
  elements.location.ctx.fillStyle = tile === '$' ? '#a2fcf0' : '#06a1a1'
  elements.location.ctx.fillRect(mapX, mapY, d, d)
}

const addMapAssets = () => {
  if (settings.map?.mapAssets) {
    const { map: { column }, d } = settings

    document.querySelectorAll('.map-asset').forEach(m => {
      settings.mapImage.el.removeChild(m)
    })
  
    settings.map.mapAssets.forEach(m => {
      const { h, w, pos } = m
      const y = Math.floor(pos / column) * d
      const asset = {
        el: Object.assign(document.createElement('img'), { 
          className: 'map-asset absolute',
          src: m.img,
        }),
        h, w,
        x: (pos % column) * d, 
        y,
      }
      setStyles(asset)
      asset.el.style.zIndex = y
      settings.mapImage.el.appendChild(asset.el)
    })
  }
}

const transport = portal => {
  const { mapData } = data
  transition()
  settings.mapImage.el.classList.add('transition')
  const entryPoint = mapData[settings.map.key].entry[portal]
  if (!entryPoint) return // prevent error when user walks too fast

  player.pos = entryPoint.pos
  createMap(entryPoint.map)
  adjustMapWidthAndHeight()
  clearNpcs()

  addMapAssets()

  setTimeout(()=> {
    settings.mapImage.el.classList.remove('transition')
    settings.map.data.forEach((code, i) => {
      outputFromSpriteSheet({ code, i })
    })
    settings.map.walls.forEach((tile, i) =>{
      outputLocationWall({ 
        i, d: 4, tile
      })
    })
    animateMap()
    spawnNpcs()
    turnSprite({ 
      actor: player,
      dir: entryPoint.dir
    })
    
    checkAndTriggerEvent()
  }, 300)
}



export {
  investigate,
  select,
  showDialog,
  triggerEventAnimation,
  walk,
  checkAndTriggerEvent,
  transport,
  transition
}