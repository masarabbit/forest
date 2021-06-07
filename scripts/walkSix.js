

//*maybe design maps first.
//*add logic to trigger event when facing particular direction and at a location.
//* create logic to enable bear to move around map (exit and entry)

//! events can be triggered by combination of where the bear is, and dataset.index

function init() {

  const tree = () => {
    return `
    <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 45.5 45.5">
      <path d="M22.32,13.11L7.46,33.18c-0.74,1-0.03,2.42,1.22,2.42H38.4c1.25,0,1.96-1.42,1.22-2.42L24.76,13.11
        C24.15,12.29,22.93,12.29,22.32,13.11z"/>
      <path d="M27.97,45.5h-8.86c-1,0-1.8-0.81-1.8-1.8V32.43c0-1,0.81-1.8,1.8-1.8h8.86c1,0,1.8,0.81,1.8,1.8v11.26
        C29.77,44.69,28.96,45.5,27.97,45.5z"/>
      <path d="M20.87,5.99L10.65,20.2c-0.68,0.94,0,2.25,1.15,2.25h23.48c1.16,0,1.83-1.31,1.15-2.25L26.21,5.99
        C24.9,4.17,22.18,4.17,20.87,5.99z"/>
    </svg>
    `
  }

  const mapData = [
    {
      name: 'one',
      width: 16,
      height: 12,
      iWidth: 30,
      iHeight: 20,
      cellD: 'auto',
      portal:[
        {
          name: 'untitled',
          cell: [5,6],
          dire: 'down',
          exit: ''
        }
      ],
      exclude: [35],
      map: 'vvvvvbbvvvvvvvvvvvvvvvvvvvvvvvvwwwwbbwwwwwwwwwwwwwwwwwwwwwwvvwbbbbbbbbbbbbbbbbbtbbbbbbbbwvvwbbbbbbbbbbbbtbbbbbbbbbbbtbwvvwbbtbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbtbbbbbbbwvvwbbbbbbtbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbtbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbtbbbtbbbbbbbbtbbbbbbbbbbbwvvwbbbbbbbbbbtbbbbbbbbtbbbbbbwvvwbbtbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbvwbbbbbbbbbbbbbbbbbbbbbbbtbbbbvwbtbbbbbtbbbbbbbbbbbbtbbbbbwvvwbbbbbbbbbbbbbbtbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwwwwwwwwwwwwwwwwwwwwwwwwwwwwvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
    },
    {
      name: 'two',
      width: 20,
      height: 10,
      iWidth: 40,
      iHeight: 30,
      cellD: 'auto',
      portal:[
        {
          name: 'untitled',
          cell: [1179,1178,1180],
          dire: 'up'
        }
      ],
      exclude: [1179],
      map: 'vvvvvvvvvvvvvvvvvvbbbvvvvvvvvvvvvvvvvvvvvwwwwwwwwwwwwwwwwwbbbwwwwwwwwwwwwvvvvvvvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvtvvvvvwbbbbbbbbbbbtbbbbbbbbbbbbbbbbbbwvvvvvvvvwbbbbbbtbbbbbbbbbbbbbbbbbbbtbbbwvvvvvtvvwbbtbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvwbbbbbbbbbbbbbbbbbbtbbtbbbbbbbbwwwwwwwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbtbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbtbbwvvwbbbbbbtbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbtbbbbbbbbbbbbbbbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbtbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbboooooooobbtbbwvvwbbbbbbbbbbbbbbbbbbbbbbboooooooobbbbbwvvwbbbtbbbbbbbbtbbbbbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbtbbbbbbbbbbbbbbbbbbbbbbbbbtbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwwwwwwwwwwwwwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvvvvvvvwbbbbtbbbbtbbbbbbbbbtbbbbwvvvvtvvvvtvvvvwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvvvvvvvwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvtvvvvvvvwbtbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvvvvvtvwbbbbbbbbbbbbtbbbtbbtbbbbwvvvvvvvvvvvvvvwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvtvvvvvtvvvwwwwwbbbwwwwwwwwwwwwwwwwwwvvvvvvvvvvvvvvvvvvvbbbvvvvvvvvvvvvvvvvvvv'
    },
    {
      name: 'three',
      width: 8,
      height: 6,
      iWidth: 18,
      iHeight: 14,
      cellD: 40,
      portal:[
        {
          name: 'untitled',
          cell: [242,241,243],
          dire: 'up'
        }
      ],
      exclude: [242],
      map: 'vvvvvvvvvvvvvvvvvvvwwwwwwwwwwwwwwwwvvwbooobbbbbbooobwvvwbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbwvvwbobbbbbbbbbbobwvvwbobbbbbbbbbbobwvvwbobbbbbbbbbbobwvvwbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbwvvwbooobbbbbbooobwvvwwwwwwbbbwwwwwwwvvvvvvvvbbbvvvvvvvv'
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
  // const indicator = document.querySelector('.indicator')

  let locationIndex = 0

  let height
  let width
  let iHeight
  let iWidth
  let locationPos 
  let start
  let cellD 
  let minicellD 
  let spritePos 
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
  }

  
  //! center of the map
  // const startLocationPos = (w,h)=> {
  //   return ((w) * (h / 2)) - (w / 2) - 1
  // }


  const placeInCenterOfMap = () =>{
    start = Math.floor((width * height) / 2) - Math.floor((width / 2)) - 1
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

  const setSpritePos = num =>{
    spritePos = num
    sprite.style.marginLeft = `${spritePos}px`
  }

  const positionSprite = pos =>{
    const paraX = pos % width * cellD
    const paraY = Math.floor(pos / width) * cellD
    spriteContainer.style.left = `${paraX}px`
    spriteContainer.style.top = `${paraY}px`
  }
  

  const noWall = pos =>{
    // return !mapImageTiles[pos].classList.contains('w') && 
    //        !mapImageTiles[pos].classList.contains('v')
    return mapImageTiles[pos].classList.contains('b')
  }

  const setUpWalls = target =>{
    target.forEach((tile,i)=>{
      // if (mapData[locationIndex].map[i]==='w') tile.classList.add('wall')
      tile.classList.add(mapData[locationIndex].map[i])
      if (mapData[locationIndex].map[i] === 't' ||
          mapData[locationIndex].map[i] === 'w') tile.innerHTML = tree()
    })
  }
  
  const turnSprite = e => {
    let m = -cellD
    const dire = ['right','left','up','down']
    const spriteChange = [
      ()=> m = spritePos === m * 9 ? m * 8 : m * 9,
      ()=> m = spritePos === m * 6 ? m * 7 : m * 6,
      ()=> m = spritePos === m * 3 ? m * 5 : m * 3,
      ()=> m = spritePos === m * 0 ? m * 2 : m * 0
    ]
    spriteChange[dire.indexOf(e)]()
    setSpritePos(m)
  }
  

  //! something like this to transport the bear to the particular portal.
  // const transport = target => {
  //   locationIndex = //!set new location
  //   setLocation(locationIndex)

  //   locationPos = mapData[locationIndex].portal[0].cell[0]//!needs to be set

  //   placeInCenterOfMap()
  //   resize(mapData[locationIndex].cellD)//!needs to be set
  //   setUpWalls(mapImageTiles)
  //   setUpWalls(locationTiles)
  //   turnSprite()//! neeed to be set
  // }


  const spriteWalk = e =>{
    if (!e) return
  
    locationTiles[locationPos].classList.remove('mark')
    const direction = e.key ? e.key.toLowerCase().replace('arrow','') : e
    turnSprite(direction)

    switch (direction) {
      case 'right': 
        if (noWall(locationPos + 1)){
          setX(x - cellD)
          locationPos += 1
        }
        break
      case 'left': 
        if (noWall(locationPos - 1)){
          setX(x + cellD)
          locationPos -= 1
        }
        break
      case 'up': 
        if (noWall(locationPos - iWidth)){
          setY(y + cellD)
          locationPos -= iWidth
        }
        break
      case 'down': 
        if (noWall(locationPos + iWidth)){
          setY(y - cellD)
          locationPos += iWidth
        }    
        break
      default:
        console.log('invalid command')
    }
    locationTiles[locationPos].classList.add('mark')


    
    //*indicator
    // const dataX = mapImageTiles[locationPos].dataset.x
    // const dataY = mapImageTiles[locationPos].dataset.y
    // indicator.innerHTML = `x:${x} y:${y} pos:${locationTiles[locationPos].dataset.index} dataX:${dataX} dataY:${dataY}`

    // console.log(
    //   'cellD',cellD,
    //   'dataX',dataX,
    //   'dataY',dataY,
    //   'x',x,
    //   'y',y,
    //   'los',locationPos
    //   )
  }


  //* key control
  window.addEventListener('keydown', spriteWalk)


  
  const resize = option =>{    　
    let pWidth = 800
    if (wrapper.offsetWidth < 800) {
      pWidth = wrapper.offsetWidth
    } 

    //! this bit can be commented out to keep cellDConsistent
    cellD = option === 'auto'
    ? Math.floor(pWidth / width)
    : option
    positionSprite(start)

    //* update offset margins
    const dataX = mapImageTiles[locationPos].dataset.x
    const dataY = mapImageTiles[locationPos].dataset.y
    const xMargin = dataX * -cellD + ((Math.floor(width / 2) - 1) * cellD)
    const yMargin = dataY * -cellD + ((Math.floor(height / 2) - 1) * cellD) 
    setX(xMargin)  
    setY(yMargin)


    //* adjust sprite
    setSpritePos(-cellD)
    sprite.style.height = `${cellD}px`
    sprite.style.width = `${cellD * 10}px`
    spriteContainer.style.height = `${cellD}px`
    spriteContainer.style.width = `${cellD}px`

    //* resize mapImageContainer
    adjustRectSize(mapImageContainer,width,height,cellD)
    
    //* resize map
    adjustRectSize(map,width,height,cellD,mapTiles)
    
    //* setup location indicator
    minicellD = Math.floor(cellD / 8)
    adjustRectSize(location,iWidth,iHeight,minicellD,locationTiles)
    locationTiles[locationPos].classList.add('mark')
  
    //* setup map image
    adjustRectSize(mapImage,iWidth,iHeight,cellD,mapImageTiles)
    
    //* setup mapcover
    adjustRectSize(mapCover,width,height,cellD)
  }


  window.addEventListener('resize', ()=>resize(mapData[locationIndex].cellD))
  setLocation(locationIndex)
  // locationPos = startLocationPos(iWidth,iHeight)
  locationPos = mapData[locationIndex].portal[0].cell[0]
  placeInCenterOfMap()
  resize('auto')
   //* setup walls
  setUpWalls(mapImageTiles)
  setUpWalls(locationTiles)
  turnSprite(mapData[locationIndex].portal[0].dire)


  const toggleLocation = e =>{
    locationIndex = e.target.dataset.index
    setLocation(locationIndex)

    locationPos = mapData[locationIndex].portal[0].cell[0]
    console.log('t',mapData[locationIndex].portal[0].dire)
    placeInCenterOfMap()
    resize(mapData[locationIndex].cellD)
    setUpWalls(mapImageTiles)
    setUpWalls(locationTiles)
    turnSprite(mapData[locationIndex].portal[0].dire)
  }


  buttons.forEach(button=>{
    button.addEventListener('click',(e)=>toggleLocation(e))
  })



}

window.addEventListener('DOMContentLoaded', init)



