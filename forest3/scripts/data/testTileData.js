
// const createMapCodes = length => {
//   return new Array(length).fill('').map((_n, i) => {
//     let letters = ''
//     while (i >= 0) {
//       letters = 'abcdefghijklmnopqrstuvwxyz'[i % 26] + letters
//       i = Math.floor(i / 26) - 1
//     }
//     return letters
//   })
// }


// const tiles = createMapCodes(10 * 7)
// const plainColors = {
//   za: '#fff',
//   zb: '#58d3d8',
//   zc: '#0d8799',
//   zd: '#a2fcf0',
//   zd: '#d7fbfa',
// }
// const animationTiles = {
//   ap: ['ap', 'ap', 'ap', 'ar', 'ar', 'ar'],
//   // zb: ['zb', 'ap', 'ar', 'zb', 'ap', 'ar'],
//   i: ['i', 'i', 'k', 'k', 'm', 'm'],
//   j: ['j', 'j', 'l', 'l', 'n', 'n'],
//   at: ['at', 'at', 'at', 'au', 'au', 'au']
// }
// const blank = 'zz'

const editConfig = {
  a: 90,
  b: 180,
  c: 270,  
}

const tiles = {
  a: {
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEFJREFUOE9jZEACoVeu/AdxmRhYkYXxshlhsiDNpGiE6QMbQK5mkF5GSjRTx4DwKzfBAUcuYBw1gGE0DBgGQRgAAFrpMEH7yl7MAAAAAElFTkSuQmCC',
    // color: '#fff'
  },
  b: {
    color: '#58d',
  },
  c: {
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAEJJREFUOE9j/P///38GCgAjLgNKU6NRjO2evRSrNRgGoGtE14VuENwAQhpxGUQdA0i1HeYakHfALhg1YDQMBjwdAAC5Y2zRFw3VTAAAAABJRU5ErkJggg=='
  }
}

export {
  tiles,
  editConfig
  // plainColors,
  // animationTiles,
  // blank,
}