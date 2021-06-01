function init() {
  const map = document.querySelector('.map')
  const mapImage = document.querySelector('.map_image')
  const spriteContainer = document.querySelector('.sprite_container')
  const sprite = document.querySelector('.sprite')
  const height = 10
  const width = 20
  const iHeight = 20
  const iWidth = 40
  let cellSize = 40
  let spritePos = -cellSize
  let x = ((iWidth * cellSize) - (width * cellSize)) * -0.5
  let y = ((iHeight * cellSize) - (height * cellSize)) * -0.5
  let start = 89

  const indicator = document.querySelector('.indicator')

  
  const mapMap = ()=>{
    const mapArr = []   
    for (let i = 0; i < (width * height); i++){
      mapArr.push(i)
    }

    return mapArr.map((_ele,i)=>{
      const dataX = i % width
      const dataY = Math.floor(i / width)

      return `
        <div 
          class="map_tile"
          data-index=${i}
          data-x=${dataX}
          data-y=${dataY}
        >
        </div>  
      `
    }).join('')
  }

  map.innerHTML = mapMap()
  map.style.height = `${height * cellSize}px`
  map.style.width = `${width * cellSize}px`
  const mapTiles = document.querySelectorAll('.map_tile')

  const mapMapImage = () =>{
    const mapArr = []   
    for (let i = 0; i < (iWidth * iHeight); i++){
      mapArr.push(i)
    }

    return mapArr.map((_ele,i)=>{
      const dataX = i % iWidth
      const dataY = Math.floor(i / iWidth)

      return `
        <div 
          class="map_image_tile"
          data-index=${i}
          data-x=${dataX}
          data-y=${dataY}
        >
          ${i}
        </div>  
      `
    }).join('')
  }


  mapImage.innerHTML = mapMapImage()
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
  

  // const NoWall = pos =>{
  //   return !mapTiles[pos].classList.contains('wall')
  // }

  const setUpWalls = ()=>{
    mapImageTiles.forEach(tile=>{
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

    const direction = e.key ? e.key.toLowerCase().replace('arrow','') : e
    // const current = (x / cellSize) + ((y / cellSize) * width)
    let m = -cellSize
    switch (direction) {
      case 'right': 
        setX(x - cellSize)
        m = spritePos === m * 8 ? m * 9 : m * 8
        break
      case 'left': 
        setX(x + cellSize)
        m = spritePos === m * 6 ? m * 7 : m * 6
        break
      case 'up': 
        setY(y + cellSize)
        m = spritePos === m * 3 ? m * 5 : m * 3
        break
      case 'down': 
        setY(y - cellSize)
        m = spritePos === m * 0 ? m * 2 : m * 0
        break
      default:
        console.log('invalid command')
    }
    setSpritePos(m)
    // start = (x / cellSize) + ((y / cellSize) * width)
    indicator.innerHTML = `x:${x} y:${y}`
  }




  //! comment this bit out to enable keyboard control
  window.addEventListener('keydown', spriteWalk)

  const resize = () =>{
    const wrapper = document.querySelector('.wrapper')
    let pWidth = 800
    if (wrapper.offsetWidth < 800) {
      pWidth = wrapper.offsetWidth
    } 
    cellSize = Math.floor(pWidth / 20)
    const mapCover = document.querySelector('.map_cover')

    //*resize sprite
    positionSprite(start)
    setSpritePos(-cellSize)
    sprite.style.height = `${cellSize}px`
    sprite.style.width = `${cellSize * 12}px`
    spriteContainer.style.height = `${cellSize}px`
    spriteContainer.style.width = `${cellSize}px`

    //* resize map
    map.style.width = `${pWidth}px`
    map.style.height = `${pWidth / 2}px`
    mapCover.style.width = `${pWidth}px`
    mapCover.style.height = `${pWidth / 2}px`
    mapCover.style.marginTop = `-${pWidth / 2}px`
    mapTiles.forEach(tile=>{
      tile.style.width = `${pWidth / 20}px`
      tile.style.height = `${pWidth / 20}px`
    })
  }
  
  //*setup
  // setUpWalls()
  positionSprite(start)
  resize()
  setUpWalls()

  window.addEventListener('resize', resize)
}

window.addEventListener('DOMContentLoaded', init)



