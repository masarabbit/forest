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
  
  const createGrid = () =>{
    const { width, height, cellD } = mapData
    setTargetSize(mapData.grid, width * cellD, height * cellD)
    mapData.grid.innerHTML = new Array(width * height).fill('').map(()=> {
      return `<div class="cell" style="width:${cellD}px; height:${cellD}px"></div>`
    }).join('')
  }

  createGrid()


}

window.addEventListener('DOMContentLoaded', init)