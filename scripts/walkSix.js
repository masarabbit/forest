

//*maybe design maps first.


function init() {

  const avatars = {
    avatar: {
      sprite: `
      <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 87.64 87.64">
        <ellipse cx="43.82" cy="43.82" rx="28.191" ry="38.099"/>
      </svg>`,
      motion: 'udlr'
      }   
    }

  const randomColor = () =>{
    const r=()=> Math.ceil(Math.random() * 255)
    return `rgb(${r()},${r()},${r()})`
  }

  const tree = () => {
    return `
    <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 45.5 45.5" fill="${randomColor()}">
      <path d="M22.32,13.11L7.46,33.18c-0.74,1-0.03,2.42,1.22,2.42H38.4c1.25,0,1.96-1.42,1.22-2.42L24.76,13.11
        C24.15,12.29,22.93,12.29,22.32,13.11z"/>
      <path d="M27.97,45.5h-8.86c-1,0-1.8-0.81-1.8-1.8V32.43c0-1,0.81-1.8,1.8-1.8h8.86c1,0,1.8,0.81,1.8,1.8v11.26
        C29.77,44.69,28.96,45.5,27.97,45.5z"/>
      <path d="M20.87,5.99L10.65,20.2c-0.68,0.94,0,2.25,1.15,2.25h23.48c1.16,0,1.83-1.31,1.15-2.25L26.21,5.99
        C24.9,4.17,22.18,4.17,20.87,5.99z"/>
    </svg>
    `
  }

  const eventPoints = {
    tree1:{
      text: 'hello! I\m a tree!',
      item: null,
      direction: 'up'
    },
    bunny1:{
      text: 'hello! Bunny!',
      item: null,
      direction: 'left'
    }
  }


  const entryPoints = {
    start: {
      map: 1,
      // cell: 313,
      cell: 35,
      // direction: 'down',
    },
    portal1:{
      map: 1,
      name: 'untitled',
      cell: 35,
      direction: 'down',
    },
    portal2:{
      map: 2,
      name: 'untitled',
      cell: 1139,
      direction: 'up'
    },
    portal3:{
      map: 3,
      name: 'untitled',
      cell: 224,
      direction: 'up'
    },
  }

  const events = {
    transport: transport,
    check: ()=>null
  }
    

  const mapData = [
    {
      name: 'one',
      iWidth: 30,
      iHeight: 20,
      characters: [
        '155_avatar',
        '163_avatar',
        '311_avatar'
      ],
      events: [
        '5_transport-portal3',
        '6_transport-portal3'
      ],
      map: 'vvvvvbbvvvvvvvvvvvvvvvvvvvvvvvvwwwwbbwwwwwwwwwwwwwwwwwwwwwwvvwbbbbbbbbbbbbbbbbbtbbbbbbbbwvvwbbbbbbbbbbbbtbbbbbbbbbbbtbwvvwbbtbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbtbbbbbbbwvvwbbbbbbtbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbtbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbtbbbtbbbbbbbbtbbbbbbbbbbbwvvwbbbbbbbbbbtbbbbbbbbtbbbbbbwvvwbbtbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbvwbbbbbbbbbbbbbbbbbbbbbbbtbbbbvwbtbbbbbtbbbbbbbbbbbbtbbbbbwvvwbbbbbbbbbbbbbbtbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwwwwwwwwwwwwwwwwwwwwwwwwwwwwvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
    },
    {
      name: 'two',
      iWidth: 40,
      iHeight: 30,
      characters: [
        '779_avatar'
      ],
      events: [
        '1178_transport-portal1',
        '1179_transport-portal1',
        '1180_transport-portal1'
      ],
      map: 'vvvvvvvvvvvvvvvvvvbbbvvvvvvvvvvvvvvvvvvvvwwwwwwwwwwwwwwwwwbbbwwwwwwwwwwwwvvvvvvvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvtvvvvvwbbbbbbbbbbbtbbbbbbbbbbbbbbbbbbwvvvvvvvvwbbbbbbtbbbbbbbbbbbbbbbbbbbtbbbwvvvvvtvvwbbtbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvwbbbbbbbbbbbbbbbbbbtbbtbbbbbbbbwwwwwwwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbtbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbtbbwvvwbbbbbbtbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbtbbbbbbbbbbbbbbbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbtbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbboooooooobbtbbwvvwbbbbbbbbbbbbbbbbbbbbbbboooooooobbbbbwvvwbbbtbbbbbbbbtbbbbbbbbbboooooooobbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwbbbbbbbtbbbbbbbbbbbbbbbbbbbbbbbbbtbbwvvwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwvvwwwwwwwwwwwwwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvvvvvvvwbbbbtbbbbtbbbbbbbbbtbbbbwvvvvtvvvvtvvvvwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvvvvvvvwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvvvtvvvvvvvwbtbbbbbbbbbbbbbbbbbbbbbbwvvvvvvvvvvvvtvwbbbbbbbbbbbbtbbbtbbtbbbbwvvvvvvvvvvvvvvwbbbbbbbbbbbbbbbbbbbbbbbbwvvvvtvvvvvtvvvwwwwwbbbwwwwwwwwwwwwwwwwwwvvvvvvvvvvvvvvvvvvvbbbvvvvvvvvvvvvvvvvvvv'
    },
    {
      name: 'three',
      iWidth: 18,
      iHeight: 14,
      characters: [
        '135_avatar'
      ],
      events: [
        '241_transport-portal2',
        '242_transport-portal2',
        '243_transport-portal2',
        '44_check-tree1',
        '112_check-bunny1'
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

  // const stage = document.querySelector('.stage')
  const transitionCover = document.querySelector('.transition_cover')
  const wrapper = document.querySelector('.wrapper')
  const map = document.querySelector('.map')
  const mapImageContainer = document.querySelector('.map_image_container')
  const mapCover = document.querySelector('.map_cover')
  const mapImage = document.querySelector('.map_image')
  const location = document.querySelector('.location_indicator')
  const spriteContainer = document.querySelector('.sprite_container')
  const sprite = document.querySelector('.sprite')
  // const indicator = document.querySelector('.indicator')
  

  //* map related variables
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

  //* gameplay related variables
  let mapIndex = 1
  let motion = true
  let facingDirection = 'down'
  const spawnData = []
  let motionInterval
  let spawns

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

  const spawnWalk = (spawn,i,x,y) =>{
    // console.log(spawn,i,x,y)
    console.log('x')
    spawn.style.left = `${spawnData[i].left + x}px`
    spawn.style.top = `${spawnData[i].top + y}px`
  }

  const spawnMotion = () =>{
    console.log('test')
    
    spawns.forEach((spawn,i)=>{ 
      // const motionOption = [
      //   spawnWalk(spawn,i,0,40),
      //   spawnWalk(spawn,i,40,0),
      //   spawnWalk(spawn,i,0,-40),
      //   spawnWalk(spawn,i,-40,0)
      // ]
      // motionOption[Math.ceil(Math.random() * 4)]
      spawnWalk(spawn,i,-40,0)
    })
  }



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

  const spawnCharacter = () =>{
    clearInterval(motionInterval)
    spawnData.length = 0
    mapData[mapIndex].characters.forEach((c,i)=>{
      // console.log('trigger',target,c)
      
      const sx = Math.floor(c.split('_')[0] / mapData[mapIndex].iWidth) * cellD
      const sy = Math.floor(c.split('_')[0] % mapData[mapIndex].iWidth) * cellD
      spawnData[i] = {}
      spawnData[i].left = sx
      spawnData[i].top = sy

      const spawn = document.createElement('div')
      spawn.innerHTML = avatars[c.split('_')[1]].sprite
      spawn.classList.add('spawn')
      spawn.style.left = `${sx}px`
      spawn.style.top = `${sy}px`
      mapImage.appendChild(spawn)
    })
    
    console.log(spawnData)
    spawns = document.querySelectorAll('.spawn')
    motionInterval = setInterval(()=>{
      spawnMotion()
    },2000)
  }

  const turnSprite = (e = 'down') => {
    let m = -cellD
    const direction = ['right','left','up','down']
    facingDirection = e
    const spriteChange = [
      ()=> m = spritePos === m * 9 ? m * 8 : m * 9,
      ()=> m = spritePos === m * 6 ? m * 7 : m * 6,
      ()=> m = spritePos === m * 3 ? m * 5 : m * 3,
      ()=> m = spritePos === m * 0 ? m * 2 : m * 0
    ]
    spriteChange[direction.indexOf(e)]()
    setSpritePos(m)
  }

  const transition = () =>{
    transitionCover.classList.add('transition')
    motion = false
    setTimeout(()=>{
      transitionCover.classList.remove('transition')
      motion = true
    },500)
  }

  function check(){
    if (mapImageTiles[locationPos].dataset.event) {
      index = mapImageTiles[locationPos].dataset.event.split('-')[1]
      const eventPoint = eventPoints[index]
      if (facingDirection !== eventPoint.direction) return
      console.log('text',eventPoint.text) 
      //! maybe somekind of text box to be had, to display this text.
      // transitionCover.innerText = eventPoint.text
    } 
  }

  function transport(index){
    transition()
    // const entryPoint = entryPoints.find(i=>i.portal === index)
    const entryPoint = entryPoints[index]
    setLocation(entryPoint.map)
    locationPos = entryPoint.cell

    setWidthAndHeightAndResize()
    setUpWalls(mapImageTiles)
    setUpWalls(locationTiles)
    turnSprite(entryPoint.direction)
    spawnCharacter(mapImageTiles)
  }
  

  const spriteWalk = e =>{
    if (!e || !motion) return
    locationTiles[locationPos].classList.remove('mark')
    const direction = e.key ? e.key.toLowerCase().replace('arrow','') : e
    
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
        return
    }
    turnSprite(direction)
    locationTiles[locationPos].classList.add('mark')

    if (mapImageTiles[locationPos].dataset.event) {
      const event = mapImageTiles[locationPos].dataset.event.split('-')[0]
      const index = mapImageTiles[locationPos].dataset.event.split('-')[1]
      events[event](index)
    } 

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

  const handleKeyAction = e =>{
    if (e.key === 'l' || e.key === 'L') {
      check()
      return
    }
    spriteWalk(e)
  }


  //* key control
  window.addEventListener('keydown', (e)=>handleKeyAction(e))

  
  

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
  transport('start')
  // placeInCenterOfMap()
  // resize()




  // events[0] = transport

  buttons[0].addEventListener('click',()=>events['transport']('portal1'))
  buttons[1].addEventListener('click',()=>events.transport('portal2'))
  buttons[2].addEventListener('click',()=>events.transport('portal3'))

}

window.addEventListener('DOMContentLoaded', init)




  // const spawnCharacter = () =>{
  //   mapData[mapIndex].characters.forEach(c=>{
  //     const cx = mapImageTiles[c.split('_')[0]].getBoundingClientRect().x
  //     const cy = mapImageTiles[c.split('_')[0]].getBoundingClientRect().y
  //     const spawn = document.createElement('div')
  //     spawn.innerHTML = avatars[c.split('_')[1]].sprite
  //     spawn.classList.add('spawn')
  //     spawn.style.top = `${cx}px`
  //     spawn.style.left = `${cy}px`
  //     stage.appendChild(spawn)
  //   })
  // }
  