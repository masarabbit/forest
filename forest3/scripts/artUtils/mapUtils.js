import { input } from '../mapElements.js'
import { artData } from '../mapState.js'


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

const nearestN = (x, n) => x === 0 ? 0 : (x - 1) + Math.abs(((x - 1) % n) - n)
const isNum = x => typeof x === 'number'
const tileX = index => (index % 10) * 16
const tileY = index => Math.floor(index / 10) * 16

const styleTarget = ({ target, w, h, x, y }) =>{
  const t = target.style
  if (isNum(w)) t.width = `${w}px`
  if (isNum(w) && !isNum(h)) t.height = `${w}px`
  if (isNum(h)) t.height = `${h}px`
  if (isNum(x)) t.left = `${x}px`
  if (isNum(y)) t.top = `${y}px`
}

const resizeCanvas = ({ canvas, w, h }) =>{
  canvas.setAttribute('width', w)
  canvas.setAttribute('height', h || w)
}

// TODO use this in app
const update = (key, value) => {
  input[key].value = value
  artData[key] = key === 'colors' ? value.split(',') : value
}


export {
  mouse,
  nearestN,
  isNum,
  tileX,
  tileY,
  styleTarget,
  resizeCanvas,
  update,
}