const mapData = {
  w: 30,
  h: 20,
  cellD: 20,
  grid: document.querySelector('.grid'),
  output: document.querySelector('.codes'),
  codes: [],
  // cells: null,
  lake: {
    w: {
      min: 4,
      max: 10
    },
    h: {
      min: 3,
      max: 7
    } 
  },
  start: 31,
  goal: 0,
  carryOn: true,
  delay: 10,
  displayTimer: null,
  searchMemory: null,
}

export default mapData