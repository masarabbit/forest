
// TODO not complete

import { mapData } from '../../area1/mapData.js'
// import { player } from '../../scripts/state.js'

const player = {
  pos: 0,
  frameOffset: 0,
  animationTimer: null,
  // el: elements.player,
  sprite: document.querySelector('.player').childNodes[1],
  facingDirection: 'down',
  walkingDirection: '',
  walkingInterval: null,
  isTalking: false,
  talkTarget: null,
  answering: false,
  pause: true,
  textCount: 0,
  prevChoices: {},
  dialogHistory: [],
  dialog: {},
  dialogKey: null,
}


function init() {

  const elements = {
    wrapper: document.querySelector('.wrapper'),
    eventCover: document.querySelector('.event-cover'),
    // player: document.querySelector('.player'), 
    // transitionCover: document.querySelector('.transition-cover'),
    texts: document.querySelectorAll('.text'),
    artwork: document.querySelector('.artwork'),
    spriteFace: document.querySelector('.face'),
    controlButtons: document.querySelectorAll('.control-button'),


    eventButtons: document.querySelector('.event-buttons'),
    eventsDisplay: document.querySelector('.events-display')
  }
  
  // console.log('app', 

  // )
  const testSetting = {
    eventPoint: null,
    eventIndex: 0
  }

  const eventPoints = Object.keys(mapData).map(map => {
    const events = mapData[map].eventContents
    return events ? Object.keys(events).map(e => events[e]) : []
  }).flat(1)

  eventPoints.forEach((map, i) => {
    const button = Object.assign(document.createElement('button'), { 
      innerHTML: `event ${i}`
    })

    button.addEventListener('click', ()=> {
      console.log(map)
      testSetting.eventPoint = map['first']
      // investigate(0, testSetting.eventPoint)
      elements.eventsDisplay.innerHTML = testSetting.eventPoint.text
    })

    elements.eventButtons.appendChild(button)
  })


  // const toggleControl = action =>{
  //   elements.control.classList[action]('deactivate')
  //   elements.touchToggle.classList[action]('deactivate')
  // }
  
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
  
  const resumeOrEndEvent = event => {
    // if (event && !settings.completedEvents.some(e => e === event.act)){
    //   settings.activeEvent = event.act
    //   eventAnimation({ act: event.act.sequences, index: settings.eventIndex })
    // } else {
    //   settings.eventIndex = 0
    // }
    console.log('resume or end event')
    testSetting.eventIndex = 0
  }
  
  const clearText = () =>{
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
    // toggleControl('remove')
  
    resumeOrEndEvent(event)
  }
  
  
  const investigate = (count, eventPoint) =>{
    if (count < eventPoint.text.length){
      // toggleControl('add')
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
    // toggleControl('add')
  
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

  console.log(  elements.eventButtons.innerHTML)

  const handleTalk = key =>{
    if (['up', 'down', 'left', 'right', ' ', 'enter'].includes(key)) {
      const { answering, options, choice, isTalking, textCount } = player
      if (isTalking) {
        if (answering) {
          options.forEach(option => option.classList.remove('selected'))
          if (key === 'up' && choice > 0) player.choice--
          if (key === 'down' && choice < options.length - 1) player.choice++
          if ([' ', 'enter', 'right'].includes(key)) select()

          // TODO development code. remove later
          displayChoiceDetails()
          options[player.choice].classList.add('selected')
          return
        }
      }
      // if ([' ', 'enter'].includes(key) || (key === 'right' && isTalking)) {
      //   check(textCount)
      //   return
      // }
    }
  }

  const check = count =>{
    const { eventPoint } = testSetting
    investigate(count, eventPoint)
    // if (event?.key) {
    //   const eventPoint = settings.map.eventContents[event.key]
    //   if (player.facingDirection === eventPoint.direction) {
        
    //     return
    //   }
    // }
    // const { column } = settings.map
    // const targetDirection = { r: 1, l: -1, u: -column, d: column }[player.facingDirection[0]]
    // const talkTarget = player.talkTarget || settings.npcs.find(npc => npc.pos === player.pos + targetDirection)
    // if (talkTarget) showDialog({
    //   talkTarget, 
    //   dir: { r: 'left', l: 'right', u: 'down', d: 'up' }[player.facingDirection[0]]
    // })
  }

  const handleKeyAction = e => {
    const key = e.key ? e.key.toLowerCase().replace('arrow','') : e
    if (player.isTalking) {
      handleTalk(key)
    } else if ([' ', 'enter'].includes(key)) {
      check({ count: player.textCount })
    }
  }

  elements.controlButtons.forEach(c =>{
    c.addEventListener('click', ()=> handleKeyAction(c.dataset.c))
  })
}

window.addEventListener('DOMContentLoaded', init)

