const degToRad = deg => deg / (180 / Math.PI)

const resizeCanvas = ({ canvas, w, h }) =>{
  canvas.setAttribute('width', w)
  canvas.setAttribute('height', h || w)
}

const px = n => `${n}px`
const clampMax = (n, max) =>  n < max ? n : max

const setStyles = ({ el, x, y, w, h, d }) => {
  const m = d || 1
  if (w) el.style.width = px(w * m)
  if (h) el.style.height = px(h * m)
  el.style.transform = `translate(${x ? px(x) : 0}, ${y ? px(y) : 0})`
}

export {
  degToRad,
  resizeCanvas,
  px,
  clampMax,
  setStyles
}