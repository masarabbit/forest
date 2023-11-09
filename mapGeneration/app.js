import mapData from './mapGenData.js'
import { defaultMemory, triggerMotion } from './search.js'

function init() {

  const copyText = box =>{
    box.select()
    box.setSelectionRange(0, 99999) // For mobile devices 
    document.execCommand('copy')
  }


  const setTargetSize = (target, w, h) => {
    target.setAttribute('style', `width:${w}px; height:${h}px; --width:${w}px; --height: ${h}px;`)  
  }

  const gridToMap = (w, h)=> new Array(w * h).fill('')
  const cellSize = d => `width:${d}px; height:${d}px`
  
  const y = i => Math.floor(i / mapData.w)
  const x = i => i % mapData.w
  const edge = key => (mapData[key] - 1)
  

  const createGrid = () =>{
    const { w, h, cellD: d, grid } = mapData
    setTargetSize(grid, w * d, h * d)
    grid.innerHTML = gridToMap(w, h).map((_m, i)=> {
      return `<div class="cell" style="${cellSize(d)}" data-index="${i}">${i}</div>`
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

  }



  const addClasses = () =>{
    mapData.mapTiles = document.querySelectorAll('.cell')
    mapData.mapTiles.forEach((c, i) =>{
      const code = mapData.codes[i]
      c.className = (code * 0 !== 0 ? `cell ${code} wall` : 'cell')
      c.innerHTML = code
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
    mapData.output.innerHTML = mapData.codes.join(',')
  }


  
  addEdge()
  addEntrances()
  createLakes()
  addClasses()

  mapData.searchMemory = defaultMemory(mapData.w, mapData.h)
  
  document.querySelector('.copy').addEventListener('click', ()=>{
    copyText(mapData.output)
  })
  mapData.mapTiles = document.querySelectorAll('.cell')
  mapData.mapTiles.forEach(mapTile => mapTile.addEventListener('click', e =>triggerMotion(e, addClasses)))

}

window.addEventListener('DOMContentLoaded', init)