// import { setTargetSize } from './utils/utils.js'

function init() {

  const mapData = {
    width: 30,
    height: 20,
    cellD: 20,
    grid: document.querySelector('.grid')
  }

  const setTargetSize = (target, w, h) => {
    target.setAttribute('style', `width:${w}px; height:${h}px; --width:${w}px; --height: ${h}px;`)  
  }

  const gridToMap = (w, h)=> new Array(w * h).fill('')
  const cellSize = d => `width:${d}px; height:${d}px`

  
  const createGrid = () =>{
    const { width: w, height: h, cellD: d, grid } = mapData
    setTargetSize(grid, w * d, h * d)
    grid.innerHTML = gridToMap(w, h).map((_m, i)=> {
      return `<div class="cell" style="${cellSize(d)}">${i}</div>`
    }).join('')
  }

  createGrid()

  // const createBaseArea = () =>


}

window.addEventListener('DOMContentLoaded', init)