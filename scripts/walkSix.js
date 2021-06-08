

//*maybe design maps first.
//*add logic to trigger event when facing particular direction and at a location.

//!change resize logic to keep cellsize consistent? - and instead change height and width
//! events can be triggered by combination of where the bear is, and dataset.index
//! add transition effect for when the map changes (blank, then appear again, maybe another cover)
//! some event to be triggered dependant on state (action button, like A to speak, X in playstation)

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

  const entryPoints = [
    {
      portal: 1,
      name: 'untitled',
      cell: 35,
      dire: 'down',
    },
    {
      portal: 2,
      name: 'untitled',
      cell: 1139,
      dire: 'up'
    },
    {
      portal: 3,
      name: 'untitled',
      cell: 224,
      dire: 'up'
    }
  ]

  const events = [
    transport,
  ]

  const mapData = [
    {
      name: 'one',
      iWidth: 30,
      iHeight: 20,
      events: [
        '5_0-3',
        '6_0-3'
      ],
      portal:[
        {
          name: 'untitled',
          cell: [5,6],
          dire: 'down',
          exit: ''
        }
      ],
      map: 'vvvvvbbvvvvvvvvvvvvvvvvvvvvvvvvwwwwbbwwwwwwwwwwwwwwwwwwwwwwvvwbbbbbbbbbbbbbbbbbtbbbbbbbbwvvwbbbbbbbbbbbbtbbbbbbbbbbbtbwvvwbbtbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbtbbbbbbbwvvwbbbbbbtbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbtbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbtbbbtbbbbbbbbtbbbbbbbbbbbwvvwbbbbbbbbbbtbbbbbbbbtbbbbbbwvvwbbtbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbvwbbbbbbbbbbbbbbbbbbbbbbbtbbbbvwbtbbbbbtbbbbbbbbbbbbtbbbbbwvvwbbbbbbbbbbbbbbtbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwwwwwwwwwwwwwwwwwwwwwwwwwwwwvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
    },
    {
      name: 'two',
      iWidth: 40,
      iHeight: 30,
      events: [
        '1178_0-1',
        '1179_0-1',
        '1180_0-1'
      ],
      portal:[
        {
          name: 'untitled',
          cell: [1179,1178,1180],
          dire: 'up'
        }
      ],
      map: 'vvvvvvvvvvvvvvvvvvbbbvvvvvvvvvvvvvvvvvvvvwwwwwwwwwwwwwwwwwbbbwwwwwwwwwwwwvvvvvvvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvtvvvvvwbbbbbbbbbbbtbbbbbbbbbbbbbbbbbbwvvvvvvvvwbbbbbbtbbbbbbbbbbbbbbbbbbbtbbbwvvvvvtvvwbbtbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvwbbbbbbbbbbbbbbbbbbtbbtbbbbbbbbwwwwwwwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbtbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbtbbwvvwbbbbbbtbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbtbbbbbbbbbbbbbbbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbtbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbboooooooobbtbbwvvwbbbbbbbbbbbbbbbbbbbbbbboooooooobbbbbwvvwbbbtbbbbbbbbtbbbbbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbtbbbbbbbbbbbbbbbbbbbbbbbbbtbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwwwwwwwwwwwwwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvvvvvvvwbbbbtbbbbtbbbbbbbbbtbbbbwvvvvtvvvvtvvvvwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvvvvvvvwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvtvvvvvvvwbtbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvvvvvtvwbbbbbbbbbbbbtbbbtbbtbbbbwvvvvvvvvvvvvvvwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvtvvvvvtvvvwwwwwbbbwwwwwwwwwwwwwwwwwwvvvvvvvvvvvvvvvvvvvbbbvvvvvvvvvvvvvvvvvvv'
    },
    {
      name: 'three',
      iWidth: 18,
      iHeight: 14,
      events: [
        '241_0-2',
        '242_0-2',
        '243_0-2'
      ],
      portal:[
        {
          name: 'untitled',
          cell: [242,241,243],
          dire: 'up'
        }
      ],
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

  let mapIndex = 1
  let height
  let width
  let iHeight
  let iWidth
  let locationPos 
  let start
  let cellD = 40
  let minicellD 
  let spritePos 
  let x 
  let y 
  let mapTiles
  let locationTiles
  let mapImageTiles


  const setWidthAndHeight = ()=>{
    let pWidth = 800
    if (wrapper.offsetWidth < 800) pWidth = wrapper.offsetWidth
    width = 2 * Math.floor((pWidth / cellD) / 2)
    let pHeight = 600
    if (wrapper.offsetHeight < 600) pHeight = wrapper.offsetWidth
    height = 2 * Math.floor((pHeight / cellD) / 2)
  }

  const setLocation = index => {
    mapIndex = index - 1
    setWidthAndHeight()

    iHeight = mapData[mapIndex].iHeight
    iWidth = mapData[mapIndex].iWidth
    location.innerHTML = mapMap(iWidth,iHeight,'location_indicator_tile')
    locationTiles = document.querySelectorAll('.location_indicator_tile')
    mapImage.innerHTML = mapMap(iWidth,iHeight,'map_image_tile')
    mapImageTiles = document.querySelectorAll('.map_image_tile')

    mapData[mapIndex].events.forEach(cell=>{
      mapImageTiles[+cell.split('_')[0]].setAttribute('data-event',cell.split('_')[1])
    })
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
    if (!mapImageTiles[pos]) return false
    return mapImageTiles[pos].classList.contains('b')
  }

  const setUpWalls = target =>{
    target.forEach((tile,i)=>{
      // if (mapData[mapIndex].map[i]==='w') tile.classList.add('wall')
      tile.classList.add(mapData[mapIndex].map[i])
      if (mapData[mapIndex].map[i] === 't' ||
          mapData[mapIndex].map[i] === 'w') tile.innerHTML = tree()
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



  function transport(index){
    const entryPoint = entryPoints.find(i=>i.portal === index)
    setLocation(entryPoint.portal)
    locationPos = entryPoint.cell

    setWidthAndHeightAndResize()
    setUpWalls(mapImageTiles)
    setUpWalls(locationTiles)
    turnSprite(entryPoint.dire)
  }
  

  // const toggleLocation = e =>{
  //   setLocation(e.target.dataset.index)

  //   locationPos = mapData[mapIndex].portal[0].cell[0]
  //   // console.log('t',mapData[mapIndex].portal[0].dire)
  //   placeInCenterOfMap()
  //   resize()
  //   setUpWalls(mapImageTiles)
  //   setUpWalls(locationTiles)
  //   turnSprite(mapData[mapIndex].portal[0].dire)
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
    
    //! add logic to check which way the bear is facing?
    //! some event to be triggered dependant on state (action button, like A to speak, X in playstation)
    if (mapImageTiles[locationPos].dataset.event) {
      const event = +mapImageTiles[locationPos].dataset.event.split('-')[0]
      const index = +mapImageTiles[locationPos].dataset.event.split('-')[1]
      console.log(event,index)
      events[event](index)
    } 
  }


  //* key control
  window.addEventListener('keydown', spriteWalk)


  
  const resize = () =>{    　
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
    map.innerHTML = mapMap(width,height,'map_tile')
    mapTiles = document.querySelectorAll('.map_tile')
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
  
  const setWidthAndHeightAndResize = () =>{
    setWidthAndHeight()
    placeInCenterOfMap()
    resize()
  }

  window.addEventListener('resize', setWidthAndHeightAndResize)
  setLocation(mapIndex)
  locationPos = mapData[mapIndex].portal[0].cell[0]
  placeInCenterOfMap()
  resize()
   //* setup walls
  setUpWalls(mapImageTiles)
  setUpWalls(locationTiles)
  turnSprite(mapData[mapIndex].portal[0].dire)



  // events[0] = transport

  // buttons.forEach(button=>{
  //   button.addEventListener('click',(e)=>toggleLocation(e))
  // })
  buttons[0].addEventListener('click',()=>events[0](1))
  buttons[1].addEventListener('click',()=>events[0](2))
  buttons[2].addEventListener('click',()=>events[0](3))

}

window.addEventListener('DOMContentLoaded', init)



