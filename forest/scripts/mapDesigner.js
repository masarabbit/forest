import mapData from './data/mapData.js'
import { tiles, plainColors } from './data/tileData.js'
import { artData } from './mapState.js'
import { drawPos, grid, placeTile, resize } from './artUtils/draw.js'
import { createSelectBox, copySelection, paste, select  } from './artUtils/select.js'

import {
  input,
  artboard,
  overlay,
  elements,
  aCtx
} from './mapElements.js'

import {
  mouse,
  tileX,
  tileY,
  styleTarget,
  resizeCanvas,
  update,
} from './artUtils/mapUtils.js'



function init() {

  const mapKeys = Object.keys(mapData)

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
    elements.palette.innerHTML = tiles.map(t =>`<canvas class="palette_cell tile" data-tile="${t}"></canvas>`).join('') + Object.keys(plainColors).map(k =>`<div class="palette_cell" style="background-color: ${plainColors[k]}; width: 32px; height: 32px;" data-tile="${k}"></div>`).join('')
    elements.paletteCells = document.querySelectorAll('.palette_cell')

    elements.paletteCells.forEach((canvas, i) => {
      if (i < tiles.length) {
        resizeCanvas({ canvas, w: 32 })
        const index = tiles.indexOf(canvas.dataset.tile)
        outputTile({
          ctx: canvas.getContext('2d'),
          x: tileX(index), y: tileY(index),
          sprite: elements.spriteSheets[0]
        })
      }
    })

    elements.paletteCells.forEach(palette =>{
      palette.addEventListener('click',(e)=>{
        input.letter.value = e.target.dataset.tile
      })
    })  
  }

  const updateCodesDisplay = (box, arr) =>{
    box.value = `${arr.map(ele => ele).join(',')}`
    window.location.hash = `${input.column.value}#${input.row.value}#${compress(input.codesBox[0].value).join('-')}`
  }

  const continuousDraw = (e, action) =>{
    if (artData.draw) action(e)
  }
  

  const generateFromCode = () =>{
    artData.tiles = input.codesBox[0].value.split(',')
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
    elements.alts.forEach(button => {
      button.addEventListener('mouseover', displayLabel)
      button.addEventListener('mouseleave', hideLabel)
    })
  }

  const removeLabelDisplay = () =>{
    elements.alts.forEach(button => {
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

  input.cellD.addEventListener('change',()=> {
    artData.cellD = +input.cellD.value
    generateFromCode()
  })

  input.row.addEventListener('change',()=> {
    const newRow = +input.row.value
    const diff = Math.abs(newRow - artData.row) 
    input.codesBox[0].value = newRow > artData.row
      ?  [...artData.tiles, ...Array(diff * artData.column).fill('transparent')]
      :  artData.tiles.slice(0, artData.tiles.length - (diff * artData.column))
    artData.row = newRow
    artData.tiles = input.codesBox[0].value
    generateFromCode()
  })

  input.column.addEventListener('change',()=> {
    const newColumn = +input.column.value
    const updatedCodes = [[]]
    let count = 0
    let index = 0
    artData.tiles.forEach(code =>{
      if (count === +artData.column) {
        count = 0
        index++
        updatedCodes.push([])
      }
      count++
      updatedCodes[index].push(code)
    })

    input.codesBox[0].value = updatedCodes.map(codes =>{
      const diff = Math.abs(newColumn - artData.column) //TODO adjust arrays
      if (newColumn > artData.column){
        return [...codes, ...Array(diff).fill('transparent')]
      } else {
        return codes.slice(0, codes.length - diff)
      }
    }).join(',')

    artData.column = newColumn
    artData.tiles = input.codesBox[0].value
    generateFromCode()
  })

  const compressCode = () =>{
    input.codesBox[1].value = compress(input.codesBox[0].value)
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
    input.row.value = artData.row
    input.column.value = artData.column

    artData.tiles = decompress(queryArray[3].replaceAll('-',','))
    input.codesBox[0].value = artData.tiles
    if (queryArray[4]) input.indexIndicator.value = queryArray[4]
    generateFromCode()
  }

  const downloadImage = (canvas, name, date) =>{
    const link = document.createElement('a')
    link.download = `${name}_${date ? new Date().getTime() : ''}.png`
    link.href = canvas.toDataURL()
    link.click()
  }


  const drawTile = e => {
    const { cellD: d, column } = artData
    const { x, y } = drawPos(e, d)
    const { value: tile } = input.letter
    const tileIndex = tiles.indexOf(tile)
    const mapIndex = ((y / d - 1) * column) + x / d - 1

    if (!artData.erase && (tileIndex !== -1 || tile === 'v' || plainColors[tile])) {
      placeTile({ sprite: elements.spriteSheets[0], tile, mapIndex })
      artData.tiles[mapIndex] = tile
      updateCodesDisplay(input.codesBox[0], artData.tiles) 
    }
  }



  // eventlisteners
  elements.mapLinks.innerHTML = mapKeys.map( map =>{
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

  overlay.addEventListener('click', e => createSelectBox(e))

  elements.copyButtons.forEach((copyButton, i) =>{
    copyButton.addEventListener('click',()=>copyText(input.codesBox[i]))
  })
  
  elements.indexToggleButton.addEventListener('click', toggleIndex)
  input.codesBox[0].addEventListener('change', compressCode)
  input.codesBox[1].addEventListener('change',()=>{   
    input.codesBox[0].value = decompress(input.codesBox[1].value)
  })

  elements.buttons.forEach(b =>{
    const addClickEvent = (className, event) =>{
      if (b.classList.contains(className)) b.addEventListener('click', event)
    }
    addClickEvent('generate', generateFromCode)
    addClickEvent('grid_display', toggleGrid)
    addClickEvent('compress', compressCode)
    addClickEvent('download', ()=> downloadImage(artboard, 'map', true))
    addClickEvent('display_index', ()=> artData.number = !artData.number)
    addClickEvent('select_state', select)
    addClickEvent('copy_selection', copySelection)
    addClickEvent('paste_selection', paste)
    addClickEvent('cut_selection', ()=> copySelection({ cut: true }))
    addClickEvent('crop_selection', ()=> copySelection({ crop: true }))
    addClickEvent('eraser', ()=> update('letter','v'))
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
  elements.alts = document.querySelectorAll('.alt')
  addLabelDisplay()
  
  window.addEventListener('mousemove', e =>{
    const { cellD, gridWidth, column } = artData
    const { left, top } = artboard.getBoundingClientRect()
    const isArtboard = artData.cursor === 'artboard' 
    const pos = isArtboard
      ? { 
        x: drawPos(e, cellD).x - cellD + left, 
        y: drawPos(e, cellD).y - cellD + top 
      }
      : { x: e.pageX, y: e.pageY }
    elements.cursor.classList[isArtboard ? 'add' : 'remove']('highlight')
    if (isArtboard) {
      const { x, y } = drawPos(e, cellD)
      const mapIndex = ((y / cellD - 1) * column) + x / cellD - 1
      elements.cursor.setAttribute('code', artData.number ? mapIndex : artData.tiles[mapIndex])
    }
    styleTarget({
      target: elements.cursor,
      x: pos.x + (2 * gridWidth) + (isArtboard ? window.scrollX : 0),
      y: pos.y + (2 * gridWidth) + (isArtboard ? window.scrollY : 0),
      w: cellD - gridWidth,
      h: cellD - gridWidth,
    })
  })

}

window.addEventListener('DOMContentLoaded', init)
