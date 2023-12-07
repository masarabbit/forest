import { elements } from './elements.js'
import { player } from './state.js'
import { animateCell } from './utils/animation.js'
import { spriteWrapper, turnSprite, spawnNpcs, clearNpcs } from './utils/sprite.js'
import { settings } from './state.js'
import { decompress } from './utils/compression.js'
import { walkDirections, getWalkConfig } from './data/config.js'
import { setStyles, isObject, setPos } from './utils/utils.js'
import { outputFromSpriteSheet, animateMap, mapX, mapY, setUpCanvas, adjustMapWidthAndHeight } from './mapDraw.js'


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
  elements.controlButtons[0].innerHTML = count === text.length - 1? 'end' : 'next'
}

const displayTextGradual = (t, i) =>{
  elements.texts[1].innerHTML = t.slice(0, i)
  if (i < t.length) {
    setTimeout(()=>{
      displayTextGradual(t, i + 1)
    }, 30)
  }
}

const resumeOrEndEvent = ({ mapData, event }) => {
  if (event && !settings.completedEvents.some(e => e === event.act)){
    settings.activeEvent = event.act
    eventAnimation({ mapData, act: event.act.sequences, index: settings.eventIndex })
  } else {
    settings.eventIndex = 0
  }
}

const clearText = mapData =>{
  const event = player.dialogKey && player.dialog[player.dialogKey].event

  Object.assign(player, {
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
  elements.artwork.innerHTML = ''
  elements.spriteFace.innerHTML = ''
  toggleControl('remove')

  resumeOrEndEvent({ mapData, event })
}


const investigate = (count, eventPoint, mapData) =>{
  if (count < eventPoint.text.length){
    toggleControl('add')
    // displays text and answer
    const text = eventPoint.text[count]
    player.textCount++
    player.pause = true
    elements.texts[0].parentNode.parentNode.classList.remove('hidden')
    updateNextButtonText(count, eventPoint.text)
    displayTextGradual(text, 0)
    if (eventPoint.art && !elements.artwork.innerHTML) elements.artwork.innerHTML = `<img src=${eventPoint.art} />`
    // TODO add trigger for event?
    return
  }
  clearText(mapData) 
}

const select = () =>{
  const { dialogKey: key } = player
  elements.texts[2].innerHTML = ''
  player.answering = false
  player.prevChoices[key] = player.choice
  player.textCount = 0
  player.dialogHistory.push(key)
  player.dialogKey = player.dialog[key].choice[player.optionTexts[player.choice]]
  displayText(player.textCount, false)
}

// displays multiple choice
const displayAnswer = prev =>{ 
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

const displayText = (count, prev) =>{
  const eventPoint = player.dialog[player.dialogKey]
  const nextButton = elements.controlButtons[0]
  elements.texts[1].classList.add('face-displayed')
  elements.texts[0].innerHTML = player.talkTarget.name
  toggleControl('add')

  if (count < eventPoint.text.length){
    const text = eventPoint.text[count]
    const targetExpression = (eventPoint.face && eventPoint.face[count]) || 'happy'
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
    ? displayText(player.textCount, false)
    : clearText()
}


const checkAndContinueEvent = ({ mapData, act, index }) =>{ 
  // carries on event
  if (!Object.keys(act[index]).some(k => isObject(act[index][k])) && index < act.length - 1 && settings.activeEvent){
    settings.eventIndex = index + 1
    setTimeout(()=>{
      eventAnimation({ mapData, act, index: settings.eventIndex })
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
  if (['u', 'd', 'r', 'l'].includes(frame)) walk({ dir, actor: actorData })
  if (['tu', 'td', 'tr', 'tl'].includes(frame)) turnSprite({ dir, actor: actorData })
  // if (dir === 'stop') console.log('stop') // TODO possibly redundant?
  // if (dir === 'resume') actorData.pause = false
  if (isObject(frame)) showDialog({ talkTarget: actorData, dialog: frame.dialog }) 
}

const chainAnimation = ({ mapData, act, index, actorData, motionIndex }) =>{
  const frame = decompress(act[index][actorData.name])
  animateActor({ frame: frame[motionIndex], actor: actorData.name })
  if (motionIndex <= frame.length) {
    actorData.motionIndex++
    setTimeout(()=>{
      chainAnimation({ mapData, act, index, actorData, motionIndex: actorData.motionIndex })
    }, 300)
  } else {
    settings.eventChainActors = settings.eventChainActors.filter(name => name !== actorData.name)
    if (!settings.eventChainActors.length) checkAndContinueEvent({ mapData, act, index })
  }
}

const eventAnimation = ({ mapData, act, index }) =>{
  if (act[index] === 'end'){
    endEvent()
  } else if (act[index]?.gateway) {
    transport({ mapData, portal: act[index].gateway })
    endEvent()
  } else {
    elements.eventCover.classList.remove('hidden')
    Object.keys(act[index]).forEach(actor =>{
      const frame = act[index][actor]
      if(Array.isArray(frame)) {
        settings.eventChainActors.push(actor)
        const actorData = getActorData(actor)
        actorData.motionIndex = 0
        chainAnimation({ mapData, act, index, actorData, motionIndex: actorData.motionIndex })
      } else {
        animateActor({ frame, actor })
      }
    })
    if (!settings.eventChainActors.length) checkAndContinueEvent({ mapData, act, index })
  }
}

const triggerEventAnimation = (act, mapData) => {
  settings.activeEvent = act
  setTimeout(()=> {
    elements.eventCover.classList.remove('hidden')
    eventAnimation({ mapData, act: settings.map.eventContents[act].sequences, index: 0 })
  }, 200)
}

const noWall = pos =>{    
  const { map: { data }, npcs } = settings
  if (!data[pos] || player.pos === pos || npcs.some(s => s.pos === pos)) return false
  return settings.map.walls[pos] !== '$'
}

const walk = ({ mapData, actor, dir }) => {
  if (!dir || player.pause) return

  turnSprite({ dir, actor, animate: true })
  const { diff, para, dist } = getWalkConfig(dir) 

  if (noWall(actor.pos + diff)) {
    if (actor === player) {
      settings.mapImage[para] += dist
      setStyles(settings.mapImage)
      player.pos += diff
      checkAndTriggerEvent(mapData)
      setPos({ el: elements.location.mark, x: mapX() * 4, y: mapY() * 4 })
      elements.indicator.innerHTML = `pos:${player.pos} dataX:${mapX()} dataY:${mapY()}`
    } else {
      actor[para] -= dist // note that dist needs to be flipped around
      setPos(actor)
      actor.pos += diff
    }
  }
}

const checkAndTriggerEvent = mapData => {
  const event = settings.map.events[player.pos]
  if (event) {
    const { gateway, act, url } = event
    if (gateway) setTimeout(()=> transport({ mapData, portal: gateway }), 100)
    if (act && !settings.completedEvents.some(e => e === act)) {
      triggerEventAnimation(act, mapData)
    }
    if (url) {
      console.log('url', url)
      window.location = url
    }
  }
}

const createMap = ({ mapData, key })=> {
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

const transport = ({ mapData, portal }) => {
  transition()
  settings.mapImage.el.classList.add('transition')
  const entryPoint = mapData[settings.map.key].entry[portal]
  if (!entryPoint) return // this added to prevent error when user walks too fast

  player.pos = entryPoint.pos
  createMap({ mapData, key: entryPoint.map })
  adjustMapWidthAndHeight()
  clearNpcs()

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
    spawnNpcs(mapData)
    turnSprite({ 
      actor: player,
      dir: entryPoint.dir
    })
    
    checkAndTriggerEvent(mapData)
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