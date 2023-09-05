import { tiles, tileTypes } from './data/tileData.js'
import { artData } from './mapState.js'
import { drawPos, grid, resize, drawDataUrl } from './artUtils/draw.js'
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
  styleTarget,
  resizeCanvas,
  update,
} from './artUtils/mapUtils.js'

import mapData from './data/mapData.js'

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
      const letter = x.split('').filter(y => y * 0 !== 0).join('')
      const repeat = x.split('').filter(y => y * 0 === 0).join('') || 1

      for (let i = 0; i < repeat; i++){
        output.push(letter)
      }
    })
    return output
  }

  const updateCodesDisplay = (box, arr) =>{
    box.value = `${arr.map(ele => ele).join(',')}`
    window.location.hash = `${input.column.value}#${input.row.value}#${input.cellD.value}#${compress(input.codesBox[0].value).join('-')}`
  }

  const generateFromCode = () =>{
    artData.tiles = input.codesBox[0].value.split(',')
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

  const compressCode = () =>{
    input.codesBox[1].value = compress(input.codesBox[0].value)
  }

  const handleCursor = e =>{
    elements.cursor.style.top = `${e.pageY}px`
    elements.cursor.style.left = `${e.pageX}px`
  }

  const populatePalette = () =>{
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


  // reads from url
  const query = window.location.hash
  // console.log(query)
  if (query){
    const queryArray = query.split('#')
    artData.column = +queryArray[1]
    artData.row = +queryArray[2]
    artData.cellD = +queryArray[3]
    input.row.value = artData.row
    input.column.value = artData.column
    input.cellD.value = artData.cellD

    artData.tiles = decompress(queryArray[4].replaceAll('-',','))
    input.codesBox[0].value = artData.tiles
    if (queryArray[5]) input.indexIndicator.value = queryArray[5]
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
    const { value: key } = input.letter
    const { value: edit } = input.editKey
    const mapIndex = ((y / d - 1) * column) + x / d - 1

    if (!artData.erase 
      // && (tileIndex !== -1 || tile === blank || plainColors[tile])
      ) {

      drawDataUrl({
        url: tiles[key]?.img,
        color: tiles[key]?.color,
        index: mapIndex,
        edit,
        ctx: aCtx
      })  

      artData.tiles[mapIndex] = `${key}${edit ? `.${edit}` : ''}`
      updateCodesDisplay(input.codesBox[0], artData.tiles) 
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
  populatePalette()

  // const flattenedTilesList = Object.keys(tiles).map(tile => {
  //   return tiles[tile]?.frames ? tiles[tile].frames.map((_, i) => `${tile}*${i}`) : `${tile}*${0}`
  // }).flat(1).map(unsplit => unsplit.split('*'))

  // const tilesList = flattenedTilesList.map(tile => {

  //   return tileTypes[tiles[tile[0]].type].map(append => {
  //     return [`${tile[0]}${append ? `.${append}` : ''}`, tile[1]]
  //   })
  // }).flat(1)


  const tilesList = Object.keys(tiles).map(tile => {
    return {
      tile,
      frames: tiles[tile]?.frames ? tiles[tile].frames.map((_, i) => i) : [0]
    }
  }).map(tileData => {
    return tileTypes[tiles[tileData.tile].type].map(append => {
      return tileData.frames.map(frameIndex => {
        return [`${tileData.tile}${append ? `.${append}` : ''}`, frameIndex]
      })
    }).flat(1)
  }).flat(1)

  console.log('test 1', tilesList)


  // TODO change this to not use artData but something like spriteData

  artData.column = 40
  artData.row = Math.round(tilesList.length / artData.column)
  artData.cellD = 32

  resizeCanvas({
    canvas: elements.spriteSheet,
    w: artData.cellD * artData.column, h: artData.cellD * artData.row
  })
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
      // overrideD: 32
    })  
  })

  // artData.column = input.column.value
  // artData.row = input.row.value
  // artData.cellD = input.cellD.value

  // TODO once this sprite sheet is made, then forest3 can be partly reverted to use the old sprite sheet logic
  
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
      const { iWidth, iHeight, map } = mapData[mapKeys[i]]
      const url = `${iWidth}#${iHeight}#${artData.cellD}#${map.replaceAll(',','-')}#${i}`
      window.location.hash = url      
      location.reload(true)
    })
  })

  elements.copyButtons.forEach((copyButton, i) =>{
    copyButton.addEventListener('click',()=>copyText(input.codesBox[i]))
  })

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

  elements.indexToggleButton.addEventListener('click', toggleIndex)
  input.codesBox[0].addEventListener('change', compressCode)
  input.codesBox[1].addEventListener('change',()=>{   
    input.codesBox[0].value = decompress(input.codesBox[1].value)
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
    addClickEvent('eraser', ()=> update('letter', 'zz'))
    addClickEvent('flip_h', ()=> {
      addEditCode('h')
      outputTile()
    })
    addClickEvent('flip_v', ()=> {
      addEditCode('v')
      outputTile()
    })
    addClickEvent('rotate', ()=> {
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
    })
    addClickEvent('make_map_into_bg', ()=> {
      console.log('click',  artboard.toDataURL())
      artboard.parentNode.style.background = `url(${artboard.toDataURL()})`
      artboard.classList.add('bg_mode')
      const { cellD, column, row } = artData
      aCtx.clearRect(0, 0, column * cellD, row * cellD)

      artData.tiles = Array(column * row).fill('')
      input.codesBox[0].value = artData.tiles
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
