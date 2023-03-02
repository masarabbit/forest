
const createMapCodes = length => {
  return new Array(length).fill('').map((_n, i) => {
    let letters = ''
    while (i >= 0) {
      letters = 'abcdefghijklmnopqrstuvwxyz'[i % 26] + letters
      i = Math.floor(i / 26) - 1
    }
    return letters
  })
}


const tiles = createMapCodes(10 * 7)
const plainColors = {
  za: '#fff',
  zb: '#58d3d8',
  zc: '#0d8799',
  zd: '#a2fcf0',
  zd: '#d7fbfa',
}
const animationTiles = {
  ap: ['ap', 'ap', 'ap', 'ar', 'ar', 'ar'],
  // zb: ['zb', 'ap', 'ar', 'zb', 'ap', 'ar'],
  i: ['i', 'i', 'k', 'k', 'm', 'm'],
  j: ['j', 'j', 'l', 'l', 'n', 'n'],
  at: ['at', 'at', 'at', 'au', 'au', 'au']
}
const blank = 'zz'

export {
  tiles,
  plainColors,
  animationTiles,
  blank,
}