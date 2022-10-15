import { map } from '../state.js'

const animateCell = ({ target, start, end, interval, speed }) => {
  const startFrame = start || 0
  let i = startFrame
  clearInterval(interval)
  interval = setInterval(()=> {
    target.style.transform = `translateX(${-(i * 100)}%)`
    i = i >= end
      ? startFrame
      : i + 1
  }, speed || 200)
}

const animateCells = (interval, cells) => {
  interval = setInterval(()=> {
    cells.forEach(cell =>{
      const { current, frame_no }  =  cell.dataset
      // console.log('anim', animInterval)
      const next = current >= frame_no - 1
        ? 0
        : +current + 1
      cell.style.transform = `translateX(${-(next * map.cellD)}px)`
      cell.dataset.current = next
    })
  }, 500)
}

const startCellAnimations = interval =>{
  clearInterval(interval)
  const cells = document.querySelectorAll('.svg_anim')
  animateCells(interval, cells)
}

export {
  animateCell,
  startCellAnimations 
}