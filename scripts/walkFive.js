//*resize still imcomplete.
//*add logic to trigger event when facing particular direction and at a location.

function init() {

  const mapData = [
    {
      name: 'one',
      width: 16,
      height: 8,
      iWidth: 30,
      iHeight: 20,
      cellSize: 'auto'
    },
    {
      name: 'two',
      width: 20,
      height: 10,
      iWidth: 30,
      iHeight: 20,
      cellSize: 'auto'
    },
    {
      name: 'three',
      width: 8,
      height: 6,
      iWidth: 24,
      iHeight: 10,
      cellSize: 40
    }
  ]

  const buttonWrapper = document.querySelector('.button')
  buttonWrapper.innerHTML = mapData.map((m,i)=>{
    return `
      <button data-index=${i}>
        ${m.name}
      </button>
    `
  }).join('')
  const buttons = document.querySelectorAll('button')


  const wrapper = document.querySelector('.wrapper')
  const map = document.querySelector('.map')
  const mapImageContainer = document.querySelector('.map_image_container')
  const mapCover = document.querySelector('.map_cover')
  const mapImage = document.querySelector('.map_image')
  const location = document.querySelector('.location_indicator')
  const spriteContainer = document.querySelector('.sprite_container')
  const sprite = document.querySelector('.sprite')
  const indicator = document.querySelector('.indicator')

  let locationIndex = 0

  let height
  let width
  let iHeight
  let iWidth
  let locationPos 
  let start
  let cellSize = 40
  let miniCellSize = Math.floor(cellSize / 4)
  let spritePos = -cellSize
  let x 
  let y 
  let mapTiles
  let locationTiles
  let mapImageTiles


  const setLocation = index => {
    height = mapData[index].height
    width = mapData[index].width
    iHeight = mapData[index].iHeight
    iWidth = mapData[index].iWidth

    map.innerHTML = mapMap(width,height,'map_tile')
    mapTiles = document.querySelectorAll('.map_tile')
  
    location.innerHTML = mapMap(iWidth,iHeight,'location_indicator_tile')
    locationTiles = document.querySelectorAll('.location_indicator_tile')
  
    mapImage.innerHTML = mapMap(iWidth,iHeight,'map_image_tile')
    mapImageTiles = document.querySelectorAll('.map_image_tile')

    locationPos = startLocationPos(iWidth,iHeight)
    start = Math.floor((width * height) / 2) - Math.floor((width / 2)) - 1
  }


  const startLocationPos = (w,h)=> {
    return ((w) * (h / 2)) - (w / 2) - 1
  }



  const mapMap = (w, h, classToAdd)=>{
    const mapArr = new Array(w * h).fill('').map((_ele,i)=>i)
    return mapArr.map((_ele,i)=>{
      const dataX = i % w
      const dataY = Math.floor(i / w)
      return `
        <div 
          class=${classToAdd}
          data-index=${i}
          data-x=${dataX}
          data-y=${dataY}
        >
          ${i}
        </div>  
      `
    }).join('')
  }


  const adjustRectSize = (target,w,h,c,t) =>{
    target.style.width = `${w * c}px`
    target.style.height = `${h * c}px` 
    t 
    ? t.forEach(tile=>{
      tile.style.width = `${c}px`
      tile.style.height = `${c}px`
    })
    : ''
  }
  

  const setX = num =>{
    x = num
    mapImage.style.left = `${x}px` //! need to calculate from the center.
  }

  const setY = num =>{
    y = num
    mapImage.style.top = `${y}px`
  }

  // setX(x)
  // setY(y)

  const setSpritePos = num =>{
    spritePos = num
    sprite.style.marginLeft = `${spritePos}px`
  }

  const positionSprite = pos =>{
    const paraX = pos % width * cellSize
    const paraY = Math.floor(pos / width) * cellSize
    spriteContainer.style.left = `${paraX}px`
    spriteContainer.style.top = `${paraY}px`
  }
  

  const noWall = pos =>{
    return !mapImageTiles[pos].classList.contains('wall')
  }

  const setUpWalls = target =>{
    target.forEach(tile=>{
      if (tile.dataset.y === '0' || 
          tile.dataset.y === `${(iHeight - 1)}` || 
          tile.dataset.x === '0' || 
          tile.dataset.x === `${(iWidth - 1)}`) tile.classList.add('wall')
    })
  }


  const spriteWalk = e=>{
    if (!e) return
  
    locationTiles[locationPos].classList.remove('mark')
    const direction = e.key ? e.key.toLowerCase().replace('arrow','') : e
    let m = -cellSize

    switch (direction) {
      case 'right': 
        if (noWall(locationPos + 1)){
          setX(x - cellSize)
          locationPos += 1
        }
        m = spritePos === m * 8 ? m * 9 : m * 8
        break
      case 'left': 
        if (noWall(locationPos - 1)){
          setX(x + cellSize)
          locationPos -= 1
        }
        m = spritePos === m * 6 ? m * 7 : m * 6
        break
      case 'up': 
        if (noWall(locationPos - iWidth)){
          setY(y + cellSize)
          locationPos -= iWidth
        }
        m = spritePos === m * 3 ? m * 5 : m * 3
        break
      case 'down': 
        if (noWall(locationPos + iWidth)){
          setY(y - cellSize)
          locationPos += iWidth
        }    
        m = spritePos === m * 0 ? m * 2 : m * 0
        break
      default:
        console.log('invalid command')
    }
    setSpritePos(m)
    locationTiles[locationPos].classList.add('mark')
    
    //*indicator
    indicator.innerHTML = `x:${x} y:${y} pos:${locationTiles[locationPos].dataset.index}`
    const dataX = mapImageTiles[locationPos].dataset.x
    const dataY = mapImageTiles[locationPos].dataset.y
    console.log(
      'cellSize',cellSize,
      'dataX',dataX,
      'dataY',dataY,
      'x',x,
      'y',y,
      'los',locationPos
      )
  }


  //* key control
  window.addEventListener('keydown', spriteWalk)


  
  const resize = option =>{    　
    let pWidth = 800
    if (wrapper.offsetWidth < 800) {
      pWidth = wrapper.offsetWidth
    } 

    //! this bit can be commented out to keep cellSizeConsistent
    cellSize = option === 'auto'
    ? Math.floor(pWidth / width)
    : option
    positionSprite(start)

    //* update offset margins
    const dataX = mapImageTiles[locationPos].dataset.x
    const dataY = mapImageTiles[locationPos].dataset.y
    const xMargin = dataX * -cellSize + ((Math.floor(width / 2) - 1) * cellSize)
    const yMargin = dataY * -cellSize + ((Math.floor(height / 2) - 1) * cellSize) 
    setX(xMargin)  
    setY(yMargin)

    //* adjust sprite
    setSpritePos(-cellSize)
    sprite.style.height = `${cellSize}px`
    sprite.style.width = `${cellSize * 12}px`
    spriteContainer.style.height = `${cellSize}px`
    spriteContainer.style.width = `${cellSize}px`

    //* resize mapImageContainer
    adjustRectSize(mapImageContainer,width,height,cellSize)
    
    //* resize map
    adjustRectSize(map,width,height,cellSize,mapTiles)
    
    //* setup location indicator
    miniCellSize = Math.floor(cellSize / 8)
    adjustRectSize(location,iWidth,iHeight,miniCellSize,locationTiles)
    locationTiles[locationPos].classList.add('mark')
  
    //* setup map image
    adjustRectSize(mapImage,iWidth,iHeight,cellSize,mapImageTiles)
    
    //* setup mapcover
    adjustRectSize(mapCover,width,height,cellSize)
    
    //* setup walls
    //! can be taken out from here and take to reset
    setUpWalls(mapImageTiles)
    setUpWalls(locationTiles)
  }


  window.addEventListener('resize', ()=>resize(mapData[locationIndex].cellSize))
  setLocation(1)
  resize('auto')

  const toggleLocation = e =>{
    locationIndex = e.target.dataset.index
    setLocation(locationIndex)
    resize(mapData[locationIndex].cellSize)
  }


  buttons.forEach(button=>{
    button.addEventListener('click',(e)=>toggleLocation(e))
  })



}

window.addEventListener('DOMContentLoaded', init)



