// copyColors, paintCanvas, resize
import { artboard, overlay, aCtx, oCtx, elements } from '../mapElements.js'
import { nearestN, resizeCanvas, styleTarget, tileX, tileY } from './mapUtils.js'
import { artData } from '../mapState.js'
import { tiles, plainColors, blank } from '../data/tileData.js'


const grid = {
  draw: () => {
    const { column, row, cellD, gridWidth } = artData
    const { width, height } = artboard.getBoundingClientRect()
  
    oCtx.strokeStyle = artData.gridColor
    oCtx.beginPath()
    const pos = (n, type) => n === type ? n * cellD - gridWidth : n * cellD + gridWidth
    for (let x = 0; x <= column; x += 1) {
      oCtx.moveTo(pos(x, column), gridWidth)
      oCtx.lineTo(pos(x, column), height - gridWidth)
    }
    for (let y = 0; y <= row; y += 1) {
      oCtx.moveTo(gridWidth, pos(y, row))
      oCtx.lineTo(width - gridWidth, pos(y, row))
    }
    oCtx.stroke()
  },
  clear: () => {
    const { width, height } = artboard.getBoundingClientRect()
    oCtx.clearRect(0, 0, width, height)
  }
}


const drawPos = (e, cellD) => {
  const { top, left } = artboard.getBoundingClientRect()
  return {
    x: nearestN(e.pageX - left - window.scrollX, cellD),
    y: nearestN(e.pageY - top - window.scrollY, cellD)
  }
}

const placeTile = ({ sprite, tile, mapIndex  }) =>{
  const tileIndex = tiles.indexOf(tile)
  const { cellD: d, column } = artData
  const mapX = (mapIndex % column) * d
  const mapY = Math.floor(mapIndex / column) * d
  aCtx.imageSmoothingEnabled = false

  if (tile !== blank) {
    aCtx.fillStyle = plainColors[tile] || '#a2fcf0' // TODO check if background can be blank
    aCtx.fillRect(mapX, mapY, d, d)
    aCtx.drawImage(sprite, tileX(tileIndex), tileY(tileIndex), 16, 16, mapX, mapY, d, d)
  } else {
    aCtx.clearRect(mapX, mapY, d, d)
  }
}

const generateMap = () =>{
  artData.tiles.forEach((code, i) =>{
    placeTile({ sprite: elements.spriteSheets[0], tile: code, mapIndex: i })
  })
}


const resize = () =>{
  const { column, row, cellD } = artData
  const boards = [overlay, artboard]
  boards.forEach(b =>{
    resizeCanvas({
      canvas: b,
      w: column * cellD,
      h: row * cellD
    })
  })
  styleTarget({
    target: elements.canvasWrapper,
    w: column * cellD,
    h: row * cellD
  })
  if (artData.grid) grid.draw()
  generateMap()
}


export {
  drawPos,
  grid,
  placeTile,
  resize
}