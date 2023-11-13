// copyColors, paintCanvas, resize
import { artboard, overlay, aCtx, oCtx, elements, drawboard, dCtx } from '../mapElements.js'
import { nearestN, resizeCanvas, styleTarget, tileX, tileY } from './mapUtils.js'
import { artData } from '../mapState.js'
// import { plainColors, blank } from '../data/tileData.js'
import { tiles, editConfig } from '../../../data/tileData.js'

const degToRad = deg => deg / (180 / Math.PI)

const grid = {
  draw: () => {
    const { column, row, d, gridWidth } = artData
    const { width, height } = artboard.getBoundingClientRect()
  
    oCtx.strokeStyle = artData.gridColor
    oCtx.beginPath()
    const pos = (n, type) => n === type ? n * d - gridWidth : n * d + gridWidth
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



const drawDataUrl = ({ url, color, index, edit, ctx, overrideD, gridData = artData, triggerLast }) => {
  const img = new Image()
  img.onload = () => {
    const { naturalWidth: w, naturalHeight: h } = img
    dCtx.imageSmoothingEnabled = false
    resizeCanvas({
      canvas: drawboard,
      w, h
    })
    if (edit) {
      dCtx.save()
      dCtx.translate(w / 2, h / 2)
      dCtx.rotate(degToRad(editConfig?.[edit[0]]))
      dCtx.scale(edit.includes('h') ? -1 : 1, edit.includes('v') ? -1 : 1)
      dCtx.translate(-w / 2, -h / 2)     
    }
    dCtx.drawImage(img, 0, 0, w, h)
    dCtx.restore()
    
    placeTile({ mapIndex: index, ctx, url, edit, color, overrideD, gridData, triggerLast })
  }
  if (url) {
    img.src = url
  } else {
    placeTile({ mapIndex: index, ctx, color, overrideD, gridData, triggerLast })
  }
}

const drawPos = (e, d) => {
  const { top, left } = artboard.getBoundingClientRect()
  return {
    x: nearestN(e.pageX - left - window.scrollX, d),
    y: nearestN(e.pageY - top - window.scrollY, d)
  }
}

const placeTile = ({ mapIndex, color, url, ctx, overrideD, gridData, triggerLast }) =>{
  const { d: gridD, column } = gridData
  const d = overrideD || gridD
  const mapX = (mapIndex % column) * d
  const mapY = Math.floor(mapIndex / column) * d

  if (color === 'transparent') {
    ctx.clearRect(mapX, mapY, d, d)
  } else {
    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = color || '#a2fcf0'
    ctx.fillRect(mapX, mapY, d, d)
  }

  if (url) ctx.drawImage(drawboard, mapX, mapY, d, d)
  if (triggerLast) {
    triggerLast.count++
    if (triggerLast.count === triggerLast.limit) triggerLast.action()
  }
}

const generateMap = () =>{
  if (!artData.tiles.length) return 
  artData.tiles.forEach((code, i) =>{
    const tile = code?.split('.')?.[0] || code
    const edit = code?.split('.')?.[1]

    drawDataUrl({
      url: tiles[tile]?.img,
      color: tiles[tile]?.color,
      index: i,
      edit,
      ctx: aCtx
    })
  })

  artData.walls.forEach((code, i) =>{
    drawDataUrl({
      color: tiles[code]?.color,
      index: i,
      ctx: elements.wCtx
    })
  })
}


const resize = () =>{
  const { column, row, d } = artData
  ;[overlay, artboard, elements.wallBoard].forEach(b =>{
    resizeCanvas({
      canvas: b,
      w: column * d,
      h: row * d
    })
  })
  styleTarget({
    target: elements.canvasWrapper,
    w: column * d,
    h: row * d
  })
  if (artData.grid) grid.draw()
  generateMap()
}


export {
  drawPos,
  grid,
  placeTile,
  resize,
  drawDataUrl
}