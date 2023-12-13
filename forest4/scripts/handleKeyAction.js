
import { player, settings } from './state.js'
import { select, investigate, showDialog, walk } from './actions.js'
import { elements } from './elements.js'

const displayChoiceDetails = () =>{
  elements.indicator.innerHTML = (   
    `<div>
      <p>bear textCount: ${player.textCount}</p>
      <p>bear choice: ${player.choice}</p>
      <p>bear prevchoice: ${player.prevChoice}</p>
    </div>`
  )
}

const handleTalk = ({ key, mapData, tileData }) =>{
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
    if ([' ', 'enter'].includes(key) || (key === 'right' && isTalking)) {
      check({ count: textCount, mapData, tileData })
      return
    }
  }
}

const check = ({ count, mapData, tileData }) =>{
  const event = settings.map.events[player.pos]
  if (event?.key) {
    const eventPoint = settings.map.eventContents[event.key]
    if (player.facingDirection === eventPoint.direction) {
      investigate({ count, eventPoint, mapData, tileData })
      return
    }
  }
  const { column } = settings.map
  const targetDirection = { r: 1, l: -1, u: -column, d: column }[player.facingDirection[0]]
  const talkTarget = player.talkTarget || settings.npcs.find(npc => npc.pos === player.pos + targetDirection)
  if (talkTarget) showDialog({
    talkTarget, 
    dir: { r: 'left', l: 'right', u: 'down', d: 'up' }[player.facingDirection[0]]
  })
}

const handleWalk = ({ dir, mapData, tileData }) =>{
  if (player.walkingDirection !== dir){
    clearInterval(player.walkingInterval)
    player.walkingDirection = dir
    player.walkingInterval = setInterval(()=>{
      player.walkingDirection && !settings.activeEvent
        ? walk({ mapData, tileData, actor: player, dir })
        : clearInterval(player.walkingInterval)
    }, 150)
  }
}

const handleKeyAction = ({ e, mapData, tileData }) => {
  const key = e.key ? e.key.toLowerCase().replace('arrow','') : e
  if (player.isTalking) {
    handleTalk({ key, mapData, tileData })
  } else if (e.key && e.key[0] === 'A'){
    handleWalk({ dir: key, mapData, tileData })
  } else if ([' ', 'enter'].includes(key)) {
    console.log('enter')
    check({ count: player.textCount, mapData })
  }
}



export {
  handleKeyAction
}
