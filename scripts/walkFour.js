function init() {
  const map = document.querySelector('.map')
  const mapImage = document.querySelector('.map_image')
  const spriteContainer = document.querySelector('.sprite_container')
  const sprite = document.querySelector('.sprite')
  const height = 10
  const width = 20
  let cellSize = 40
  let spritePos = -cellSize
  let x = -200
  let y = -200
  let start = 89

  const indicator = document.querySelector('.indicator')

  // const cellsWithWalls = [
  //   31,45,69,68,71,73,82,83,85,88,91,94,95,96,98,105,110,111,112,123,125,128,137,141,142,143,145,146,154,156,157,171
  // ]
  
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
  const mapTiles = document.querySelectorAll('.map_tile')

  const mapMapImage = () =>{
    const mapArr = []   
    for (let i = 0; i < (40 * 20); i++){
      mapArr.push(i)
    }

    return mapArr.map((_ele,i)=>{
      return `
        <div 
          class="map_image_tile"
          data-index=${i}
        >
          ${i}
        </div>  
      `
    }).join('')
  }


  mapImage.innerHTML = mapMapImage()

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

  // const setUpWalls = ()=>{
  //   mapTiles.forEach(tile=>{
  //     if (tile.dataset.y === '0' || 
  //         tile.dataset.y === '9' || 
  //         tile.dataset.x === '0' || 
  //         tile.dataset.x === '19') tile.classList.add('wall')
  //   })
  // }

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
  window.addEventListener('resize', resize)
}

window.addEventListener('DOMContentLoaded', init)



