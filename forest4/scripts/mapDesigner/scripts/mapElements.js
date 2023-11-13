const input = {
  column: document.querySelector('.column'),
  row: document.querySelector('.row'),
  d: document.querySelector('.cell_size'),
  letter: document.querySelector('.letter'),
  editKey: document.querySelector('.edit_key'),
  codesBox: document.querySelectorAll('.codes'),
  indexIndicator: document.querySelector('.index_indicator')
}

const artboard = document.querySelector('.artboard')
const overlay = document.querySelector('.overlay')
const aCtx = artboard.getContext('2d')
const oCtx = overlay.getContext('2d')

// not used for mapDesigner3
const drawboard = document.querySelector('.drawboard')
const dCtx = drawboard?.getContext('2d')


const elements = {
  cursor: document.querySelector('.cursor'),
  // spriteSheets: document.querySelectorAll('.sprite_sheet'),
  palette: document.querySelector('.palette'),
  alts: document.querySelectorAll('.alt'),
  copyButtons: document.querySelectorAll('.copy'),
  compressButtons: document.querySelectorAll('.compress'),
  indexToggleButton: document.querySelector('.display_index'),
  buttons: document.querySelectorAll('.btn'),
  mapLinks: document.querySelector('.map_link'),
  canvasWrapper: document.querySelector('.canvas_wrapper'),
  selectBox: null,
  paletteCells: null,
  output: document.querySelector('.output'),
  spriteSheet: document.querySelector('.sprite_sheet'),
  sCtx: null,
  wallBoard: document.querySelector('.wallboard'),
  wCtx: null,
}

elements.sCtx = elements.spriteSheet?.getContext('2d')
elements.wCtx = elements.wallBoard?.getContext('2d')

const tilesData = [
  {
    input: input.codesBox[0],
    tiles: 'tiles',
    blank: 'zz',
    ctx: aCtx,
  },
  {
    input: input.codesBox[2],
    tiles: 'walls',
    blank: '',
    ctx: elements.wCtx,
  }
]

export {
  input,
  artboard,
  overlay,
  aCtx,
  oCtx,
  elements,
  drawboard,
  dCtx,
  tilesData
}