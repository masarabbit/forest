
const artData = {
  cursor: 'pen_cursor',
  draw: false,
  grid: true,
  gridWidth: 0.5,
  cellD: 32,
  row: 5,
  column: 5,
  gridColor: 'lightgrey',
  erase: false,
  tiles: [],
}

const copyData = {
  defPos: { 
    x: 0, y: 0,
  },
  xy: { 
    x: 0, y: 0,
  },
  size: {
    w: 0, h: 0,
  },
  ctx: null,
  move: false,
  crop: false,
  tiles: [],
  index: [],
}

export {
  artData,
  copyData,
}