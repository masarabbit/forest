import { map } from '../state.js'
import { wrapper } from '../elements.js'


const setWidthAndHeight = () =>{
  const { offsetWidth: w, offsetHeight: h } = wrapper
  const pWidth = w < 800 ? w : 800
  map.width = 2 * Math.floor((pWidth / map.cellD) / 2)
  const pHeight = h < 600 ? h : 600
  map.height = 2 * Math.floor((pHeight / map.cellD) / 2)
}


const setTargetSize = (target, w, h) => Object.assign(target.style, { width: `${w}px`, height: `${h}px` })

const setTargetPos = (target, x, y) => Object.assign(target.style, { left: `${x}px`, top: `${y}px` })
// const setTargetPos = (target, x, y) => target.style.transform = `translate(${x}px, ${y}px)` // this doesn't work too well with spawn

const adjustRectSize = ({ target, w, h, cellD, cells }) =>{
  setTargetSize(target, w * cellD, h * cellD) 
  cells && cells.forEach(cell=>{
    setTargetSize(cell, cellD, cellD) 
  })
}

const centerOfMap = (width, height) => Math.floor((width * height) / 2) - Math.floor((width / 2)) - 1

const isObject = target => Object.prototype.toString.call(target) === '[object Object]'

const randomDirection = () => ['down', 'right', 'up', 'left'][Math.floor(Math.random() * 4)]

const addEvents = (target, event, action, array) =>{
  array.forEach(a => event === 'remove' ? target.removeEventListener(a, action) : target.addEventListener(a, action))
}
const mouse = {
  up: (t, e, a) => addEvents(t, e, a, ['mouseup', 'touchend']),
  move: (t, e, a) => addEvents(t, e, a, ['mousemove', 'touchmove']),
  down: (t, e, a) => addEvents(t, e, a, ['mousedown', 'touchstart']),
  enter: (t, e, a) => addEvents(t, e, a, ['mouseenter', 'touchstart']),
  leave: (t, e, a) => addEvents(t, e, a, ['mouseleave', 'touchmove'])
}

export {
  setWidthAndHeight,
  setTargetSize,
  setTargetPos,
  adjustRectSize,
  centerOfMap,
  isObject,
  randomDirection,
  mouse
}