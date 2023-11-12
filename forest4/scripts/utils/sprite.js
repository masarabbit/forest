import { settings } from '../state.js'

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

export {
  turnSprite,
  spriteWrapper
}