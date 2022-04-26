

function init() {


  const mapData = {
    w: 30,
    h: 20,
    cellD: 20,
    grid: document.querySelector('.grid'),
    codes: 'ca,t,E,E,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,cb,l,31,E,E,34,35,36,37,38,s,s,s,s,s,s,s,s,47,48,49,50,51,52,53,54,55,56,57,58,r,l,61,E,E,64,65,66,67,68,s,s,s,s,s,s,s,s,77,78,79,80,81,82,83,84,85,86,87,88,r,l,91,E,E,94,95,96,97,98,s,s,s,s,s,s,s,s,107,108,109,110,111,112,113,114,115,116,117,118,r,l,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,r,l,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,r,l,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,E,l,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,E,l,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,E,l,271,s,s,s,s,s,s,s,s,280,281,282,283,284,285,286,s,s,s,s,s,s,s,s,295,296,297,298,r,l,301,s,s,s,s,s,s,s,s,310,311,312,313,314,315,316,s,s,s,s,s,s,s,s,325,326,327,328,r,l,331,s,s,s,s,s,s,s,s,s,s,342,343,344,345,346,s,s,s,s,s,s,s,s,355,356,357,358,r,l,361,s,s,s,s,s,s,s,s,s,s,372,373,374,375,376,s,s,s,s,s,s,s,s,385,386,387,388,r,E,E,392,s,s,s,s,s,s,s,s,s,402,403,404,405,406,s,s,s,s,s,s,s,s,415,416,417,418,r,E,E,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,s,s,s,s,s,s,s,s,445,446,447,448,r,E,E,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,r,E,E,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,s,s,s,s,s,s,l,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,s,s,s,s,s,s,l,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,s,s,s,s,s,s,cc,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,E,E,b,b,b,b,cd',
    start: 31,
    goal: 0,
    carryOn: true,
    delay: 10,
    displayTimer: null,
    searchMemory: null,
  }

  const setTargetSize = (target, w, h) => {
    target.setAttribute('style', `width:${w}px; height:${h}px; --width:${w}px; --height: ${h}px;`)  
  }
  

  // TODO make path fatter by going through array and adding cell underneath or beside the cell
  // const makePathFatter = (cell, direction) =>{
  //   something[cell + direction] = 'path'
  // }

  const gridToMap = (w, h) => new Array(w * h).fill('')
  const cellSize = d => `width:${d}px; height:${d}px`
  const distance = (a, b) => Math.abs(x(a) - x(b)) + Math.abs(y(a) - y(b))
  const y = i => Math.floor(i / mapData.w)
  const x = i => i % mapData.w
  
  const createGrid = () =>{
    const { w, h, cellD: d, grid } = mapData
    setTargetSize(grid, w * d, h * d)
    grid.innerHTML = gridToMap(w, h).map((_m, i)=> {
      return `<div class="cell" style="${cellSize(d)}" data-index="${i}">${i}</div>`
    }).join('')
  }

  const addClasses = () =>{
    mapData.mapTiles = document.querySelectorAll('.cell')
    mapData.mapTiles.forEach((c, i) =>{
      const code = mapData.codes.split(',')[i]
      c.className = (code * 0 !== 0 ? `cell ${code} wall` : 'cell')
      c.innerHTML = code
    })
  }

  const defaultMemory = (w, h) => gridToMap(w, h).map(()=>{
    return {
      path: null,
      searched: false,
      prev: null
    }
  })

  mapData.searchMemory = defaultMemory(mapData.w, mapData.h)
  const isWall = i => mapData.mapTiles[i].classList.contains('wall')

  const displayPath = (current, data) =>{
    const { w, mapTiles, goal } = data
    data.searchMemory[current].path = 'path'

    //? make path fat
    const fatPath = [1, -1, -w, w].map(d => d + current)
    fatPath.forEach(c => !isWall(c) && mapTiles[c].classList.add('path'))

    // mapTiles[current].classList.add('path')
    //* add path to code
    // mapData.codes = mapData.codes.split(',').map((c, i) => i === current ? 'p' : c).join(',')
    data.searchMemory[current].prev
      ? data.displayTimer = setTimeout(()=> displayPath(data.searchMemory[current].prev, data), data.delay)
      : data.start = goal
  }

  const decideNextMove = (current, count, data) =>{
    const { start, goal, w, searchMemory } = data
    if (!data.carryOn) return
    const possibleDestination = [1, -1, -w, w].map(d => d + current)
    if (!possibleDestination.some(c => c === goal)) {
      const mapInfo = []
      possibleDestination.forEach(cell =>{  
        if (!isWall(cell) && !searchMemory[cell].searched && cell !== start) {
          mapInfo.push({ 
            cell, 
            prev: current, 
            distanceToGoal: distance(goal, cell) 
          })
        }
      })
      const minValue = Math.min(...mapInfo.map(c => c.distanceToGoal))
      mapInfo.filter(c => c.distanceToGoal === minValue).forEach(c =>{
        data.searchMemory[c.cell].searched = true 
        data.searchMemory[c.cell].prev = current
        data.mapTiles[c.cell].classList.add('node')   
        setTimeout(()=> decideNextMove(c.cell, count + 1, data), data.delay)
      })
    } else {
      data.carryOn = false
      data.searchMemory[goal].prev = current
      displayPath(goal, data)
    }  
  }
  
  const resetMotion = data =>{
    const { w, h, goal, displayTimer } = data
    clearTimeout(displayTimer)
    data.mapTiles[goal].innerHTML = ''
    data.mapTiles.forEach(tile => tile.className = 'cell')
    addClasses()
    data.searchMemory = defaultMemory(w, h)
    data.carryOn = true
  }

  const triggerMotion = (e, data) =>{
    const { start, goal } = data
    if (+e.target.dataset.index !== goal && e.target.dataset.index){
      data.mapTiles[goal].innerHTML = ''
      data.goal = +e.target.dataset.index
      if (!isWall(data.goal)){
        resetMotion(data)
        //* only for demo
        data.mapTiles[start].classList.add('start')
        data.mapTiles[data.goal].classList.add('goal')
        //* -------------
        decideNextMove(start, 0, data)
      }
    }
  }
  
  // setup
  createGrid()
  addClasses()

  mapData.mapTiles.forEach(mapTile => mapTile.addEventListener('click', e =>triggerMotion(e, mapData)))

  // window.addEventListener('resize', resize)

  
}

window.addEventListener('DOMContentLoaded', init)

// export {
//   decideNextMove,
//   triggerMotion,
//   resetMotion,
// }