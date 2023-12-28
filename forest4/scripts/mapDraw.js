
import { elements } from './elements.js'
import { degToRad, resizeCanvas, setPos } from './utils/utils.js'
import { editConfig } from './data/config.js'

import { settings, player, data } from './state.js'

const placeTile = ({ mapIndex, color, url, ctx, gridData, triggerLast }) =>{
  const { d, column } = gridData
  const mapX = (mapIndex % column) * d
  const mapY = Math.floor(mapIndex / column) * d

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
  const { tileData: { tiles, tilesList, tileSheetData } } = data
  resizeCanvas({
    canvas: elements.spriteSheet.el,
    w: tileSheetData.d * tileSheetData.column, 
    h: tileSheetData.d * tileSheetData.row
  })
  const triggerLast = {
    count: 0,
    limit: tilesList.length - 1,
    action: ()=> {
      if (elements?.startButton)  elements.startButton.classList.remove('hidden')
    }
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
  const { tileData: { tilesList, tileX, tileY } } = data
  const { d, map: { column } } = settings

  const mapX = (i % column) * d
  const mapY = Math.floor(i / column) * d
  const index = tilesList.map(t => t[0]).indexOf(code) + offset

  elements.mapImage.ctx.imageSmoothingEnabled = false
  elements.mapImage.ctx.drawImage(elements.spriteSheet.el, tileX(index), tileY(index), 16, 16, mapX, mapY, d, d)
}

const animateMap = () => {
  const { tileData: { tiles } } = data
  clearInterval(settings.animInterval)
  settings.animInterval = setInterval(()=> {
    settings.animCounter++
    if (settings.animCounter === 6) settings.animCounter = 0

    settings.map.data.forEach((code, i) =>{
      const tile = code?.split('.')?.[0] || code
      if (tiles[tile]?.frames && tiles[tile]?.sequence) {
        outputFromSpriteSheet({ 
          code, i,
          offset: tiles[tile].sequence[settings.animCounter],
        })
      }
    })
  }, 500)
}

const mapX = () => player.pos % settings.map.column 
const mapY = () => Math.floor(player.pos / settings.map.column)


const updateOffset = () => {
  const { width, height } = elements.wrapper.getBoundingClientRect()
  settings.offsetPos = {
    x: (width / 2) - 16,
    y: (height / 2) - 16,
  }
}


const positionMapImage = () => {
  const { offsetPos: { x, y }, d } = settings
  settings.mapImage.x = x - (mapX() * d)
  settings.mapImage.y = y - (mapY() * d)
}

const adjustMapWidthAndHeight = () =>{
  updateOffset()
  positionMapImage()
  setPos(settings.mapImage)

  settings.mapImage.el.classList.add('transition')
  clearTimeout(settings.transitionTimer)
  settings.transitionTimer = setTimeout(()=> {
    settings.mapImage.el.classList.remove('transition')
  }, 500)
}

const setUpCanvas = ({ canvas, w, h, d }) => {
  resizeCanvas({
    canvas: canvas.el,
    w: w * d, 
    h: h * d
  })
  canvas.ctx = canvas.el.getContext('2d')
  canvas.ctx.imageSmoothingEnabled = false
}

export {
  drawDataUrl,
  createSpriteSheet,
  outputFromSpriteSheet,
  animateMap,
  adjustMapWidthAndHeight,
  mapX,
  mapY,
  setUpCanvas,
  positionMapImage
}