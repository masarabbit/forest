const setTargetSize = (target, w, h) => Object.assign(target.style, { width: `${w}px`, height: `${h}px` })

const setTargetPos = (target, x, y) => Object.assign(target.style, { left: `${x}px`, top: `${y}px` })

const adjustRectSize = (target, w, h, cellD, cells) =>{
  setTargetSize(target, w * cellD, h * cellD) 
  cells && cells.forEach(cell=>{ setTargetSize(cell, cellD, cellD) })
}

const centerOfMap = (width, height) =>{
  return Math.floor((width * height) / 2) - Math.floor((width / 2)) - 1
}

export {
  setTargetSize,
  setTargetPos,
  adjustRectSize,
  centerOfMap
}