//*resize still imcomplete.
//*add logic to trigger event when facing particular direction and at a location.


function init() {
  const map = document.querySelector('.map')
  const mapImageContainer = document.querySelector('.map_image_container')
  const mapImage = document.querySelector('.map_image')
  const location = document.querySelector('.location_indicator')
  const spriteContainer = document.querySelector('.sprite_container')
  const sprite = document.querySelector('.sprite')
  const height = 10
  const width = 20
  const iHeight = 20
  const iWidth = 40
  let cellSize = 40
  // const height = 5
  // const width = 10
  // const iHeight = 10
  // const iWidth = 20
  // let cellSize = 40
  let spritePos = -cellSize
  let x = ((iWidth * cellSize) - (width * cellSize)) * -0.5
  let y = ((iHeight * cellSize) - (height * cellSize)) * -0.5
  let start = 89
  // let start = 7
  
  const startLocationPos = (iWidth,iHeight)=> {
    return ((iWidth) * (iHeight / 2)) - (iWidth / 2) - 1
  }
  let locationPos = startLocationPos(iWidth,iHeight)
  
  const indicator = document.querySelector('.indicator')
  

  const mapMap = (width, height, classToAdd)=>{
    const mapArr = []   
    for (let i = 0; i < (width * height); i++){
      mapArr.push(i)
    }

    return mapArr.map((_ele,i)=>{
      const dataX = i % width
      const dataY = Math.floor(i / width)

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

  map.innerHTML = mapMap(width,height,'map_tile')
  map.style.height = `${height * cellSize}px`  //! make into function
  map.style.width = `${width * cellSize}px`
  const mapTiles = document.querySelectorAll('.map_tile')


  location.innerHTML = mapMap(iWidth,iHeight,'location_indicator_tile')
  const locationTiles = document.querySelectorAll('.location_indicator_tile')
  locationTiles[locationPos].classList.add('mark')


  mapImage.innerHTML = mapMap(iWidth,iHeight,'map_image_tile')
  mapImage.style.height = `${iHeight * cellSize}px`
  mapImage.style.width = `${iWidth * cellSize}px`
  const mapImageTiles = document.querySelectorAll('.map_image_tile')

  const setX = num =>{
    x = num
    mapImage.style.left = `${x}px` //! need to calculate from the center.
  }

  const setY = num =>{
    y = num
    mapImage.style.top = `${y}px`
  }

  setX(x)
  setY(y)

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

  // const clearTiles = ()=>{
  //   mapTiles[goal].innerHTML = ''
  //   mapTiles.forEach(tile=>{
  //     tile.className = 'map_tile'
  //   })
  //   setUpWalls()
  // }

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
    // start = (x / cellSize) + ((y / cellSize) * width)
    indicator.innerHTML = `x:${x} y:${y} pos:${locationTiles[locationPos].dataset.index}`
  }




  //! comment this bit out to enable keyboard control
  window.addEventListener('keydown', spriteWalk)

  const resize = () =>{
    const wrapper = document.querySelector('.wrapper')
    let pWidth = 800
    if (wrapper.offsetWidth < 800) {
      pWidth = wrapper.offsetWidth
    } 
    cellSize = Math.floor(pWidth / width)
    const calcWidth = Math.floor(pWidth / width) * width
    const mapCover = document.querySelector('.map_cover')

    const whRatio = width / height

    //*resize sprite
    positionSprite(start)
    setSpritePos(-cellSize)
    sprite.style.height = `${cellSize}px`
    sprite.style.width = `${cellSize * 12}px`
    spriteContainer.style.height = `${cellSize}px`
    spriteContainer.style.width = `${cellSize}px`

    //* resize map
    map.style.width = `${calcWidth}px`
    map.style.height = `${calcWidth / whRatio}px`

    mapCover.style.width = `${calcWidth}px`
    mapCover.style.height = `${calcWidth / whRatio}px`
    mapCover.style.marginTop = `-${calcWidth / whRatio}px`

    mapImageContainer.style.width = `${calcWidth}px`
    mapImageContainer.style.height = `${calcWidth / whRatio}px`

    

    mapTiles.forEach(tile=>{
      tile.style.width = `${cellSize}px`
      tile.style.height = `${cellSize}px`
    })
    
    console.log('c',cellSize)
    console.log('xy',locationPos,x,y)

    //! margin calc not quite right when resized after motion.
    const dataX = mapImageTiles[locationPos].dataset.x
    const dataY = mapImageTiles[locationPos].dataset.y
    const xMargin = ((+dataX + 1) * cellSize) / -2  //!割るんじゃなくて、マップの大きさを差し引いてOffsetする？
    const yMargin = ((+dataY + 1) * cellSize) / -2
    

    console.log(
      'x',xMargin,
      'y',yMargin
      )

    setX(xMargin)  
    setY(yMargin)

    //* mapImage resize
    mapImage.style.width = `${cellSize * iWidth}px`
    mapImage.style.height = `${(cellSize * iWidth) / (iWidth / iHeight)}px`
    mapImageTiles.forEach(tile=>{
      tile.style.width = `${cellSize}px`
      tile.style.height = `${cellSize}px`
    })
  }
  
  //*setup
  // setUpWalls()
  positionSprite(start)
  resize()
  setUpWalls(mapImageTiles)
  setUpWalls(locationTiles)

  // const setMarkPosition = (locationTiles,index) =>{
  //   locationTiles.forEach()
  // }

  window.addEventListener('resize', resize)
}

window.addEventListener('DOMContentLoaded', init)



