import mapData from '../data/mapGenData.js'


const gridToMap = (w, h) => new Array(w * h).fill('')

const y = i => Math.floor(i / mapData.w)
const x = i => i % mapData.w
const distance = (a, b) => Math.abs(x(a) - x(b)) + Math.abs(y(a) - y(b))

const defaultMemory = (w, h) => gridToMap(w, h).map(()=>{
  return {
    path: null,
    searched: false,
    prev: null
  }
})

const isWall = i => mapData.mapTiles[i].classList.contains('wall')

const displayPath = current =>{
  const { w, mapTiles, goal } = mapData
  mapData.searchMemory[current].path = 'path'

  //? make path fat
  const fatPath = [1, -1, -w, w].map(d => d + current)
  fatPath.forEach(c => !isWall(c) && mapTiles[c].classList.add('path'))

  // mapTiles[current].classList.add('path')
  //* add path to code
  // mapData.codes = mapData.codes.split(',').map((c, i) => i === current ? 'p' : c).join(',')
  mapData.searchMemory[current].prev
    ? mapData.displayTimer = setTimeout(()=> displayPath(mapData.searchMemory[current].prev), mapData.delay)
    : mapData.start = goal
}

const decideNextMove = (current, count) =>{
  const { start, goal, w, searchMemory } = mapData
  if (!mapData.carryOn) return
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
      mapData.searchMemory[c.cell].searched = true 
      mapData.searchMemory[c.cell].prev = current
      mapData.mapTiles[c.cell].classList.add('node')   
      setTimeout(()=> decideNextMove(c.cell, count + 1), mapData.delay)
    })
  } else {
    mapData.carryOn = false
    mapData.searchMemory[goal].prev = current
    displayPath(goal)
  }  
}

const resetMotion = action =>{
  const { w, h, goal, displayTimer } = mapData
  clearTimeout(displayTimer)
  mapData.mapTiles[goal].innerHTML = ''
  mapData.mapTiles.forEach(tile => tile.className = 'cell')
  action()
  mapData.searchMemory = defaultMemory(w, h)
  mapData.carryOn = true
}

const triggerMotion = (e, action) =>{
  const { start, goal } = mapData
  if (+e.target.dataset.index !== goal && e.target.dataset.index){
    // console.log('test', mapData)
    mapData.mapTiles[goal].innerHTML = ''
    mapData.goal = +e.target.dataset.index
    if (!isWall(mapData.goal)){
      resetMotion(action)
      //* only for demo
      mapData.mapTiles[start].classList.add('start')
      mapData.mapTiles[mapData.goal].classList.add('goal')
      //* -------------
      decideNextMove(start, 0)
    }
  }
}
  
export {
  defaultMemory,
  triggerMotion
}
