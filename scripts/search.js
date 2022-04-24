

function init() {
  const delay = 20

  let start = 31
  let goal = 0
  let carryOn = true
  let triedAnotherWay = false
  // let route = []
  let mapTiles
  let displayTimer


  const mapData = {
    w: 30,
    h: 20,
    cellD: 20,
    grid: document.querySelector('.grid'),
    codes: 'ca,t,E,E,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,cb,l,31,E,E,34,35,36,37,38,s,s,s,s,s,s,s,s,47,48,49,50,51,52,53,54,55,56,57,58,r,l,61,E,E,64,65,66,67,68,s,s,s,s,s,s,s,s,77,78,79,80,81,82,83,84,85,86,87,88,r,l,91,E,E,94,95,96,97,98,s,s,s,s,s,s,s,s,107,108,109,110,111,112,113,114,115,116,117,118,r,l,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,r,l,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,r,l,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,E,l,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,E,l,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,E,l,271,s,s,s,s,s,s,s,s,280,281,282,283,284,285,286,s,s,s,s,s,s,s,s,295,296,297,298,r,l,301,s,s,s,s,s,s,s,s,310,311,312,313,314,315,316,s,s,s,s,s,s,s,s,325,326,327,328,r,l,331,s,s,s,s,s,s,s,s,s,s,342,343,344,345,346,s,s,s,s,s,s,s,s,355,356,357,358,r,l,361,s,s,s,s,s,s,s,s,s,s,372,373,374,375,376,s,s,s,s,s,s,s,s,385,386,387,388,r,E,E,392,s,s,s,s,s,s,s,s,s,402,403,404,405,406,s,s,s,s,s,s,s,s,415,416,417,418,r,E,E,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,s,s,s,s,s,s,s,s,445,446,447,448,r,E,E,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,r,E,E,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,s,s,s,s,s,s,l,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,s,s,s,s,s,s,l,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,s,s,s,s,s,s,cc,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,E,E,b,b,b,b,cd',
    // cells: null,
  }

  const setTargetSize = (target, w, h) => {
    target.setAttribute('style', `width:${w}px; height:${h}px; --width:${w}px; --height: ${h}px;`)  
  }

  const gridToMap = (w, h)=> new Array(w * h).fill('')
  const cellSize = d => `width:${d}px; height:${d}px`
  
  const y = i => Math.floor(i / mapData.w)
  const x = i => i % mapData.w
  // const edge = key => (mapData[key] - 1)
  
  // console.log(y(599))
  const createGrid = () =>{
    const { w, h, cellD: d, grid } = mapData
    setTargetSize(grid, w * d, h * d)
    grid.innerHTML = gridToMap(w, h).map((_m, i)=> {
      return `<div class="cell" style="${cellSize(d)}" data-index="${i}" data-x=${x(i)}
      data-y=${y(i)}>${i}</div>`
    }).join('')
  }

  const addClasses = () =>{
    mapTiles = document.querySelectorAll('.cell')
    mapTiles.forEach((c, i) =>{
      const code = mapData.codes.split(',')[i]
      c.classList.add(code)
      if(code * 0 !== 0)c.classList.add('wall')
      c.innerHTML = code
    })
    
  }

  createGrid()
  addClasses()


  const searchMemory = new Array(mapData.w * mapData.h).fill('').map(()=>{
    return {
      path: null,
      searched: false,
      prev: null
    }
  })

  const displayPath = current =>{
    // console.log(mapTiles[current])
    searchMemory[current].path = 'path'
    mapTiles[current].classList.add('path')
    let prev = searchMemory[current].prev
    
    //! when sprite is one square away from start and prev is undefined, prev is corrected.
    if (current - mapData.w === start ||
      current + mapData.w === start ||
      current - 1 === start ||
      current + 1 === start) prev = start

    // let direction
    // if (current - mapData.w === prev) direction = 'down'
    // if (current + mapData.w === prev) direction = 'up'
    // if (current - 1 === prev) direction = 'right'
    // if (current + 1 === prev) direction = 'left'
    
    // if (prev) route.push(direction)

    if (!prev) {
      // route.push('reset')
      start = goal
      return
    }

    displayTimer = setTimeout(()=>{
      displayPath(prev)
    }, delay)

  }

  const distanceBetween = (a, b) => Math.abs(x(a) - x(b)) + Math.abs(y(a) - y(b))

  const decideNextMove = (current, count) =>{
    if (!carryOn) return
    const possibleDestination = [
      current + 1,
      current - 1,
      current - mapData.w,
      current + mapData.w  
    ]
    const mapInfo = []
    if (possibleDestination.some(cell => cell === goal)) {
      console.log(possibleDestination)
      carryOn = false
      searchMemory[goal].prev = current
      displayPath(goal)
      return
    }
    possibleDestination.forEach(option=>{  
      if (mapTiles[option] && 
          !mapTiles[option].classList.contains('wall') && 
          !searchMemory[option].searched && 
          option !== start) {
        mapInfo.push(
          { 
            cell: option,
            prev: current,
            distanceFromStart: distanceBetween(start, option),
            distanceToGoal: distanceBetween(goal, option)
          }
        )
      }
    })
    const minValue = Math.min(...mapInfo.map(cell=> cell.distanceFromStart + cell.distanceToGoal))
    const optionsWithMinValue = mapInfo.filter(cell => (cell.distanceFromStart + cell.distanceToGoal) === minValue)

    mapInfo.filter(cell=> (cell.distanceFromStart + cell.distanceToGoal) !== minValue).forEach(option=>{
      mapTiles[option.cell].classList.add('sub_node')
    })

    if (optionsWithMinValue.length === 0 && !triedAnotherWay) {
      triedAnotherWay = true
      tryAnotherWay(count)
    }

    optionsWithMinValue.forEach(option=>{
      searchMemory[option.cell].searched = true 
      searchMemory[option.cell].prev = current
      mapTiles[option.cell].classList.add('node')   
      setTimeout(()=>{
        decideNextMove(option.cell, count + 1)
      },delay)
    })
  }

  const tryAnotherWay = count =>{
    if (!carryOn) return
    const possibleDestination = [
      start + 1,
      start - 1,
      start - mapData.w,
      start + mapData.w  
    ]
    possibleDestination.forEach(path=>{
      if (mapTiles[path] && 
          !searchMemory[path].searched && 
          !mapTiles[path].classList.contains('wall')) {
        decideNextMove(path, count + 1)
      }
    })
  }

  const clearTiles = ()=>{
    mapTiles[goal].innerHTML = ''
    mapTiles.forEach(tile=>{
      tile.className = 'cell'
    })
    addClasses()
  }

  const resetMotion = () =>{
    clearTimeout(displayTimer)
    clearTiles()
    searchMemory.forEach(memory=>{
      memory.path = null,
      memory.searched = false,
      memory.prev = null
    })
    // route = []
    carryOn = true
    triedAnotherWay = false
  }

  const triggerMotion = e =>{
    console.log('test')
    if (+e.target.dataset.index === goal || !e.target.dataset.index) return 
    mapTiles[goal].innerHTML = ''
    goal = +e.target.dataset.index
    if (mapTiles[goal].classList.contains('wall')) return
    resetMotion()
    mapTiles[start].classList.add('start')
    mapTiles[goal].classList.add('goal')
    searchMemory[start].path = 'start'
    searchMemory[goal].path = 'goal'
    decideNextMove(start, 0)
  }

  mapTiles.forEach(mapTile => {
    mapTile.addEventListener('click', triggerMotion)
    // mapTile.innerHTML = 't'
  })

  // window.addEventListener('resize', resize)
}

window.addEventListener('DOMContentLoaded', init)