
import { tiles, editConfig, tilesList, tileSheetData,  tileX, tileY } from './data/tileData.js'
import { elements } from './elements.js'
import { degToRad, resizeCanvas } from './utils/utils.js'

import { settings } from './state.js'

const placeTile = ({ mapIndex, color, url, ctx, gridData, triggerLast }) =>{
  const { d, w } = gridData
  const mapX = (mapIndex % w) * d
  const mapY = Math.floor(mapIndex / w) * d

  if (color === 'transparent') {
    ctx.clearRect(mapX, mapY, d, d)
  } else {
    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = color || '#a2fcf0'
    ctx.fillRect(mapX, mapY, d, d)
  }

  if (url) ctx.drawImage(elements.drawboard.el, mapX, mapY, d, d)
  if (triggerLast) {
    triggerLast.count++
    if (triggerLast.count === triggerLast.limit) triggerLast.action()
  }
}

const drawDataUrl = ({ url, color, index, edit, ctx, gridData, triggerLast }) => {
  const { ctx: dCtx } = elements.drawboard
  const img = new Image()
  img.onload = () => {
    const { naturalWidth: w, naturalHeight: h } = img
    dCtx.imageSmoothingEnabled = false
    resizeCanvas({ canvas: elements.drawboard.el, w, h })
    if (edit) {
      dCtx.save()
      dCtx.translate(w / 2, h / 2)
      dCtx.rotate(degToRad(editConfig?.[edit[0]]))
      dCtx.scale(edit.includes('h') ? -1 : 1, edit.includes('v') ? -1 : 1)
      dCtx.translate(-w / 2, -h / 2)     
    }
    dCtx.drawImage(img, 0, 0, w, h)
    dCtx.restore()
    
    placeTile({ mapIndex: index, ctx, url, edit, color, gridData, triggerLast })
  }
  if (url) {
    img.src = url
  } else {
    placeTile({ mapIndex: index, ctx, color, gridData, triggerLast })
  }
}

const createSpriteSheet = () => {
  resizeCanvas({
    canvas: elements.spriteSheet.el,
    w: tileSheetData.d * tileSheetData.w, 
    h: tileSheetData.d * tileSheetData.h
  })
  const triggerLast = {
    count: 0,
    limit: tilesList.length - 1,
    action: ()=> elements.startButton.classList.remove('hidden')
  }
  tilesList.forEach((code, i) => {
    const tile = code[0]?.split('.')?.[0] || code[0]
    const edit = code[0]?.split('.')?.[1]

    const url = tiles[tile]?.frames 
      ? tiles[tile].frames[code[1]] 
      : tiles[tile]?.img

    drawDataUrl({
      url,
      color: tiles[tile]?.color,
      index: i,
      edit,
      ctx: elements.spriteSheet.ctx,
      gridData: tileSheetData,
      triggerLast
    })  
  })
}

const outputFromSpriteSheet = ({ code, i, offset = 0 }) => {
  const { d, map: { column } } = settings

  const mapX = (i % column) * d
  const mapY = Math.floor(i / column) * d
  const index = tilesList.map(t => t[0]).indexOf(code) + offset

  elements.mapImage.ctx.imageSmoothingEnabled = false
  elements.mapImage.ctx.drawImage(elements.spriteSheet.el, tileX(index), tileY(index), 16, 16, mapX, mapY, d, d)
}

const animateMap = () => {
  clearInterval(settings.animInterval)
  settings.animInterval = setInterval(()=> {
    settings.animCounter++
    if (settings.animCounter === 6) settings.animCounter = 0

    settings.map.data.forEach((code, i) =>{
      const tile = code?.split('.')?.[0] || code
      if (tiles[tile]?.frames && tiles[tile]?.sequence) {
        outputFromSpriteSheet({ 
          code, i, offset: tiles[tile].sequence[settings.animCounter] 
        })
      }
    })
  }, 500)
}

export {
  drawDataUrl,
  createSpriteSheet,
  outputFromSpriteSheet,
  animateMap 
}