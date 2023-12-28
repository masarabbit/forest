const degToRad = deg => deg / (180 / Math.PI)

const resizeCanvas = ({ canvas, w, h }) =>{
  canvas.setAttribute('width', w)
  canvas.setAttribute('height', h || w)
}

const px = n => `${n}px`
// const clampMax = (n, max) =>  n < max ? n : max

const setStyles = ({ el, x, y, w, h, d }) => {
  const m = d || 1
  if (w) el.style.width = px(w * m)
  if (h) el.style.height = px(h * m)
  el.style.transform = `translate(${x ? px(x) : 0}, ${y ? px(y) : 0})`
}

const addEvents = (target, event, action, array) =>{
  array.forEach(a => event === 'remove' ? target.removeEventListener(a, action) : target.addEventListener(a, action))
}

const mouse = {
  up: (t, e, a) => addEvents(t, e, a, ['mouseup', 'touchend']),
  move: (t, e, a) => addEvents(t, e, a, ['mousemove', 'touchmove']),
  down: (t, e, a) => addEvents(t, e, a, ['mousedown', 'touchstart']),
  enter: (t, e, a) => addEvents(t, e, a, ['mouseenter', 'touchstart']),
  leave: (t, e, a) => addEvents(t, e, a, ['mouseleave'])
}

const setPos = ({ el, x, y }) => Object.assign(el.style, { left: `${x}px`, top: `${y}px` })
const randomDirection = () => ['down', 'right', 'up', 'left'][Math.floor(Math.random() * 4)]
const isObject = target => Object.prototype.toString.call(target) === '[object Object]'

export {
  degToRad,
  resizeCanvas,
  px,
  // clampMax,
  setStyles,
  mouse,
  setPos,
  randomDirection,
  isObject
}