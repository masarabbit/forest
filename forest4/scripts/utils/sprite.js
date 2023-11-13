import { settings } from '../state.js'
import { setPos, randomDirection } from './utils.js'
import avatars from '../data/avatars.js'
import { walkDirections } from '../data/config.js'
import { mapData } from '../data/mapData.js'
import { walk } from '../actions.js'

const setSpritePos = (n, actor) =>{
  actor.spritePos = n
  // this can't be set with translate, because translate is used to flip sprites too.
  actor.sprite.style.marginLeft = `${n}px`
}

const frames = {
  right: [4, 6, 5, 'add'],
  left: [4, 6, 5, 'remove'],
  up: [2, 2, 3, 'toggle'],
  down: [0, 0, 1, 'toggle']
}

const turnSprite = ({ dir, actor, animate }) => {
  // const dir = e || 'down'
  actor.facingDirection = dir
  const { frameOffset } = actor
  const { d } = settings
  let m = -d
  m = animate ? m * frames[dir][0 + frameOffset] : m * frames[dir][2]
  actor.frameOffset = frameOffset === 0 ? 1 : 0
  actor.el.classList[frames[dir][3]]('right') 

  clearTimeout(actor.animationTimer)
  actor.animationTimer = setTimeout(()=>setSpritePos(-d * frames[dir][2], actor), 100)
  setSpritePos(m, actor)
}

const spriteWrapper = ( { img, wrapper, frameNo, speed, frameSize = 64 } ) =>{
  const size = frameSize || 16
  const width = size * (frameNo || 1)
  return `
    <div class="${wrapper}">
      ${frameNo ? `<div class="img-bg" style="background-image: url(${img}); width:${width}px; height:${size}px; background-size: ${width}px ${size}px !important;" ${frameNo ? `data-frame_no="${frameNo}" data-current="0"` : ''}  ${speed ? `data-speed="${speed}"` : ''}>` : ''}
      ${frameNo ? '</div>' : ''}
    </div>
    `
}


const clearNpcs = () => {
  if (settings.npcs.length) {
    settings.npcs.forEach(npc => {
      clearInterval(npc.interval)
      settings.mapImage.el.removeChild(npc.el)
    })
  }
  settings.npcs.length = 0
}

const npcMotion = actor =>{
  if (actor.pause || !settings.isWindowActive) return

  const { motion, motionIndex: index } = actor
  if (motion === 'randomWalk') {
    walk({ actor, dir: randomDirection() })
  } else if (motion === 'randomTurn') {
    if (Math.random() < 0.5)
    turnSprite({ actor, dir: randomDirection() })
  } else if (motion.includes('facing')) {
    turnSprite({
    actor, dir: walkDirections[motion.split('-')[1]] }) //TODO possibly revisit this to simplify
  } else if (Array.isArray(motion)) {
    // if motion[index] is 0, it would be falsy so walk is skipped
    if (motion[index]) walk({ actor, dir: walkDirections[motion[index]] })
    actor.motionIndex = index === motion.length - 1 ? 0 : index + 1
  }
}

const spawnNpcs = () =>{
  const { map: { column }, d } = settings
  mapData[settings.map.key].npcs?.forEach((c, i)=>{
    const { pos, avatar, defaultDir } = c

    settings.npcs[i] = {
      ...c,
      interval: null,
      x: Math.floor(pos % column) * d,
      y: Math.floor(pos / column) * d,
      animationTimer: null,
      frameOffset: 0,
      face: avatars[avatar].face,
      el: Object.assign(document.createElement('div'), 
        { className: 'sprite-container overflow-hidden npc',
          innerHTML: `<div><div class="sprite ${avatars[avatar].sprite}"></div></div>` 
          //npc need additional div so transition isn't applied to transform: scale(-1, 1)
        }),
      // motionIndex: Array.isArray(motion) ? 0 : null, // TODO maybe fine to have this as 0
      motionIndex: 0,
      // pause: false
    }
    settings.npcs[i].sprite = settings.npcs[i].el.childNodes[0].childNodes[0]
    setPos(settings.npcs[i])
    settings.mapImage.el.appendChild(settings.npcs[i].el)   

    settings.npcs[i].interval = setInterval(()=>{
      npcMotion(settings.npcs[i])
    }, avatars[avatar].speed)

    turnSprite({
      actor: settings.npcs[i],
      dir: defaultDir
    })
  })
}

export {
  turnSprite,
  spriteWrapper,
  clearNpcs,
  spawnNpcs
}