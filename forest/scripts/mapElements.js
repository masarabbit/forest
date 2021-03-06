const input = {
  column: document.querySelector('.column'),
  row: document.querySelector('.row'),
  cellD: document.querySelector('.cell_size'),
  letter: document.querySelector('.letter'),
  codesBox: document.querySelectorAll('.codes'),
  indexIndicator: document.querySelector('.index_indicator')
}

const artboard = document.querySelector('.artboard')
const overlay = document.querySelector('.overlay')
const aCtx = artboard.getContext('2d')
const oCtx = overlay.getContext('2d')

const elements = {
  cursor: document.querySelector('.cursor'),
  spriteSheets: document.querySelectorAll('.sprite_sheet'),
  palette: document.querySelector('.palette'),
  alts: document.querySelectorAll('.alt'),
  copyButtons: document.querySelectorAll('.copy'),
  indexToggleButton: document.querySelector('.display_index'),
  buttons: document.querySelectorAll('.btn'),
  mapLinks: document.querySelector('.map_link'),
  canvasWrapper: document.querySelector('.canvas_wrapper'),
  selectBox: null,
  paletteCells: null,
}

export {
  input,
  artboard,
  overlay,
  aCtx,
  oCtx,
  elements
}