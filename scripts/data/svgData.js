// const sub = '#f9ede5'
import { svg } from '../data/svg.js'


const sub = '#58d3d8'
const main = '#74645a'

const svgData = {
  'ta': { svg: svg.treeOne },
  'tb': { svg: svg.treeTwo },
  'tc': { svg: svg.treeThree },
  'td': { svg: svg.treeFour },
  't': { svg: svg.tree, color: '#0d8799' }, //x
  'w': { svg: svg.tree, color: '#0d8799' }, //x
  'o': { svg: svg.flowers },
  'd': { svg: svg.buildingCorner, color: main, subColor: sub },
  's': { svg: svg.buildingCorner, color: main, subColor: sub, rotate: 90 },
  'bt': { svg: svg.buildingCorner, color: main },
  'br': { svg: svg.buildingCorner, color: main, rotate: 90 },
  'bb': { svg: svg.buildingCorner, color: main, rotate: 180 },
  'bl': { svg: svg.buildingCorner, color: main, rotate: 270 },
  'bx': { svg: svg.roofTopBottomCorner, color: main, subColor: '#0d8799' },
  'by': { svg: svg.roofTopBottomCorner, color: main, subColor: '#0d8799', flip: 'h' },
  'rr': { svg: svg.roofTopBottomCorner, color: main, subColor: sub },
  'rl': { svg: svg.roofTopBottomCorner, color: main, subColor: sub, flip: 'h' },
  'rt': { svg: svg.roofTopBottomCorner, rotate: 180, color: main, },
  'ry': { svg: svg.roofTopBottomCorner, rotate: 180, color: main, flip: 'h' },
  'g': { svg: svg.roofCorner, color: main, subColor: sub },
  'y': { svg: svg.roofCorner, color: main, subColor: sub, flip: 'h' },
  'p': { svg: svg.plain },
  'iw': { svg: svg.plain },
  'iw': { svg: svg.brickWall },
  'rp': { svg: svg.plain, subColor: sub },
  'do': { svg: svg.door, color: main },
  'wi': { svg: svg.roundWindow, color: main },
  'sw': { svg: svg.squareWindow, color: main },
  'sl': { svg: svg.sideSquareWindow, color: main },
  'sr': { svg: svg.sideSquareWindow, color: main, flip: 'h' },
  'nw': { svg: svg.noSideWindow, color: main },
  'nr': { svg: svg.noSideWindow, color: main, flip: 'h' },
  'at': { svg: svg.plainEdge, color: main  },
  'ar': { svg: svg.plainEdge, color: main, rotate: 90 },
  'ab': { svg: svg.plainEdge, color: main, rotate: 180 },
  'al': { svg: svg.plainEdge, color: main, rotate: 270 },
  'rc': { svg: svg.roofCurve, color: main, subColor: sub },
  'pt': { svg: svg.plainEdge, color: main, subColor: sub },
  'pr': { svg: svg.plainEdge, color: main, subColor: sub, rotate: 90 },
  'pb': { svg: svg.plainEdge, color: main, subColor: sub, rotate: 180 },
  'pu': { svg: svg.plainEdge, color: main, subColor: sub, rotate: 270 },
  'b': { svg: svg.plain, subColor: '#a2fcf0' },
  'bd': { svg: svg.plain, subColor: '#0d8799' },
  'r': { svg: svg.river, frameNo: 2, speed: 1000 },
  'rh': { svg: svg.river, rotate: 90, frameNo: 2, speed: 1000 },
  'ra': { svg: svg.riverCurve, frameNo: 2, speed: 1000 },
  'rb': { svg: svg.riverCurve, rotate: 90, frameNo: 2, speed: 1000 },
  'rd': { svg: svg.riverCurve, rotate: 180, frameNo: 2, speed: 1000 },
  're': { svg: svg.riverCurve, rotate: 270, frameNo: 2, speed: 1000 },
  'la': { svg: svg.ladder, color: main, },
  'c': { svg: svg.checkered, color: '#a2e8fc' },
  'e': { svg: svg.exit, color: '#0d8799', subColor: '#fff' },
  'lh': { svg: svg.ladderHole, color: '#bba293', subColor: sub },
  'gr': { svg: svg.grass },
  'aa': { svg: svg.artWork },
  'st': { svg: svg.stair },
}


export default svgData