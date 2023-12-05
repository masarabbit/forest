import { tiles, tilesList, tileSheetData, tileX, tileY } from '../../scripts/data/tileData.js'
import { artData } from './mapState.js'
import { drawPos, grid, resize, drawDataUrl } from './artUtils/draw.js'
import { createSelectBox, copySelection, paste, select  } from './artUtils/select.js'

import { compress, decompress } from '../../scripts/utils/compression.js'

import {
  input,
  artboard,
  overlay,
  elements,
  aCtx,
  tilesData
} from './mapElements.js'

import {
  mouse,
  styleTarget,
  resizeCanvas,
  update,
} from './artUtils/mapUtils.js'

import { mapData } from '../../scripts/data/mapData.js'

function init() {

  const createSpriteSheet = () => {
    resizeCanvas({
      canvas: elements.spriteSheet,
      w: tileSheetData.d * tileSheetData.column, 
      h: tileSheetData.d * tileSheetData.row
    })
    const triggerLast = {
      count: 0,
      limit: tilesList.length - 1,
      action: ()=> {
        populatePalette()
        switchPalette()
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
        ctx: elements.sCtx,
        gridData: tileSheetData,
        triggerLast
      })  
    })
  }



  const mapKeys = Object.keys(mapData)

  const updateCodesDisplay = (box, arr) =>{
    box.value = `${arr.map(ele => ele).join(',')}`
    window.location.hash = `${input.column.value}#${input.row.value}#${input.d.value}#${compress(input.codesBox[0].value).join('-')}`
  }

  const generateFromCode = () =>{
    artData.tiles = input.codesBox[0].value.split(',')
    artData.walls = input.codesBox[2].value.split(',')
    resize()
  }

  const continuousDraw = (e, action) =>{
    if (artData.draw) action(e)
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

  const compressCode = i =>{
    input.codesBox[i + 1].value = compress(input.codesBox[i].value)
  }

  const handleCursor = e =>{
    elements.cursor.style.top = `${e.pageY}px`
    elements.cursor.style.left = `${e.pageX}px`
  }


  
  const populateCompactPalette = () =>{
    const tilesList = Object.keys(tiles)
    elements.palette.innerHTML = tilesList.map(t =>`<canvas class="palette_cell tile" data-tile="${t}"></canvas>`).join('')
    elements.paletteCells = document.querySelectorAll('.palette_cell')

    tilesList.forEach((tile, i) => {
      resizeCanvas({ 
        canvas: elements.paletteCells[i],
        w: 32 
      })
      drawDataUrl({
        url: tiles[tile]?.img,
        color: tiles[tile]?.color,
        index: 0,
        ctx: elements.paletteCells[i].getContext('2d'),
        overrideD: 32
      })
    })

    elements.paletteCells.forEach(palette =>{
      palette.addEventListener('click', e =>{
        input.letter.value = e.target.dataset.tile
        input.editKey.value = ''
        outputTile()
      })
    })  
  }


  const populatePalette = () =>{
    elements.palette.innerHTML = tilesList.map(t =>`<canvas class="palette_cell tile" data-tile="${t.join('*')}"></canvas>`).join('')
    elements.paletteCells = document.querySelectorAll('.palette_cell')

    elements.paletteCells.forEach((canvas, i) => {
      resizeCanvas({ canvas, w: 32 })
      const ctx = canvas.getContext('2d')
      const index = tilesList.map(t => t.join('*')).indexOf(canvas.dataset.tile)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(elements.spriteSheet, tileX(index), tileY(index), 16, 16, 0, 0, 32, 32)
    })

    elements.paletteCells.forEach((palette, i) =>{
      palette.addEventListener('click', ()=>{
        const letters = tilesList[i][0].split('.')
        input.letter.value = letters[0]
        input.editKey.value = letters[1] || ''
        outputTile()
      })
    })  
  }


  // reads from url
  const query = window.location.hash
  // console.log(query)
  if (query){
    const queryArray = query.split('#')
    artData.column = +queryArray[1]
    artData.row = +queryArray[2]
    artData.d = +queryArray[3]
    input.row.value = artData.row
    input.column.value = artData.column
    input.d.value = artData.d

    artData.tiles = decompress(queryArray[4].replaceAll('-',','))
    input.codesBox[0].value = artData.tiles
    if (queryArray[5]) input.indexIndicator.value = queryArray[5]
    if (queryArray[6]) input.codesBox[2].value = decompress(mapData[queryArray[6]].walls)

    generateFromCode()
  }


  const downloadImage = (canvas, name, date) =>{
    const link = document.createElement('a')
    link.download = `${name}_${date ? new Date().getTime() : ''}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const drawTile = e => {
    const { d, column } = artData
    const { x, y } = drawPos(e, d)
    const { value: key } = input.letter

    const mapIndex = ((y / d - 1) * column) + x / d - 1

    if (!artData.erase
      // && (tileIndex !== -1 || tile === blank || plainColors[tile])
      ) {
        const { value: edit } = input.editKey  
        
        if (!artData.showWalls) {
          drawDataUrl({
            url: tiles[key]?.img,
            color: tiles[key]?.color,
            index: mapIndex,
            edit,
            ctx: aCtx
          })  
    
          artData.tiles[mapIndex] = `${key}${edit ? `.${edit}` : ''}`
          updateCodesDisplay(input.codesBox[0], artData.tiles) 
      } else {
        const color = key === 'zz' ? null : tiles['$'].color
        drawDataUrl({
          color,
          index: mapIndex,
          ctx: elements.wCtx
        })  
      }
  
    }
  }

  const outputTile = () => {
    resizeCanvas({
      canvas: elements.output,
      w: 32
    })
  
    drawDataUrl({
      url: tiles[input.letter.value]?.img,
      color: tiles[input.letter.value]?.color,
      index: 0,
      edit: input.editKey.value,
      ctx: elements.output.getContext('2d'),
      overrideD: 32
    })  
  }

  removeLabelDisplay()
  elements.alts = document.querySelectorAll('.alt')
  addLabelDisplay()
  outputTile()
  resize()
  createSpriteSheet()


  
  // ********************
  // ** eventlisteners **
  // ********************

  window.addEventListener('mousemove', handleCursor)

  elements.mapLinks.innerHTML = mapKeys.map( map =>{
    return `
      <div class="map_link_cell">
        ${map}
      </div>
    `
  }).join('')
  const mapLinkCells = document.querySelectorAll('.map_link_cell')

  overlay.addEventListener('click', e => createSelectBox(e))

  mapLinkCells.forEach((link, i)=>{
    link.addEventListener('click',()=>{
      const { column, row, map } = mapData[mapKeys[i]]
      const url = `${column}#${row}#${artData.d}#${map.replaceAll(',','-')}#${i}#${mapKeys[i]}`
      window.location.hash = url      
      location.reload(true)
    })
  })

  elements.copyButtons.forEach((copyButton, i) =>{
    copyButton.addEventListener('click', ()=>copyText(input.codesBox[i]))
  })

  elements.compressButtons.forEach((compressButton, i) =>{
    compressButton.addEventListener('click', ()=> compressCode(i === 0 ? 0 : 2))
  })

  input.d.addEventListener('change',()=> {
    artData.d = +input.d.value
    generateFromCode()
  })


  input.row.addEventListener('change',()=> {
    const newRow = +input.row.value
    const diff = Math.abs(newRow - artData.row)  
    tilesData.forEach(data => {
      data.input.value = newRow > artData.row
      ?  [...artData[data.tiles], ...Array(diff * artData.column).fill(data.blank)]
      :  artData[data.tiles].slice(0, artData[data.tiles].length - (diff * artData.column))
      artData[data.tiles] = data.input.value 
    })
    artData.row = newRow
    generateFromCode()
  })

  input.column.addEventListener('change', ()=> {
    const newColumn = +input.column.value
    tilesData.forEach(data => {
      const updatedCodes = [[]]
      let count = 0
      let index = 0
      artData[data.tiles].forEach(code =>{
        if (count === +artData.column) {
          count = 0
          index++
          updatedCodes.push([])
        }
        count++
        updatedCodes[index].push(code)
      })
  
      data.input.value = updatedCodes.map(codes =>{
        const diff = Math.abs(newColumn - artData.column)
        if (newColumn > artData.column){
          return [...codes, ...Array(diff).fill(data.blank)]
        } else {
          return codes.slice(0, codes.length - diff)
        }
      }).join(',')
  
      artData[data.tiles] = data.input.value
    })

    artData.column = newColumn
    generateFromCode()
  })

  elements.indexToggleButton.addEventListener('click', toggleIndex)

  input.codesBox[0].addEventListener('change', ()=> compressCode(0))
  input.codesBox[1].addEventListener('change',()=>{   
    input.codesBox[0].value = decompress(input.codesBox[1].value)
  })

  input.codesBox[2].addEventListener('change', ()=> compressCode(2))
  input.codesBox[3].addEventListener('change', ()=>{   
    input.codesBox[2].value = decompress(input.codesBox[3].value)
  })

  ;[input.letter, input.editKey].forEach(input => {
    input.addEventListener('change', outputTile)
  })

  const addEditCode = code => {
    input.editKey.value = input.editKey.value.includes(code) 
      ? input.editKey.value.split('').filter(value => value !== code).join('')
      : input.editKey.value + code
    input.editKey.value = input.editKey.value.split('').sort().join('')
  }

  const makeMapIntoBg = () => {
    artboard.parentNode.style.background = `url(${artboard.toDataURL()})`
    artboard.classList.add('bg_mode')
    const { d, column, row } = artData
    aCtx.clearRect(0, 0, column * d, row * d)

    artData.tiles = Array(column * row).fill('')
    input.codesBox[0].value = artData.tiles
  }

  const switchPalette = () => {
    artData.showFullPalette = !artData.showFullPalette
    artData.showFullPalette
      ? populatePalette()
      : populateCompactPalette()
  }

  const rotateTile = () => {
    if (['a', 'b', 'c'].some(code => input.editKey.value.includes(code))) {
      if (input.editKey.value.includes('a')) {
        addEditCode('a')
        addEditCode('b')
      } else if (input.editKey.value.includes('b')) {
        addEditCode('b')
        addEditCode('c')
      } else {
        addEditCode('c')
      }
    } else {
      addEditCode('a')
    }
    outputTile()
  }

  elements.buttons.forEach(b =>{
    const addClickEvent = (className, event) =>{
      if (b.classList.contains(className)) b.addEventListener('click', event)
    }
    addClickEvent('generate', generateFromCode)
    addClickEvent('grid_display', toggleGrid)
    addClickEvent('download', ()=> downloadImage(artboard, 'map', true))
    addClickEvent('display_index', ()=> artData.number = !artData.number)
    addClickEvent('select_state', select)
    addClickEvent('copy_selection', copySelection)
    addClickEvent('paste_selection', ()=> {
      tilesData.forEach(data => {
        paste({ data })
      })
    })
    addClickEvent('cut_selection', ()=> copySelection({ cut: true }))
    addClickEvent('crop_selection', ()=> copySelection({ crop: true }))
    addClickEvent('eraser', ()=> update('letter', input.letter.value === 'zz' ? '' : 'zz'))
    addClickEvent('flip_h', ()=> {
      addEditCode('h')
      outputTile()
    })
    addClickEvent('flip_v', ()=> {
      addEditCode('v')
      outputTile()
    })
    addClickEvent('rotate', rotateTile)
    addClickEvent('make_map_into_bg', makeMapIntoBg)
    addClickEvent('switch_palette', switchPalette)
    addClickEvent('toggle_walls', ()=> {
      elements.wallBoard.classList.toggle('hide')
      artData.showWalls = !artData.showWalls
    })
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

  window.addEventListener('mousemove', e =>{
    const { d, gridWidth, column } = artData
    const { left, top } = artboard.getBoundingClientRect()
    const isArtboard = artData.cursor === 'artboard' 
    const pos = isArtboard
      ? { 
        x: drawPos(e, d).x - d + left, 
        y: drawPos(e, d).y - d + top 
      }
      : { x: e.pageX, y: e.pageY }
    elements.cursor.classList[isArtboard ? 'add' : 'remove']('highlight')
    if (isArtboard) {
      const { x, y } = drawPos(e, d)
      const mapIndex = ((y / d - 1) * column) + x / d - 1
      elements.cursor.setAttribute('code', artData.number ? mapIndex : artData.tiles[mapIndex])
    }
    styleTarget({
      target: elements.cursor,
      x: pos.x + (2 * gridWidth) + (isArtboard ? window.scrollX : 0),
      y: pos.y + (2 * gridWidth) + (isArtboard ? window.scrollY : 0),
      w: d - gridWidth,
      h: d - gridWidth,
    })
  })


}

window.addEventListener('DOMContentLoaded', init)
