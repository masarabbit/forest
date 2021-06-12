

//*maybe design maps first.

//! temporal solution for image display added, but 

function init() {

  const avatars = {
    avatar: {
      sprite: `
      <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 87.64 87.64">
        <ellipse cx="43.82" cy="43.82" rx="28.191" ry="38.099"/>
      </svg>`,
      motion: 'udlr',
      speed: 5000
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
      text: [
        'hello! I\'m a tree!',
        'yeah!'
    ],
      art: 'http://masahito.co.uk/img/icecream_bunny.png',
      item: null,
      direction: 'up'
    },
    bunny1:{
      text: ['hello! Bunny!'],
      item: null,
      direction: 'left'
    },
    hello:{ text: ['hello!']},
    tomato:{
      text: [
        'hello!',
        'yeah!'
      ]
    },
    apple:{
      text: [
        'hello!',
        'yeah!'
      ]
    }
  }


  const entryPoints = {
    start: {
      map: 1,
      cell: 313,
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

  const events = {   //! perhaps another event can be added for displaying image?
    transport: transport,
    check: ()=>null
  }
    

  const mapData = [
    {
      name: 'one',
      iWidth: 30,
      iHeight: 20,
      characters: [
        '155_avatar_0_hello',
        '156_avatar_0_apple',
        '311_avatar_0_tomato'
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
        '779_avatar_0_hello'
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
        '135_avatar_9_hello',
        '101_avatar_6_hello',
        '165_avatar_3_hello'
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


  const transitionCover = document.querySelector('.transition_cover')
  const wrapper = document.querySelector('.wrapper')
  const map = document.querySelector('.map')
  const mapImageContainer = document.querySelector('.map_image_container')
  const mapCover = document.querySelector('.map_cover')
  const mapImage = document.querySelector('.map_image')
  const location = document.querySelector('.location_indicator')
  const spriteContainer = document.querySelector('.sprite_container')
  const text = document.querySelector('.text')
  const sprite = document.querySelector('.sprite')
  let sprites
  // const indicator = document.querySelector('.indicator')
  

  //* map related variables
  let height
  let width
  let iHeight
  let iWidth
  let start
  let cellD = 40
  let minicellD 
  let x 
  let y 
  let mapTiles
  let locationTiles
  let mapImageTiles

  //* gameplay related variables
  let mapIndex = 1
  // let motion = true
  const spawnData = []
  const bear = {
    spritePos: null,
    facingDirection: 'down',
    pos: null,
    motion: true,
    textCount: 0
  }

  const directionKey = {
    9: 'right',
    6: 'left',
    3: 'up',
    0: 'down',
  }

  const talk = () => {
    const key = { right: 1, left: -1, up: -iWidth, down: iWidth }
    spawnData.forEach((actor,i)=>{
      if (actor.pos === bear.pos + key[bear.facingDirection]) {
        actor.pause = true
        const opposite = Object.keys(key).find(k => key[k] === key[bear.facingDirection] * -1)
        turnSprite(opposite,actor,sprites[i])
        console.log('t',eventPoints[actor.event])
        displayText(bear.textCount,eventPoints[actor.event])
      }
    })
  }


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
  // const startbear.pos = (w,h)=> {
  //   return ((w) * (h / 2)) - (w / 2) - 1
  // }


  
  const spawnWalk = (actor,para,m,s) =>{
    // if (!actor) return
    actor[para] += m
    s.style[para]= `${actor[para]}px`
  }
  

  const spawnMotion = (s,i) =>{
    if (spawnData[i].pause) return
    const motionOption = [
      ()=>spriteWalk('down',spawnData[i],sprites[i],s),
      ()=>spriteWalk('right',spawnData[i],sprites[i],s),
      ()=>spriteWalk('up',spawnData[i],sprites[i],s),
      ()=>spriteWalk('left',spawnData[i], sprites[i],s)
    ]
    motionOption[Math.floor(Math.random() * 4)]()
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
        <div class=${classToAdd} data-index=${i} data-x=${dataX} data-y=${dataY}>
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
    mapImage.style.left = `${x}px`
  }

  const setY = num =>{
    y = num
    mapImage.style.top = `${y}px`
  }

  const setSpritePos = (num,actor,s) =>{
    actor.spritePos = num
    s.style.marginLeft = `${num}px`
  }

  const positionSprite = pos =>{
    const paraX = pos % width * cellD
    const paraY = Math.floor(pos / width) * cellD
    spriteContainer.style.left = `${paraX}px`
    spriteContainer.style.top = `${paraY}px`
  }
  

  const noWall = pos =>{    
    if (!mapImageTiles[pos] || bear.pos === pos || spawnData.filter(s=>s.pos === pos).length) return false
    return mapImageTiles[pos].classList.contains('b')
  }

  const setUpWalls = target =>{
    target.forEach((tile,i)=>{
      tile.classList.add(mapData[mapIndex].map[i])
      if (mapData[mapIndex].map[i] === 't' ||
          mapData[mapIndex].map[i] === 'w') tile.innerHTML = tree()
    })
  }
  

  const spawnCharacter = () =>{
    if (spawnData.length) spawnData.forEach(m=>clearInterval(m.interval))
    spawnData.length = 0

    mapData[mapIndex].characters.forEach((c,i)=>{
      const pos = +c.split('_')[0]
      const sx = Math.floor(pos % iWidth) * cellD
      const sy = Math.floor(pos / iWidth) * cellD
      spawnData[i] = {
        interval: null,
        spritePos: +c.split('_')[2],
        event: c.split('_')[3],
        // pause: false,
        left: sx,
        top: sy,
        pos,
      }
      const spawn = document.createElement('div')
      // spawn.innerHTML = avatars[c.split('_')[1]].sprite
      spawn.innerHTML = spriteContainer.innerHTML
      spawn.classList.add('spawn')
      spawn.style.left = `${sx}px`
      spawn.style.top = `${sy}px`
      spawn.style.fill = randomColor()
      mapImage.appendChild(spawn)    
      spawnData[i].interval = setInterval(()=>spawnMotion(spawn,i),avatars[c.split('_')[1]].speed)
    })

    sprites = document.querySelectorAll('.sprite')
    sprites.forEach((s,i)=>{
      if (i === sprites.length - 1) return
      turnSprite(directionKey[spawnData[i].spritePos],spawnData[i],s)
    })
  }


  const turnSprite = (e = 'down',actor,s) => {
    let m = -cellD
    actor.facingDirection = e
    const spriteChange = {
      right: ()=> m = actor.spritePos === m * 9 ? m * 8 : m * 9,
      left: ()=> m = actor.spritePos === m * 6 ? m * 7 : m * 6,
      up: ()=> m = actor.spritePos === m * 3 ? m * 5 : m * 3,
      down: ()=> m = actor.spritePos === m * 0 ? m * 2 : m * 0
    }
    spriteChange[e]()
    setSpritePos(m,actor,s)
  }

  const transition = () =>{
    transitionCover.classList.add('transition')
    bear.motion = false
    setTimeout(()=>{
      transitionCover.classList.remove('transition')
      bear.motion = true
    },500)
  }

  const displayTextGradual = (t,i) =>{
    text.innerText = t.slice(0,i)
    if (i < t.length) {
      setTimeout(()=>{
        displayTextGradual(t, i + 1)
      },30)
    }
  }

  const displayText = (count,eventPoint) =>{
    if (count < eventPoint.text.length){
      bear.textCount++
      bear.motion = false
      displayTextGradual(eventPoint.text[count],0)
      if (eventPoint.art) transitionCover.innerHTML = `
        <div>
          <img src=${eventPoint.art} />
        </div>
      `
      return
    }
      bear.textCount = 0
      bear.motion = true
      text.innerText = ''
      transitionCover.innerHTML = ''
  }

  function check(count){
    if (mapImageTiles[bear.pos].dataset.event) {
      index = mapImageTiles[bear.pos].dataset.event.split('-')[1]
      const eventPoint = eventPoints[index]
      if (bear.facingDirection !== eventPoint.direction) return 
      displayText(count,eventPoint)
    }
    talk()
  }

  function transport(index){
    transition()
    const entryPoint = entryPoints[index]
    setLocation(entryPoint.map)
    bear.pos = entryPoint.cell
    setWidthAndHeightAndResize()
    setUpWalls(mapImageTiles)
    setUpWalls(locationTiles)
    turnSprite(entryPoint.direction,bear,sprite)
    spawnCharacter()
  }
  

  const spriteWalk = (e,actor,sprite, s=undefined) =>{
    if (!e || !bear.motion) return
    if (!s) locationTiles[actor.pos].classList.remove('mark')
    const direction = e.key ? e.key.toLowerCase().replace('arrow','') : e
    
    switch (direction) {
      case 'right': if (noWall(actor.pos + 1)){
          s ? spawnWalk(actor,'left',cellD,s) : setX(x - cellD)
          actor.pos += 1 } break
      case 'left': if (noWall(actor.pos - 1)){
          s ? spawnWalk(actor,'left',-cellD,s) : setX(x + cellD)
          actor.pos -= 1 } break
      case 'up': if (noWall(actor.pos - iWidth)){
          s ? spawnWalk(actor,'top',-cellD,s) : setY(y + cellD)
          actor.pos -= iWidth } break
      case 'down': if (noWall(actor.pos + iWidth)){
          s ? spawnWalk(actor,'top',cellD,s) : setY(y - cellD)
          actor.pos += iWidth } break
      default: console.log('invalid command')
        return
    }
    turnSprite(direction,actor,sprite)
    if (!s) locationTiles[actor.pos].classList.add('mark')

    if (!s && mapImageTiles[bear.pos].dataset.event) {
      const event = mapImageTiles[bear.pos].dataset.event.split('-')[0]
      const index = mapImageTiles[bear.pos].dataset.event.split('-')[1]
      events[event](index)
    } 

    //*indicator
    // const dataX = mapImageTiles[bear.pos].dataset.x
    // const dataY = mapImageTiles[bear.pos].dataset.y
    // indicator.innerHTML = `x:${x} y:${y} pos:${locationTiles[bear.pos].dataset.index} dataX:${dataX} dataY:${dataY}`

    // console.log(
    //   'cellD',cellD,
    //   'dataX',dataX,
    //   'dataY',dataY,
    //   'x',x,
    //   'y',y,
    //   'los',bear.pos
    //   )
  
  }

  const handleKeyAction = e =>{
    if (e.key.toLowerCase() === 'l') {
      check(bear.textCount)
      return
    }
    spriteWalk(e, bear, sprites[sprites.length - 1])
  }


  //* key control
  window.addEventListener('keydown', (e)=>handleKeyAction(e))

  
  

  const resize = () =>{    　
    positionSprite(start)

    //* update offset margins
    const dataX = mapImageTiles[bear.pos].dataset.x
    const dataY = mapImageTiles[bear.pos].dataset.y
    const xMargin = dataX * -cellD + ((Math.floor(width / 2) - 1) * cellD)
    const yMargin = dataY * -cellD + ((Math.floor(height / 2) - 1) * cellD) 
    setX(xMargin)  
    setY(yMargin)

    //* adjust sprite
    setSpritePos(-cellD,bear,sprite)
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
    locationTiles[bear.pos].classList.add('mark')
  
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


  buttons[0].addEventListener('click',()=>events['transport']('portal1'))
  buttons[1].addEventListener('click',()=>events.transport('portal2'))
  buttons[2].addEventListener('click',()=>events.transport('portal3'))

}

window.addEventListener('DOMContentLoaded', init)


