import { artData, copyData } from '../mapState.js'
import { elements, aCtx, overlay, tilesData } from '../mapElements.js'
import { resizeCanvas, styleTarget, mouse, nearestN, update } from './mapUtils.js'
import { drawPos, resize } from './draw.js'

// TODO possibly copy and edit walls at the same time as map tiles
// copyColors, paintCanvas,

const client = (e, type) => e.type[0] === 'm' ? e[`client${type}`] : e.touches[0][`client${type}`]
const roundedClient = (e, type) => nearestN(client(e, type), artData.d)


const resizeBox = (e, box) =>{
  const { d, column, row, gridWidth } = artData
  const { defPos, xy } = copyData
  const { x, y } = drawPos(e, d)
  const newXy = {
    x: (x - d) / d + 1,
    y: (y - d) / d + 1,
  }
  const xIncreased = newXy.x >= xy.x
  const yIncreased = newXy.y >= xy.y 
  const xDiff = Math.abs(newXy.x, xy.x) * d
  const yDiff = Math.abs(newXy.y, xy.y) * d
  const adjustedXdiff = xDiff >= column * d ? column * d : xDiff
  const adjustedYdiff = yDiff >= row * d ? row * d : yDiff
  const w = xIncreased ? adjustedXdiff - defPos.x + gridWidth : defPos.x - xDiff + (2 * gridWidth)
  const h = yIncreased ? adjustedYdiff - defPos.y + gridWidth : defPos.y - yDiff + (2 * gridWidth)

  resizeCanvas({
    canvas: box,
    w, h
  })
  styleTarget({
    target: box,
    w, h,
    x: xIncreased ? defPos.x : xDiff - gridWidth,
    y: yIncreased ? defPos.y : yDiff - gridWidth,
  })
}

const drag = (target, pos, x, y) =>{
  pos.a = pos.c - x
  pos.b = pos.d - y
  styleTarget({
    target, 
    x: target.offsetLeft - pos.a,
    y: target.offsetTop - pos.b,
  })
}

const addTouchAction = target =>{
  const pos = { a: 0, b: 0, c: 0, d: 0 }
  
  const onGrab = e =>{
    pos.c = roundedClient(e, 'X')
    pos.d = roundedClient(e, 'Y')  
    mouse.up(document, 'add', onLetGo)
    mouse.move(document, 'add', onDrag)
  }
  const onDrag = e =>{
    const x = roundedClient(e, 'X')
    const y = roundedClient(e, 'Y')
    if (copyData.move) {
      drag(target, pos, x, y)
    } else {
      resizeBox(e, target, pos)
    }
    pos.c = x
    pos.d = y
  }
  const onLetGo = e => {
    mouse.up(document, 'remove', onLetGo)
    mouse.move(document,'remove', onDrag)
    if (!copyData.move) {
      const { d, gridWidth } = artData
      const { width, height } = target.getBoundingClientRect()
      const { x, y } = drawPos(e, d)
      Object.assign(copyData, {
        size: {
          w: width - gridWidth,
          h: height - gridWidth,
        },
        xy: {
          x: (x - d) / d + 1,
          y: (y - d) / d + 1,
        }
      })
    }
    copyData.defPos = {
      x: target.offsetLeft,
      y: target.offsetTop,
    }
  }
  mouse.down(target,'add', onGrab)
}

const createSelectBox = e =>{
  if (!elements.selectBox) {
    const { d, gridWidth } = artData
    const selectBox = document.createElement('canvas')
    selectBox.classList.add('select_box')
    const boxD = d - gridWidth
    elements.canvasWrapper.append(selectBox)
    resizeCanvas({
      canvas: selectBox,
      w: boxD
    })
    const { x, y } = drawPos(e, d)

    Object.assign(copyData, {
      defPos: {
        x: x - d,
        y: y - d,
      },
      xy: {
        x: (x - d) / d + 1,
        y: (y - d) / d + 1,
      },
      size: {
        w: d,
        h: d,
      },
    })
    styleTarget({
      target: selectBox,
      x: copyData.defPos.x,
      y: copyData.defPos.y
    })
    elements.selectBox = selectBox
    addTouchAction(selectBox)
    copyData.move = false
  }
}


// TODO this isn't working as expected. Not returning the selected area
const copyTiles = ({ offset, w, h, copyData, tiles, cut }) =>{
  const { d, column } = artData
  if (!cut) copyData.length = 0
  const tilesToCut = []
  for (let i = 0; i < w * h; i++) {
    const x = i % w * d
    const y = Math.floor(i / w) * d
    const mapIndex = ((y / d) * column) + x / d
    if (cut){ 
      tilesToCut.push(mapIndex + offset)
    } else {
      copyData.push(artData[tiles][mapIndex + offset])
    }
  }
  if (cut) copyData[tiles] = artData[tiles].map((tile, i) => tilesToCut.includes(i) ? 'zz' : tile)
}


const copySelection = ({ crop, cut }) => {
  if (elements.selectBox) {
    copyData.ctx = elements.selectBox.getContext('2d')
    const { size: { w, h }, defPos: { x, y }, ctx } = copyData
    ctx.imageSmoothingEnabled = false
    ctx.putImageData(aCtx.getImageData(x, y, w, h), 0, 0)
    const { column, d } = artData
    copyData.move = true
    const offset = ((y / d) * column) + x / d
    
    tilesData.forEach(data => {
      copyTiles({
        offset,
        w: w / artData.d,
        h: h / artData.d,
        copyData: copyData[data.tiles],
        tiles: data.tiles
      })
      if (cut) {
        data.ctx.clearRect(x, y, w, h) 
        copyTiles({ 
          offset,
          w: w / artData.d,
          h: h / artData.d,
          copyData: artData,
          cut: true,
          tiles: data.tiles
        })
        data.input.value = artData[data.tiles]
      }  
    })
  
    if (crop) {
      tilesData.forEach(data => {
        paste({ data, crop: true })
        artData[data.tiles] = copyData[data.tiles]
      })
      update('column', w / d)
      update('row', h / d)
      // When cropping, we need to resize after updating column and row
      resize()
      copyData.defPos = { x: 0, y: 0 }
      select()
    }
  }
}

const paste = ({ data, crop }) => {
  if (copyData[data.tiles].length){
    const { d, column } = artData
    const { size: { w, h }, defPos: { x, y } } = copyData
    const index = (((y + d) / d - 1) * column) + (x + d) / d - 1
    const width = w / d
    copyData.index = Array(width * (h / d)).fill('').map((_, i) => {
      return index + i + Math.floor(i / width) * (column - width)
    }) 
    copyData.index.forEach((index, i) => {
      artData[data.tiles][index] = copyData[data.tiles][i] 
    })
    data.input.value = artData[data.tiles]
    if (!crop) resize()  

    // TODO add some sort of effect to show that it's pasted? (difficult to see right now)
  }
}

const select = () => {
  overlay.classList.toggle('select')
  if (elements.selectBox) {
    elements.canvasWrapper.removeChild(elements.selectBox)
    elements.selectBox = null
  }
}


export {
  createSelectBox,
  copySelection,
  paste,
  select
}
