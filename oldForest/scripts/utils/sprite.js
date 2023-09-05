import { map } from '../state.js'


const setSpritePos = (num, actor, sprite) =>{
  actor.spritePos = num
  // this can't be set with translate, because translate is used to flip sprites too.
  sprite.style.marginLeft = `${num}px`
}

const turnSprite = ({ e, actor, sprite, animate }) => {
  const dir = e || 'down'
  actor.facingDirection = dir
  const { frameOffset } = actor
  const { cellD } = map
  const frames = {
    right: [4, 6, 5, 'add'],
    left: [4, 6, 5,'remove'],
    up: [2, 2, 3,'toggle'],
    down: [0, 0, 1, 'toggle']
  }
  let m = -cellD
  m = animate ? m * frames[dir][0 + frameOffset] : m * frames[dir][2]
  actor.frameOffset = frameOffset === 0 ? 1 : 0
  sprite.parentNode.classList[frames[dir][3]]('right') 
  clearTimeout(actor.animationTimer)
  actor.animationTimer = setTimeout(()=>setSpritePos(-cellD * frames[dir][2], actor, sprite), 100)
  setSpritePos(m, actor, sprite)
}

const spriteWrapper = ( { url, wrapper, frameNo, speed, frameSize } ) =>{
  const size = frameSize || 16
  const width = size * (frameNo || 1)
  return `
    <div class="${wrapper}">
      ${frameNo ? `<div class="svg_anim img-bg" style="background-image: url(${url}); width:${width}px; height:${size}px; background-size: ${width}px ${size}px !important;" ${frameNo ? `data-frame_no="${frameNo}" data-current="0"` : ''}  ${speed ? `data-speed="${speed}"` : ''}>` : ''}
      ${frameNo ? '</div>' : ''}
    </div>
    `
}

export {
  setSpritePos,
  turnSprite,
  spriteWrapper
}