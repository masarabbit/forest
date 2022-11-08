import { mouse, setTargetPos } from './utils.js'
import { touchControl } from '../state.js'


const distanceBetween = (a, b) => Math.round(Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)))

const drag = (target, pos, x, y) =>{
  pos.a = pos.c - x
  pos.b = pos.d - y
  const newX = target.offsetLeft - pos.a
  const newY = target.offsetTop - pos.b
  if (distanceBetween({ x: 0,y: 0 }, { x: newX, y: newY }) < 35) {
    setTargetPos(target, newX, newY)
    touchControl.direction = Math.abs(newX) < Math.abs(newY)
      ? newY < 0 ? 'up' : 'down'
      : newX < 0 ? 'left' : 'right'
  }  
}

const client = (e, type) => e.type[0] === 'm' ? e[`client${type}`] : e.touches[0][`client${type}`]
const roundedClient = (e, type) => Math.round(client(e, type))

const addTouchAction = (target, handleKeyAction) =>{
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

export {
  addTouchAction
}