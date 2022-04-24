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
    }
  }

  const copyText = box =>{
    box.select()
    box.setSelectionRange(0, 99999) // For mobile devices 
    document.execCommand('copy')
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
    const indexs = {}
    const keys = ['t', 'l', 'r', 'b']
    keys.forEach(k => indexs[k] = randomIndex(cellsWithLetterX(k)))
    console.log(indexs)
    // indexs.t - create path from top



    const randomExitIndexs = ['t', 'l', 'r', 'b'].map(x => randomIndex(cellsWithLetterX(x)))

    const path = arr =>{
      return arr.map(n=> {
        return paintArea({
          start: n,
          defaultWidth: randomNo(2, 3),
          height: randomNo(3, 5)
        })
      }).reduce((a, b) => a.concat(b))
    }
    // TODO need some way to make the path connect to each other, and wider than 1 box
    console.log('r', randomExitIndexs)
    const randomPaths = path(randomExitIndexs)
    console.log('p', randomPaths)

    mapData.codes = mapData.codes.map((c, i) => randomPaths.includes(i) ? 'E' : c)

    // mapData.codes = mapData.codes.map((c, i) => randomExitIndexs.includes(i) ? 'E' : c)
  }

  const addClasses = () =>{
    document.querySelectorAll('.cell').forEach((c, i) =>{
      c.classList.add(mapData.codes[i])
      c.innerHTML = mapData.codes[i]
    })
  }

  const randomNo = (min, max) => min + (Math.floor(Math.random() * (max - min)))
  // console.log(randomNo(4))

  const paintArea = ({ start, defaultWidth, height }) =>{
    const distanceFromEdge = edge('w') - start % mapData.w + 1
    const width = distanceFromEdge < defaultWidth ? distanceFromEdge : defaultWidth
    const x = i => i % width
    const y = i => Math.floor(i / width) * mapData.w
    return new Array(width * height).fill('').map((_c, i) =>{
      return start + x(i) + y(i)
    })
  }

  const createLakes = () =>{
    const availableArea = mapData.codes.filter(c => c * 0 === 0)
    const randomSeeds = new Array(randomNo(2, 8)).fill('').map(() => randomIndex(availableArea))
    console.log(randomSeeds)
    // const randomSeeds = [47, 417, 237, 308]
    // TODO currently lake can block path from entrace, so maybe need to define path first then make sure lake doesn't block it
    
    const lake = arr =>{
      return arr.map(n=> {
        return paintArea({
          start: n,
          defaultWidth: randomNo(mapData.lake.w.min, mapData.lake.w.max),
          height: randomNo(mapData.lake.h.min, mapData.lake.h.max)
        })
      }).reduce((a, b) => a.concat(b))
    }

    const randomLakes = lake(randomSeeds)
    mapData.codes = mapData.codes.map((c, i) => {
      return randomLakes.includes(i) ? 's' : c
    }) 
    // mapData.codes = mapData.codes.map((c, i) => randomSeeds.includes(i) ? 's' : c) 
    // console.log(mapData.codes)
    mapData.output.innerHTML = mapData.codes.join(',')
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
  
  document.querySelector('.copy').addEventListener('click', ()=>{
    copyText(mapData.output)
  })

}

window.addEventListener('DOMContentLoaded', init)