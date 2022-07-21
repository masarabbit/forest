import mapData from './data/mapData.js'
import { tiles, riverTiles, plainColors } from './data/tileData.js'



function init() {

  let paletteCells

  const spriteSheets = document.querySelectorAll('.sprite_sheet')
  const elements = {
    cursor: document.querySelector('.cursor')
  }
  const palettes = document.querySelectorAll('.palette')
  
  // button
  let alts = document.querySelectorAll('.alt')
  const copyButtons = document.querySelectorAll('.copy') 
  const indexToggleButton = document.querySelector('.display_index')
  const buttons = document.querySelectorAll('.btn')

  // input
  const cellSizeInputs = document.querySelectorAll('.cell_size')
  const rowInputs = document.querySelectorAll('.row')
  const columnInputs = document.querySelectorAll('.column')
  const letterInput = document.querySelector('.letter')
  const codesBox = document.querySelectorAll('.codes')
  const indexIndicator = document.querySelector('.index_indicator')
  const codes = {
    0: [],
    // 1: []
  }

  const canvasWrapper = document.querySelector('.canvas_wrapper')
  const artboard = document.querySelector('.artboard')
  const overlay = document.querySelector('.overlay')
  const aCtx = artboard.getContext('2d')
  const oCtx = overlay.getContext('2d')

  const mapKeys = Object.keys(mapData)
  const mapLinks = document.querySelector('.map_link')

  const grid = {
    draw: () => {
      const { column, row, cellSize, gridWidth } = artData
      const { width, height } = artboard.getBoundingClientRect()
    
      oCtx.strokeStyle = artData.gridColor
      oCtx.beginPath()
      const pos = (n, type) => n === type ? n * cellSize - gridWidth : n * cellSize + gridWidth
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

  const addEvents = (target, event, action, array) =>{
    array.forEach(a => event === 'remove' ? target.removeEventListener(a, action) : target.addEventListener(a, action))
  }

  const mouse = {
    up: (t, e, a) => addEvents(t, e, a, ['mouseup', 'touchend']),
    move: (t, e, a) => addEvents(t, e, a, ['mousemove', 'touchmove']),
    down: (t, e, a) => addEvents(t, e, a, ['mousedown', 'touchstart']),
    enter: (t, e, a) => addEvents(t, e, a, ['mouseenter', 'touchstart']),
    leave: (t, e, a) => addEvents(t, e, a, ['mouseleave', 'touchmove'])
  }

  const artData = {
    cursor: 'pen_cursor',
    draw: false,
    grid: true,
    gridWidth: 0.5,
    cellSize: 20,
    row: 20,
    column: 20,
    gridColor: 'lightgrey',
    erase: false,
  }

  const nearestN = (x, n) => x === 0 ? 0 : (x - 1) + Math.abs(((x - 1) % n) - n)
  const isNum = x => x * 0 === 0
  const tileX = index => (index % 9) * 16
  const tileY = index => Math.floor(index / 9) * 16

  const compress = value =>{
    const originalArray = value.split(',')
    let count = 0
    const record = []

    originalArray.forEach((letter,i)=>{
      const next = i > originalArray.length ? '' : originalArray[i + 1]
      count++
      if (letter === next) return
      record.push([letter,count])
      count = 0 
    })

    return record.map(x=> x[0] + x[1])
  }

  const resize = () =>{
    const { column, row, cellSize } = artData
    const boards = [overlay, artboard]
    boards.forEach(b =>{
      resizeCanvas({
        canvas: b,
        w: column * cellSize,
        h: row * cellSize
      })
    })
    styleTarget({
      target: canvasWrapper,
      w: column * cellSize,
      h: row * cellSize
    })
    if (artData.grid) grid.draw()
    generateMap()
  }


  const decompress = value =>{
    const output = []
    value.split(',').forEach(x=>{
      const letter = x.split('').filter(y=>y * 0 !== 0).join('')
      const repeat = x.split('').filter(y=>y * 0 === 0).join('')
      for (let i = 0; i < repeat; i++){
        output.push(letter)
      }
    })
    return output
  }

  const styleTarget = ({ target, w, h, x, y }) =>{
    const t = target.style
    if (isNum(w)) t.width = `${w}px`
    if (isNum(w) && !isNum(h)) t.height = `${w}px`
    if (isNum(h)) t.height = `${h}px`
    if (isNum(x)) t.left = `${x}px`
    if (isNum(y)) t.top = `${y}px`
  }

  const resizeCanvas = ({ canvas, w, h }) =>{
    canvas.setAttribute('width', w)
    canvas.setAttribute('height', h || w)
  }

  
  const placeTile = ({ sprite, tile, mapIndex  }) =>{
    const tileIndex = tiles.indexOf(tile)
    const { cellSize: d, column } = artData
    const mapX = (mapIndex % column) * d
    const mapY = Math.floor(mapIndex / column) * d
    aCtx.imageSmoothingEnabled = false

    if (tile !== 'v') {
      aCtx.fillStyle = plainColors[tile] || '#a2fcf0'
      aCtx.fillRect(mapX, mapY, d, d)
      aCtx.drawImage(sprite, tileX(tileIndex), tileY(tileIndex), 16, 16, mapX, mapY, d, d)
    }
  }

  
  const outputTile = ({ ctx, x, y, tile, sprite }) =>{
    const d = 32
    ctx.imageSmoothingEnabled = false

    if (tile !== 'v') {
      ctx.fillStyle = plainColors[tile] || '#a2fcf0'
      ctx.fillRect(0, 0, d, d)
      ctx.drawImage(sprite, x, y, d / 2, d / 2, 0, 0, d, d)
    }
  }
  

  const populatePalette = () =>{
    palettes[0].innerHTML = tiles.map(t =>`<canvas class="palette_cell" data-tile="${t}"></canvas>`).join('')
    paletteCells = document.querySelectorAll('.palette_cell')
    paletteCells.forEach(canvas => {
      resizeCanvas({ canvas, w:32 })
      const index = tiles.indexOf(canvas.dataset.tile)
      outputTile({
        ctx: canvas.getContext('2d'),
        x: tileX(index), y: tileY(index),
        sprite: spriteSheets[0]
      })
    })

    paletteCells.forEach(palette =>{
      palette.addEventListener('click',(e)=>{
        letterInput.value = e.target.dataset.tile
      })
    })  
  }

  const updateCodesDisplay = (box, arr) =>{
    box.value = `${arr.map(ele => ele).join(',')}`
    window.location.hash = `${columnInputs[0].value}#${rowInputs[0].value}#${compress(codesBox[0].value).join('-')}`
  }

  const continuousDraw = (e, action) =>{
    if (artData.draw) action(e)
  }
  
  const generateMap = () =>{
    codes[0].forEach((code, i) =>{
      placeTile({ sprite: spriteSheets[0], tile: code, mapIndex: i })
    })
  }

  const generateFromCode = () =>{
    codes[0] = codesBox[0].value.split(',')
    resize()
  }

  const copyText = box =>{
    box.select()
    box.setSelectionRange(0, 99999) // For mobile devices 
    document.execCommand('copy')
  }

  const displayLabel = e =>{
    elements.cursor.childNodes[0].innerHTML = e.target.dataset.alt
  }

  const hideLabel = () =>{
    elements.cursor.childNodes[0].innerHTML = ''
  }

  const addLabelDisplay = () =>{
    alts.forEach(button => {
      button.addEventListener('mouseover', displayLabel)
      button.addEventListener('mouseleave', hideLabel)
    })
  }

  const removeLabelDisplay = () =>{
    alts.forEach(button => {
      button.removeEventListener('mouseover', displayLabel)
      button.removeEventListener('mouseleave', hideLabel)
    })
  }
  
  const toggleGrid = () =>{
    grid[!artData.grid ? 'draw' : 'clear']()
    overlay.classList.toggle('hide')
    artData.grid = !artData.grid
  }
  
  const toggleIndex = () =>{
    const mapGenCells = document.querySelectorAll('.map_gen_cell')
    mapGenCells.forEach(grid => grid.classList.toggle('index_display'))
  }

  cellSizeInputs[0].addEventListener('change',()=> {
    artData.cellSize = +cellSizeInputs[0].value
    generateFromCode()
  })

  rowInputs[0].addEventListener('change',()=> {
    const newRow = +rowInputs[0].value
    const diff = Math.abs(newRow - artData.row) 
    codesBox[0].value = newRow > artData.row
      ?  [...codes[0], ...Array(diff * artData.column).fill('transparent')]
      :  codes[0].slice(0, codes[0].length - (diff * artData.column))
      artData.row = newRow
    codes[0] = codesBox[0].value
    generateFromCode()
  })

  columnInputs[0].addEventListener('change',()=> {
    const newColumn = +columnInputs[0].value
    const updatedCodes = [[]]
    let count = 0
    let index = 0
    codes[0].forEach(code =>{
      if (count === +artData.column) {
        count = 0
        index++
        updatedCodes.push([])
      }
      count++
      updatedCodes[index].push(code)
    })

    codesBox[0].value = updatedCodes.map(codes =>{
      const diff = Math.abs(newColumn - artData.column) //TODO adjust arrays
      if (newColumn > artData.column){
        return [...codes, ...Array(diff).fill('transparent')]
      } else {
        return codes.slice(0, codes.length - diff)
      }
    }).join(',')

    artData.column = newColumn
    codes[0] = codesBox[0].value
    generateFromCode()
  })

  const compressCode = () =>{
    codesBox[1].value = compress(codesBox[0].value)
  }


  const handleCursor = e =>{
    elements.cursor.style.top = `${e.pageY}px`
    elements.cursor.style.left = `${e.pageX}px`
  }
  

  
  // reads from url
  const query = window.location.hash
  // console.log(query)
  if (query){
    const queryArray = query.split('#')
    artData.row = queryArray[2]
    artData.column = queryArray[1]
    rowInputs[0].value = artData.row
    columnInputs[0].value = artData.column

    codes[0] = decompress(queryArray[3].replaceAll('-',','))
    codesBox[0].value = codes[0]
    if (queryArray[4]) indexIndicator.value = queryArray[4]
    generateFromCode()
  }

  const downloadImage = (canvas, name, date) =>{
    const link = document.createElement('a')
    link.download = `${name}_${date ? new Date().getTime() : ''}.png`
    link.href = canvas.toDataURL()
    link.click()
  }


  const drawPos = (e, cellD) => {
    const { top, left } = artboard.getBoundingClientRect()
    return {
      x: nearestN(e.pageX - left, cellD),
      y: nearestN(e.pageY - top - window.scrollY, cellD)
    }
  }

  const drawTile = e => {
    const { cellSize: d, column } = artData
    const { x, y } = drawPos(e, d)
    const { value:tile } = letterInput
    const tileIndex = tiles.indexOf(tile)
    const mapIndex = ((y / d - 1) * column) + x / d - 1

    if (!artData.erase && tileIndex) {
      placeTile({ sprite: spriteSheets[0], tile, mapIndex })
      codes[0][mapIndex] = tile
      updateCodesDisplay(codesBox[0], codes[0]) 
    }
  }



  // eventlisteners
  mapLinks.innerHTML = mapKeys.map( map =>{
    return `
      <div class="map_link_cell">
        ${map}
      </div>
    `
  }).join('')
  const mapLinkCells = document.querySelectorAll('.map_link_cell')

  mapLinkCells.forEach((link, i)=>{
    link.addEventListener('click',()=>{
      const { iWidth, iHeight, map } = mapData[mapKeys[i]]
      const url = `${iWidth}#${iHeight}#${map.replaceAll(',','-')}#${i}`
      window.location.hash = url      
      location.reload(true)
    })
  })

  

  copyButtons.forEach((copyButton, i) =>{
    copyButton.addEventListener('click',()=>copyText(codesBox[i]))
  })
  
  indexToggleButton.addEventListener('click', toggleIndex)
  codesBox[0].addEventListener('change', compressCode)
  codesBox[1].addEventListener('change',()=>{   
    codesBox[0].value = decompress(codesBox[1].value)
  })

  buttons.forEach(b =>{
    const addClickEvent = (className, event) =>{
      if (b.classList.contains(className)) b.addEventListener('click', event)
    }
    addClickEvent('generate', generateFromCode)
    addClickEvent('grid_display', toggleGrid)
    addClickEvent('compress', compressCode)
    addClickEvent('download', ()=> downloadImage(artboard, 'map', true))
    addClickEvent('display_index', ()=> artData.number = !artData.number)
  })
  mouse.down(artboard, 'add', ()=> artData.draw = true)
  mouse.up(artboard, 'add', ()=> artData.draw = false)
  mouse.move(artboard, 'add', e => continuousDraw(e, drawTile))
  mouse.leave(artboard, 'add', ()=> {
    artData.draw = false
    artData.cursor = null
  })
  mouse.enter(artboard, 'add', ()=> artData.cursor = 'artboard')
  artboard.addEventListener('click', drawTile)
  artboard.addEventListener('mousedown',()=> artData.draw = true)
  artboard.addEventListener('mouseup',()=> artData.draw = false)
  artboard.addEventListener('mouseleave',()=> artData.draw = false)

  populatePalette()
  window.addEventListener('mousemove', handleCursor)
  resize()

  removeLabelDisplay()
  alts = document.querySelectorAll('.alt')
  addLabelDisplay()
  
  window.addEventListener('mousemove', e =>{
    const { cellSize, gridWidth, column } = artData
    const { left, top } = artboard.getBoundingClientRect()
    const isArtboard = artData.cursor === 'artboard' 
    const pos = isArtboard
      ? { 
          x: drawPos(e, cellSize).x - cellSize + left, 
          y: drawPos(e, cellSize).y - cellSize + top 
        }
      : { x: e.pageX, y: e.pageY }
    elements.cursor.classList[isArtboard ? 'add' : 'remove']('highlight')
    if (isArtboard) {
      const { x, y } = drawPos(e, cellSize)
      const mapIndex = ((y / cellSize - 1) * column) + x / cellSize - 1
      elements.cursor.setAttribute('code', artData.number ? mapIndex : codes[0][mapIndex])
    }
    styleTarget({
      target: elements.cursor,
      x: pos.x + (2 * gridWidth),
      y: pos.y + (2 * gridWidth) + window.scrollY,
      w: cellSize - gridWidth,
      h: cellSize - gridWidth,
    })
  })

}

window.addEventListener('DOMContentLoaded', init)
