// import { setTargetSize } from './utils/utils.js'
import svgData from './data/svgData.js'
import { svgWrapper } from './data/svg.js'
import { decode } from './utils/compression.js'

function init() {

  const mapData = {
    w: 30,
    h: 20,
    cellD: 20,
    grid: document.querySelector('.grid'),
    codes: [],
    // cells: null,
  }

  const populateWithSvg = (key, target) =>{
    if (svgData[key]){
      const { svg, color, subColor, rotate, flip, frameNo, speed } = svgData[key]
      let colorAction = ''
      colorAction = typeof(color) === 'function' ? color() : color

      const svgContent = 
      `${svgWrapper({
          content: decode(subColor ? svg(subColor) : svg()),
          color: colorAction || '',
          rotate: rotate || 0,
          flip,
          wrapper: frameNo ? 'anim_wrapper' : 'svg_wrap',
          frameNo,
          speed
        })}`
      
      target.innerHTML = svgContent
    } 
  }

  const setTargetSize = (target, w, h) => {
    target.setAttribute('style', `width:${w}px; height:${h}px; --width:${w}px; --height: ${h}px;`)  
  }

  const gridToMap = (w, h)=> new Array(w * h).fill('')
  const cellSize = d => `width:${d}px; height:${d}px`
  
  const y = i => Math.floor(i / mapData.w)
  const x = i => i % mapData.w
  const edge = key => (mapData[key] - 1)
  
  // console.log(y(599))
  const createGrid = () =>{
    const { w, h, cellD: d, grid } = mapData
    setTargetSize(grid, w * d, h * d)
    grid.innerHTML = gridToMap(w, h).map((_m, i)=> {
      return `<div class="cell" style="${cellSize(d)}">${i}</div>`
    }).join('')
  }

  createGrid()

  
  const addEdge = () =>{
    // TODO need to update letter code
    const { w, h } = mapData
    mapData.codes = new Array(w * h).fill('').map((_c, i) =>{
      let code = i
      if (y(i) === 0) code = 't'
      if (y(i) === edge('h')) code = 'b'
      if (x(i) === 0) code = 'l'
      if (x(i) === edge('w')) code = 'r'
      if ((y(i) + x(i)) === 0) code = 'ca'
      if (i === w - 1) code = 'cb'
      if (i === w * h - w) code = 'cc'
      if (i === w * h - 1) code = 'cd'
      return code
    })
    // document.querySelectorAll('.cell').forEach((c, i) =>{
    //   
    //   const { width: w, height: h } = mapData
    //   if ([0, edge('height')].includes(y(i))) c.innerHTML = 'x'
    //   if ([0, edge('width')].includes(x(i))) c.innerHTML = 'x'
    //   if ((y(i) + x(i)) === 0) c.innerHTML = 'y'
    //   if (i === w - 1) c.innerHTML = 't'
    //   if (i === w * h - w) c.innerHTML = 'p'
    //   if (i === w * h - 1) c.innerHTML = 'r'
    // })
  }

  const cellsWithLetterX = x => mapData.codes.map((c, i) => c === x ? i : null).filter(c => c)
  const randomIndex = arr => arr[Math.floor(Math.random() * arr.length)]

  const addEntrances = () =>{
    const randomExitIndexs = ['t', 'l', 'r', 'b'].map(x => randomIndex(cellsWithLetterX(x)))
    mapData.codes = mapData.codes.map((c, i) => randomExitIndexs.includes(i) ? 'E' : c)
  }

  const addClasses = () =>{
    document.querySelectorAll('.cell').forEach((c, i) =>{
      c.classList.add(mapData.codes[i])
      c.innerHTML = mapData.codes[i]
    })
  }

  const randomNo = (min, max) => min + (Math.floor(Math.random() * (max - min)))
  // console.log(randomNo(4))

  const createLakes = () =>{
    const availableArea = mapData.codes.filter(c => c * 0 === 0)
    const randomSeeds = new Array(randomNo(2, 5)).fill('').map(() => randomIndex(availableArea))
    // console.log(randomSeeds)
    // const randomSeeds = [47, 417, 237, 308]
    // TODO currently lake can block path from entrace, so maybe need to define path first then make sure lake doesn't block it

    // TODO set this somewhere different so each lake is different (currently always the same)
    const defaultWidth = randomNo(3, 6)
    const height = randomNo(3, 6)

    const lake = arr => {
      return arr.map(n => {
        const distanceFromEdge = edge('w') - n % mapData.w
        const width = distanceFromEdge < defaultWidth ? distanceFromEdge : defaultWidth
        const x = i => i % width
        const y = i => Math.floor(i / width) * mapData.w
        return new Array(width * height).fill('').map((_c, i) =>{
          return n + x(i) + y(i)
        })
      }).reduce((a, b) => a.concat(b))
    }
    console.log(lake(randomSeeds))

    mapData.codes = mapData.codes.map((c, i) => {
      return lake(randomSeeds).includes(i) ? 's' : c
    }) 
    // mapData.codes = mapData.codes.map((c, i) => randomSeeds.includes(i) ? 's' : c) 
  }

  const triggerPopulateWithSvg = () =>{
    document.querySelectorAll('.cell').forEach(c =>{
      populateWithSvg(c.innerHTML, c)
    })
  }
  
  addEdge()
  addEntrances()
  createLakes()
  addClasses()
  // triggerPopulateWithSvg()
  // const createBaseArea = () =>

  // console.log(mapData.height)
  // console.log(edge('height'))


}

window.addEventListener('DOMContentLoaded', init)