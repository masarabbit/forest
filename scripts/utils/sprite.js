import { map } from '../state.js'


const setSpritePos = (num, actor, sprite) =>{
  actor.spritePos = num
  // this can't be set with translate, because translate is used to flip sprites too.
  sprite.style.marginLeft = `${num}px`
}

const turnSprite = ({ e, actor, sprite, animate }) => {
  const dir = e || 'down'
  actor.facingDirection = dir
  const { cellD } = map
  const frames = {
    right: [4, 6, 5, 'add'],
    left: [4, 6, 5,'remove'],
    up: [2, 2, 3,'toggle'],
    down: [0, 0, 1, 'toggle']
  }
  let m = -cellD
  m = animate ? m * frames[dir][0] : m * frames[dir][2]
  sprite.parentNode.classList[frames[dir][3]]('right') 
  actor.animationTimer.forEach(timer=> clearTimeout(timer))
  if (animate){
    actor.animationTimer[0] = setTimeout(()=>setSpritePos(-cellD * frames[dir][1], actor, sprite), 100)
    actor.animationTimer[1] = setTimeout(()=>setSpritePos(-cellD * frames[dir][2], actor, sprite), 200) 
  }   
  setSpritePos(m, actor, sprite)
}

export {
  setSpritePos,
  turnSprite
}