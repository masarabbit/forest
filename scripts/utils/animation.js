const animateCell = ({ target, start, end, interval, speed }) => {
  const startFrame = start || 0
  let i = startFrame
  clearInterval(interval)
  interval = setInterval(()=> {
    target.style.marginLeft = `${-(i * 100)}%`
    i = i >= end
      ? startFrame
      : i + 1
  }, speed || 200)
}

const animateCells = (interval, cells) => {
  interval = setInterval(()=> {
    cells.forEach( cell =>{
      const current =  cell.style.marginLeft.replace('%','') / -100
      // console.log('anim', animInterval)
      const next = current >= cell.dataset.frame_no - 1
        ? 0
        : current + 1
      cell.style.marginLeft = `${-(next * 100)}%`  
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