

//*maybe design maps first.
//! temporal solution for image display added, but 
//! add ways to decorate map further

//! design other avatars and map


function init() {
  
  //* stops intervals firing while window is inactive
  let windowActive
  window.addEventListener('focus', ()=> windowActive = true)
  window.addEventListener('blur', ()=> windowActive = false)

  const decode = arr =>{
    return arr.split('').map(c=>{
      if (c === 'D') return '<path d="M'
      if (c === 'F') return '<path fill="#fff" d="M'
      if (c === '/') return '/>'
      if (c === 'N') return '-1' 
      if (c === 'T') return '-2'
      return c
    }).join('')
  }

  const decompress = arr =>{
    const output = []
    arr.split(',').forEach(x=>{
      const letter = x.split('').filter(y=>y * 0 !== 0).join('')
      const repeat = x.split('').filter(y=>y * 0 === 0).join('')
      for (let i = 0; i < repeat; i++){
        output.push(letter)
      }
    })
    return output
  }

  const svgWrapper = (content, color, rotate, flip) =>{
    let scale = 1
    if (flip === 'h') scale = '-1, 1'
    if (flip === 'v') scale = '1, -1'
    return `<div class="svg_wrap" style="transform: rotate(${rotate}deg) scale(${scale});"><svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 16 16" fill="${color ? color : 'black'}">${content}</svg></div>`
  }


  const avatars = {
    avatar: {
      sprite: `
      <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 87.64 87.64">
        <ellipse cx="43.82" cy="43.82" rx="28.191" ry="38.099"/>
      </svg>`,
      motion: 'udlr',
      speed: 5000
      },
    bunny: {
      sprite: `D 4 0h2v1hTvN"/D 10 0h2v1hTvN"/D 20 0h2v1hTvN"/D 26 0h2v1hTvN"/D 36 0h2v1hTvN"/D 42 0h2v1hTvN"/D 52 0h2v1hTvN"/D 58 0h2v1hTvN"/D 70 0h2v1hTvN"/D 73 0h2v1hTvN"/D 86 0h2v1hTvN"/D 89 0h2v1hTvN"/D 102 0h2v1hTvN"/D 105 0h2v1hTvN"/D 3 1h1v4hNv-4"/>F 4 1h2v2hNv1h1vNh1v1h2vNh1vTh2v4hTv2h2vTh1v8hNv2hTvNhNvNhTvNhNv2hTvNhNv-8h1v-4"/D 6 1h1v2hNvT"/D 9 1h1v2hNvT"/D 12 1h1v4hNv-4"/D 19 1h1v4hNv-4"/>F 20 1h2v2hNv1h1vNh1v1h2vNh1vTh2v4hTv2h2vTh1v8hNv1hTvNh1vNh1v-3hTv2h1v1hNv1h-3vNhNv2hTvNhNv-8h1v-4"/D 22 1h1v2hNvT"/D 25 1h1v2hNvT"/D 28 1h1v4hNv-4"/D 35 1h1v4hNv-4"/>F 36 1h2v2h1v1h2vNh1vTh2v4h1v9hNv1hTvNhNvNh1vThNvNhTv1hNv2h1v1h-3vNhNv-8h1v-4"/D 38 1h1v2hNvT"/D 41 1h1v2hNvT"/D 44 1h1v4hNv-4"/D 51 1h1v4hNv-4"/>F 52 1h2v2h1v1h2vNh1vTh2v4h1v8hNv1h-3vNh1vThNvNhTv1hNv2h1v1h-3vNhNv-8h1v-4"/D 54 1h1v2hNvT"/D 57 1h1v2hNvT"/D 60 1h1v4hNv-4"/D 69 1h1v3hNv-3"/>F 70 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1h-3vNhNvNhNvNh1vNhNv1hNv1h1v1h1v2hTvNhNv-4hNvNh1vNhNvTh1vNh1v-3"/D 72 1h1v3hNv-3"/D 75 1h1v3hNv-3"/D 85 1h1v3hNv-3"/>F 86 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1hNv1hTvNhNv1hTvNhNv-4hNvNh1vNhNvTh1vNh1v-3"/D 88 1h1v3hNv-3"/D 91 1h1v3hNv-3"/D 101 1h1v3hNv-3"/>F 102 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1hNv1hTvThNvNhNvNh1vNhNv1hNv1h1v1h1v1h-3v-4hNvNh1vNhNvTh1vNh1v-3"/D 104 1h1v3hNv-3"/D 107 1h1v3hNv-3"/>F 5 3h1v1hNvN"/D 7 3h2v1hTvN"/>F 21 3h1v1hNvN"/D 23 3h2v1hTvN"/D 39 3h2v1hTvN"/D 55 3h2v1hTvN"/D 68 4h1v1hNvN"/D 76 4h1v1hNvN"/D 84 4h1v1hNvN"/D 92 4h1v1hNvN"/D 100 4h1v1hNvN"/D 108 4h1v1hNvN"/D 2 5h1v3hNv-3"/D 5 5h1v2hNvT"/D 10 5h1v2hNvT"/>F 11 5h1v2hNvT"/D 13 5h1v3hNv-3"/D 18 5h1v3hNv-3"/D 21 5h1v2hNvT"/D 26 5h1v2hNvT"/>F 27 5h1v2hNvT"/D 29 5h1v3hNv-3"/D 34 5h1v3hNv-3"/D 45 5h1v3hNv-3"/D 50 5h1v3hNv-3"/D 61 5h1v3hNv-3"/D 67 5h1v2h1v1hTv-3"/D 70 5h1v2hNvT"/D 77 5h1v3hNv-3"/D 83 5h1v2h1v1hTv-3"/D 86 5h1v2hNvT"/D 93 5h1v3hNv-3"/D 99 5h1v2h1v1hTv-3"/D 102 5h1v2hNvT"/D 109 5h1v3hNv-3"/>F 4 6h1v1hNvN"/>F 20 6h1v1hNvN"/D 7 7h2v1hTvN"/D 23 7h2v1hTvN"/>F 6 8h1v1hNvN"/>F 22 8h1v1hNvN"/D 76 8h1v2hNvT"/D 92 8h1v2hNvT"/D 108 8h1v2hNvT"/D 2 9h1v4hNv-4"/D 4 9h1v1hNvN"/>F 5 9h1v1hNvN"/>F 10 9h1v1hNvN"/D 11 9h1v1hNvN"/D 13 9h1v5hNv-5"/D 18 9h1v4hNv-4"/D 20 9h1v1hNvN"/>F 21 9h1v1hNvN"/>F 26 9h1v1hNvN"/D 27 9h1v1hNvN"/D 29 9h1v4hNv-4"/D 34 9h1v4hNv-4"/D 45 9h1v5hNv-5"/D 50 9h1v4hNv-4"/D 61 9h1v4hNv-4"/D 68 9h1v4hNv-4"/D 71 9h1v1hNvN"/D 84 9h1v4hNv-4"/D 87 9h1v1hNvN"/D 100 9h1v4hNv-4"/D 103 9h1v1hNvN"/D 5 10h1v1hNvN"/D 10 10h1v1hNvN"/>F 11 10h1v1hNvN"/D 21 10h1v1hNvN"/D 26 10h1v1hNvN"/>F 27 10h1v1hNvN"/D 39 10h2v1hTvN"/D 55 10h2v1hTvN"/D 70 10h1v1hNvN"/D 77 10h1v2hNvT"/D 86 10h1v1hNvN"/D 93 10h1v2hNvT"/D 102 10h1v1hNvN"/D 109 10h1v2hNvT"/D 4 11h1v1hNvN"/D 11 11h1v1hNvN"/D 20 11h1v1hNvN"/D 27 11h1v1hNvN"/D 38 11h1v2hNvT"/>F 39 11h2v2hTvT"/D 41 11h1v2hNvT"/D 54 11h1v2hNvT"/>F 55 11h2v2hTvT"/D 57 11h1v2hNvT"/D 71 11h1v1hNvN"/D 87 11h1v1hNvN"/D 103 11h1v1hNvN"/>F 6 12h1v1hNvN"/>F 10 12h1v1hNvN"/>F 22 12h1v1hNvN"/>F 26 12h1v1hNvN"/D 72 12h1v1h3v1h-4vT"/D 76 12h1v1hNvN"/D 92 12h1v1hNvN"/D 104 12h1v2h-4vNh3vN"/D 108 12h1v1hNvN"/D 3 13h1v1hNvN"/D 6 13h3v1h-3vN"/>F 12 13h1v1hNvN"/D 19 13h1v1hNvN"/D 22 13h4v1h-4vN"/D 28 13h1v1hNvN"/D 35 13h1v1hNvN"/D 39 13h2v1hTvN"/D 51 13h1v1hNvN"/D 55 13h2v1hTvN"/D 60 13h1v1hNvN"/D 69 13h1v1hNvN"/D 85 13h1v1hNvN"/D 88 13h1v1hNvN"/D 91 13h1v1hNvN"/D 107 13h1v1hNvN"/D 4 14h2v1hTvN"/D 9 14h1v1hNvN"/D 12 14h1v1hNvN"/D 20 14h2v1hTvN"/D 26 14h2v1hTvN"/D 36 14h2v1hTvN"/D 41 14h1v1hNvN"/D 44 14h1v1hNvN"/D 52 14h2v1hTvN"/D 58 14h2v1hTvN"/D 70 14h2v1hTvN"/D 86 14h2v1hTvN"/D 89 14h2v1hTvN"/D 105 14h2v1hTvN"/D 10 15h2v1hTvN"/D 42 15h2v1hTvN"/>`,
      speed: 2000
    }     
    }

  const randomColor = () =>{
    const r=()=> Math.ceil(Math.random() * 255)
    return `rgb(${r()},${r()},${r()})`
  }

  const randomGreen= () =>{
    const r=()=> Math.ceil(Math.random() * 80)
    const g=()=> Math.ceil(Math.random() * 155) + 100
    const b=()=> Math.ceil(Math.random() * 100)
    return `rgb(${r()},${g()},${b()})`
  }


  const tree = () =>{
    return `D 5 0h6v1h2v1h1v1h1v1h1v7hNv1hNv1hNv1hTv2hNv-3hNvNhTv1hNv3hNvThTvNhNvNhNvNhNv-7h1vNh1vNh1vNh2vN"/ F 7 12h2v1h1v3h-4v-3h1vN"/`
  }

  const flowers = () =>{
    return `D 2 1h2v1hTvN"/ D 1 2h1v1hNvN"/ D 4 2h1v1hNvN"/ D 2 3h2v1hTvN"/ D 11 4h2v1hTvN"/ D 10 5h1v1hNvN"/ D 13 5h1v1hNvN"/ D 11 6h2v1hTvN"/ D 4 8h2v1hTvN"/ D 3 9h1v1hNvN"/ D 6 9h1v1hNvN"/ D 4 10h2v1hTvN"/ D 13 12h2v1hTvN"/ D 12 13h1v1hNvN"/ D 15 13h1v1hNvN"/ D 13 14h2v1hTvN"/`
  }

  const buildingCorner = subColor =>{
    return `D 5 0h11v1hN1vN"/ D 3 1h2v1hTvN"/ <path fill="${subColor ? subColor : 'white'}" d="M 5 1h11v15hN5vN1h1vTh1vNh2vN"/ D 2 2h1v1hNvN"/ D 1 3h1v2hNvT"/ D 0 5h1v11hNvN1"/`
  }

  const roofCorner = subColor =>{
    return `D 0 0h1v11h1v2hNv3hNvN6"/ <path fill="${subColor ? subColor : 'white'}" d="M 1 0h15v15hN1vNhTvNhNvThNvN1"/ F 1 13h1v1h1v1h2v1h-4v-3"/ D 2 13h1v1hNvN"/ D 3 14h2v1hTvN"/ D 5 15h11v1hN1vN"/`
  }

  const plain = subColor =>{
    return `<path fill="${subColor ? subColor : 'white'}" d="M 0 0h16v16hN6vN6"/`
  }

  const plainEdge = subColor =>{
    return `D 0 0h16v1hN6vN"/ <path fill="${subColor ? subColor : 'white'}" d="M 0 1h16v15hN6vN5"/`
  }

  const door = () =>{
    return `F 0 0h16v15hNvN0hNvThTvNhTvNh-4v1hTv1hTv2hNv10hNvN5"/ D 6 1h4v1h2v1h2v2h1v10h1v1hN6vNh1vN0h1vTh2vNh2vN"/`
  }

  const roundWindow = () =>{
    return `F 0 0h16v16hN6vN6"/ D 6 2h4v1h2v1h1v2h1v4hNv2hNv1hTv1h-4vNhTvNhNvThNv-4h1vTh1vNh2vN"/`
  }

  const squareWindow = () =>{
    return `F 0 0h16v16hN6vN6"/ D 5 2h6v1h1v10hNv1h-6vNhNvN0h1vN"/`
  }

  const sideSquareWindow = () =>{
    return `D 0 0h1v16hNvN6"/ F 1 0h15v16h-3vNh1v-9hNvNh-4v1hNv9h1v1h-8vN6"/ D 9 5h4v1h1v9hNv1h-4vNhNv-9h1vN"/`
  }

  const noSideWindow = () =>{
    return `F 0 0h16v16h-3vNh1v-9hNvNh-4v1hNv9h1v1h-9vN6"/ D 9 5h4v1h1v9hNv1h-4vNhNv-9h1vN"/`
  }

  const sideSquareWindowAlt = () =>{
    return `D 0 0h1v16hNvN6"/ F 1 0h15v5hNvNh-4v1hNv10h1v1hN0vN6"/ D 11 4h4v1h1v10hNv1h-4vNhNvN0h1vN"/ F 15 15h1v1hNvN"/`
  }

  const roofCurve = subColor =>{
    return `<path fill="${subColor ? subColor : 'white'}" d="M 0 0h16v15hTvNhNvNhNvNhTvNh-4v1hTv1hNv1hNv1hTvN5"/ D 6 11h4v1h-4vN"/ D 4 12h2v1hTvN"/ F 6 12h4v1h2v1h1v1h1v1hN2vNh1vNh1vNh2vN"/ D 10 12h2v1hTvN"/ D 3 13h1v1hNvN"/ D 12 13h1v1hNvN"/ D 2 14h1v1hNvN"/ D 13 14h1v1hNvN"/ D 0 15h2v1hTvN"/ D 14 15h2v1hTvN"/`
  }

  const roofTopBottomCorner = subColor =>{
    return `D 0 0h1v11hNvN1"/ F 1 0h15v15hN1vNhTvNhNvThNvN1"/ <path fill="${subColor ? subColor : 'white'}" d="M 0 11h1v2h1v1h1v1h2v1h-5v-5"/ D 1 11h1v2hNvT"/ D 2 13h1v1hNvN"/ D 3 14h2v1hTvN"/ D 5 15h11v1hN1vN"/`
  }

  const sub = '#e2cc9c'
  const main = '#7d551c'

  const svgData = {
    't': {svg: tree, color: randomGreen},
    'w': {svg: tree, color: randomGreen},
    'o': {svg: flowers, color: randomColor},
    'd': {svg: buildingCorner, color: main, subColor: sub },
    's': {svg: buildingCorner, color: main, subColor: sub, rotate: 90},
    'bt': {svg: buildingCorner, color: main },
    'br': {svg: buildingCorner, color: main, rotate: 90},
    'bb': {svg: buildingCorner, color: main, rotate: 180},
    'bl': {svg: buildingCorner, color: main, rotate: 270},
    'rbr': {svg: roofTopBottomCorner, color: main, subColor: sub },
    'rbl': {svg: roofTopBottomCorner, color: main, subColor: sub, flip: 'h'},
    'g': {svg: roofCorner, color: main, subColor: sub},
    'y': {svg: roofCorner, color: main, subColor: sub, flip: 'h'},
    'p': {svg: plain },
    'rp': {svg: plain, subColor: sub },
    'do': {svg: door, color: main },
    'wi': {svg: roundWindow, color: main},
    'sw': {svg: squareWindow, color: main },
    'swl': {svg: sideSquareWindow, color: main },
    'swr': {svg: sideSquareWindow, color: main, flip: 'h'},
    'nwl': {svg: noSideWindow, color: main },
    'nwr': {svg: noSideWindow, color: main, flip: 'h'},
    'swal': {svg: sideSquareWindowAlt, color: main },
    'swar': {svg: sideSquareWindowAlt, color: main, flip: 'h'},
    'at': {svg: plainEdge, color: main  },
    'ar': {svg: plainEdge, color: main, rotate: 90 },
    'ab': {svg: plainEdge, color: main, rotate: 180 },
    'al': {svg: plainEdge, color: main, rotate: 270 },
    'rc': {svg: roofCurve, color: main, subColor: sub},
    'pt': {svg: plainEdge, color: main, subColor: sub },
    'pr': {svg: plainEdge, color: main, subColor: sub, rotate: 90 },
    'pb': {svg: plainEdge, color: main, subColor: sub, rotate: 180 },
    'pu': {svg: plainEdge, color: main, subColor: sub, rotate: 270 },
  }


  const eventPoints = {
    tree1:{
      text: [
        'hello! I\'m a tree!',
        'yeah!'
    ],
      art: 'http://masahito.co.uk/img/icecream_bunny.png',
      // item: null,
      direction: 'up'
    },
    bunny1:{
      text: ['hello! Bunny!'],
      // item: null,
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
        'how are you?#q1',
        'yeah!/really?#yesNo',
        'cool!/ /whatever'
      ],
      q1: [
        'okay',
        'not so good'
      ],
      yesNo: [
        'yes',
        'no',
        'maybe'
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
        '155_bunny_0_hello',
        '156_bunny_0_apple',
        '311_bunny_0_tomato'
      ],
      events: [
        '5_transport-portal3',
        '6_transport-portal3'
      ],
      map: 'v5,b2,v24,w4,b2,w22,v2,w1,b14,d1,pt2,s1,b8,w1,v2,w1,b12,t1,b1,g1,pb2,y1,b6,t1,b1,w1,v2,w1,b2,t1,b10,d1,al1,p1,nwr1,swr1,pt1,s1,b6,w1,v2,w1,b10,d1,pt2,pu1,rbr1,do1,ab1,rbl1,rp1,pr1,b6,w1,v2,w1,b6,t1,b3,g1,rc1,pb1,g1,pb5,y1,b6,w1,v2,w1,b10,swl1,p1,nwr1,al1,p5,ar1,b6,w1,v2,w1,b10,bl1,do1,ab1,al1,wi1,p1,sw1,p1,wi1,ar1,b2,d1,pt1,s1,b1,w1,v2,w1,b13,bl1,ab2,do1,ab2,bb1,b2,g1,rc1,y1,b1,w1,v2,w1,b1,t1,b3,t1,b16,swl1,p1,swr1,b1,w1,v2,w1,b10,t1,b8,t1,b2,bl1,do1,bb1,b1,w1,v2,w1,b2,t1,b23,w1,v2,w1,b28,v1,w1,b23,t1,b4,v1,w1,b1,t1,b5,t1,b12,t1,b5,w1,v2,w1,b14,t1,b11,w1,v2,w1,b26,w1,v2,w28,v31',
    },
    {
      name: 'two',
      iWidth: 40,
      iHeight: 30,
      characters: [
        '779_bunny_0_hello'
      ],
      events: [
        '1178_transport-portal1',
        '1179_transport-portal1',
        '1180_transport-portal1'
      ],
      map: 'v18,b3,v20,w17,b3,w12,v8,w1,b30,w1,v2,t1,v5,w1,b11,t1,b18,w1,v8,w1,b6,t1,b19,t1,b3,w1,v5,t1,v2,w1,b2,t1,b27,w1,v8,w1,b18,t1,b2,t1,b8,w7,v2,w1,b36,w1,v2,w1,b11,t1,b24,w1,v2,w1,b33,t1,b2,w1,v2,w1,b6,t1,b29,w1,v2,w1,b2,t1,b20,o8,b5,w1,v2,w1,b23,o8,b5,w1,v2,w1,b16,t1,b6,o8,b5,w1,v2,w1,b23,o8,b2,t1,b2,w1,v2,w1,b23,o8,b5,w1,v2,w1,b3,t1,b8,t1,b10,o8,b5,w1,v2,w1,b36,w1,v2,w1,b36,w1,v2,w1,b7,t1,b25,t1,b2,w1,v2,w1,b36,w1,v2,w13,b24,w1,v14,w1,b4,t1,b4,t1,b9,t1,b4,w1,v4,t1,v4,t1,v4,w1,b24,w1,v14,w1,b24,w1,v6,t1,v7,w1,b1,t1,b22,w1,v12,t1,v1,w1,b12,t1,b3,t1,b2,t1,b4,w1,v14,w1,b24,w1,v4,t1,v5,t1,v3,w5,b3,w18,v19,b3,v19'
    },
    {
      name: 'three',
      iWidth: 18,
      iHeight: 14,
      characters: [
        '135_bunny_9_hello',
        '101_bunny_6_hello',
        '165_bunny_3_hello'
      ],
      events: [
        '241_transport-portal1',
        '242_transport-portal1',
        '243_transport-portal1',
        '44_check-tree1',
        '112_check-bunny1'
      ],
      map: 'v19,w16,v2,w1,b1,o3,b6,o3,b1,w1,v2,w1,b14,w1,v2,w1,b14,w1,v2,w1,b1,o1,b10,o1,b1,w1,v2,w1,b1,o1,b10,o1,b1,w1,v2,w1,b1,o1,b10,o1,b1,w1,v2,w1,b14,w1,v2,w1,b14,w1,v2,w1,b14,w1,v2,w1,b1,o3,b6,o3,b1,w1,v2,w6,b3,w7,v8,b3,v8'
    }
  ]

  // const buttonWrapper = document.querySelector('.button')
  // buttonWrapper.innerHTML = mapData.map((m,i)=>{
  //   return `
  //     <button data-index=${i}>
  //       ${m.name}
  //     </button>
  //   `
  // }).join('')
  // const buttons = document.querySelectorAll('button')


  const transitionCover = document.querySelector('.transition_cover')
  const touchToggle = document.querySelector('.touch_toggle')
  const control = document.querySelector('.control')
  const controlButtons = document.querySelectorAll('.control_button')
  const wrapper = document.querySelector('.wrapper')
  const map = document.querySelector('.map')
  const mapImageContainer = document.querySelector('.map_image_container')
  const mapCover = document.querySelector('.map_cover')
  const mapImage = document.querySelector('.map_image')
  const location = document.querySelector('.location_indicator')
  const spriteContainer = document.querySelector('.sprite_container')
  const texts = document.querySelectorAll('.text')
  const sprite = document.querySelector('.sprite')
  const indicator = document.querySelector('.indicator')
  let sprites

  
  

  //* map related variables
  let height
  let width
  let iHeight
  let iWidth
  let start
  let cellD = 32
  let minicellD 
  let x 
  let y 
  let mapTiles
  let locationTiles
  let mapImageTiles

  //* gameplay related variables
  let mapIndex = 1
  const spawnData = []
  const bear = {
    spritePos: null,
    facingDirection: 'down',
    pos: null,
    motion: true,
    textCount: 0,
    pause: false,
    option: 0,
    choice: 0,
    prevChoices: [], 
    animationTimer: [],
  }

  const directionKey = {
    9: 'right',
    6: 'left',
    3: 'up',
    0: 'down',
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

  const noWallList = ['b','do'] //! maybe switch this depending on the map?

  const noWall = pos =>{    
    if (!mapImageTiles[pos] || bear.pos === pos || spawnData.filter(s=>s.pos === pos).length) return false
    return noWallList.filter(w => mapImageTiles[pos].classList.contains(w)).length
  }

  const setUpWalls = target =>{
    const decompressedMap = decompress(mapData[mapIndex].map)
    target.forEach((tile,i)=>{
      const letterCode = decompressedMap[i]
      tile.classList.add(letterCode)

      if (svgData[letterCode])  {
        const { svg, color, subColor, rotate, flip } = svgData[letterCode]
        let colorAction = ''
        colorAction = typeof(color) === 'function' ? color() : color
        tile.innerHTML = 
          svgWrapper(
            decode(subColor ? svg(subColor) : svg()),
            color ? colorAction : '',
            rotate ? rotate : 0,
            flip ? flip : null 
          )
      }
    })
  }
  
  const spawnWalk = (actor,para,m,spawn) =>{
    actor[para] += m
    spawn.style[para]= `${actor[para]}px`
  }
  
  const spawnMotion = (spawn,i) =>{
    if (spawnData[i].pause || !windowActive) return
    const motionOption = [
      ()=>spriteWalk('down',spawnData[i],sprites[i],spawn),
      ()=>spriteWalk('right',spawnData[i],sprites[i],spawn),
      ()=>spriteWalk('up',spawnData[i],sprites[i],spawn),
      ()=>spriteWalk('left',spawnData[i],sprites[i],spawn)
    ]
    motionOption[Math.floor(Math.random() * 4)]()
  }
  
  const setX = num =>{
    x = num
    mapImage.style.left = `${x}px`
  }

  const setY = num =>{
    y = num
    mapImage.style.top = `${y}px`
  }

  const setSpritePos = (num,actor,sprite) =>{
    actor.spritePos = num
    sprite.style.marginLeft = `${num}px`
  }

  const positionSprite = pos =>{
    const paraX = pos % width * cellD
    const paraY = Math.floor(pos / width) * cellD
    spriteContainer.style.left = `${paraX}px`
    spriteContainer.style.top = `${paraY}px`
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
        left: sx,
        top: sy,
        animationTimer: ['',''],
        pos,
      }

      const spawnContainer = document.createElement('div')
      spawnContainer.classList.add('spawn_container')
      spawnContainer.style.left = `${sx}px`
      spawnContainer.style.top = `${sy}px`

      const spawn = document.createElement('div')
      const sprite = () =>{
        return `
        <svg class="sprite" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 112 16" style="height: ${cellD}px; width: ${cellD * 7}px;">
          ${decode(avatars[c.split('_')[1]].sprite)}
        </svg>  
        `
      }

      spawn.innerHTML = sprite()
      // spawn.innerHTML = spriteContainer.innerHTML //! this needs to be changed to whatever defined in avatar object
      spawn.classList.add('spawn')
      spawn.style.fill = randomColor()
      spawnContainer.appendChild(spawn)    
      mapImage.appendChild(spawnContainer)    
      spawnData[i].interval = setInterval(()=>spawnMotion(spawnContainer,i),avatars[c.split('_')[1]].speed)
    })

    sprites = document.querySelectorAll('.sprite')
    sprites.forEach((sprite,i)=>{
      if (i === sprites.length - 1) return
      sprites[i].style.animationDelay= `${i * 0.1}s`
      turnSprite(directionKey[spawnData[i].spritePos],spawnData[i],sprite,false)
    })
  }


  const transition = () =>{
    transitionCover.classList.add('transition')
    bear.motion = false
    setTimeout(()=>{
      transitionCover.classList.remove('transition')
      bear.motion = true
    },500)
  }

  const displayChoiceDetails = () =>{
    indicator.innerHTML = (   
      `
        <div>
          <p>bear textCount: ${bear.textCount}</p>
          <p>bear choice: ${bear.choice}</p>
          <p>bear prevchoice: ${bear.prevChoice}</p>
        </div>
      ` )
  }

  const talk = prev => {
    const key = { right: 1, left: -1, up: -iWidth, down: iWidth }
    const talkTarget = spawnData.find(actor => actor.pos === bear.pos + key[bear.facingDirection])
    const talkTargetIndex = spawnData.findIndex(actor => actor.pos === bear.pos + key[bear.facingDirection])

    talkTarget.pause = true
    const opposite = Object.keys(key).find(k => key[k] === key[bear.facingDirection] * -1)
    turnSprite(opposite,talkTarget,sprites[talkTargetIndex],false)
    displayText(bear.textCount,eventPoints[talkTarget.event],prev)
  }
  
  //* displays multiple choice
  const displayAnswer = (q,prev) =>{ 
    bear.pause = true
    bear.choice = prev ? bear.prevChoices[bear.textCount - 1] : 0 
    texts[1].innerHTML = q.map((qu,i)=>`<div class="option ${i === bear.choice && 'selected'}">${qu}</div>`).join('')
    
    //* makes multiple choice clickable
    bear.options = document.querySelectorAll('.option')
    bear.options.forEach((op,i)=>{
      op.addEventListener('click',()=>{
        bear.options.forEach(op=>op.classList.remove('selected'))
        op.classList.add('selected')
        bear.choice = i
      })
    })
  }

  const displayTextGradual = (t,i) =>{
    texts[0].innerHTML = t.slice(0,i)
    if (i < t.length) {
      setTimeout(()=>{
        displayTextGradual(t, i + 1)
      },30)
    }
  }

  const clearText = () =>{
    bear.textCount = 0
    bear.prevChoices.length = 0
    bear.motion = true
    bear.pause = false
    texts.forEach(t=>t.innerText='')
    transitionCover.innerHTML = ''
  }

  const displayText = (count,eventPoint,prev) =>{
    if (count < eventPoint.text.length){
      
      //* displays text and answer
      const text = eventPoint.text[count].split('/')[prev ? bear.prevChoices[bear.textCount - 1]  : bear.choice] || eventPoint.text[count]
      bear.textCount++
      bear.motion = false
      if (text.includes('#')) {
        displayTextGradual(text.split('#')[0],0)
        displayAnswer(eventPoint[text.split('#')[1]],prev)
      } else if (text !== ' ') {
        displayTextGradual(text,0) 
      } 
      // else {
      //   clearText()
      // }

      if (eventPoint.art) transitionCover.innerHTML = `
        <div>
          <img src=${eventPoint.art} />
        </div>
      `
      return
    }
    clearText()
  }


  function check(count,prev=false){
    if (mapImageTiles[bear.pos].dataset.event) { //* checking static object
      index = mapImageTiles[bear.pos].dataset.event.split('-')[1]
      const eventPoint = eventPoints[index]
      if (bear.facingDirection === eventPoint.direction) displayText(count,eventPoint,prev)
      return
    }
    talk(prev)
  }

  function transport(index){
    transition()
    const entryPoint = entryPoints[index]
    setLocation(entryPoint.map)
    bear.pos = entryPoint.cell
    setWidthAndHeightAndResize()
    setUpWalls(mapImageTiles)
    setUpWalls(locationTiles)
    turnSprite(entryPoint.direction,bear,sprite,false)
    spawnCharacter()
  }
  

  const turnSprite = (e = 'down',actor,sprite,animate) => {
    let m = -cellD
    actor.facingDirection = e
    const animateWalk = (a,b,c,turn) =>{
      actor.animationTimer.forEach(timer=>clearTimeout(timer))
      m = animate ? m * a : m * c
      if (turn) sprite.parentNode.classList.contains('right') 
        ? sprite.parentNode.classList.remove('right') 
        : sprite.parentNode.classList.add('right')
      if (animate){
        actor.animationTimer[0] = setTimeout(()=>setSpritePos(-cellD * b,actor,sprite),100)
        actor.animationTimer[1] = setTimeout(()=>setSpritePos(-cellD * c,actor,sprite),200) 
      }   
    }
    const spriteChange = {
      right: ()=> { 
        sprite.parentNode.classList.add('right')
        animateWalk(4,6,5,false)
      },
      left: ()=> { 
        sprite.parentNode.classList.remove('right')
        animateWalk(4,6,5,false)
      },
      up: ()=> animateWalk(2,2,3,true), 
      down: ()=> animateWalk(0,0,1,true)
    }
    spriteChange[e]()
    setSpritePos(m,actor,sprite)
  }

  const spriteWalk = (e,actor,sprite,spawn=false) =>{
    // when spawn is true, this function is used by spawn

    if (!e || !bear.motion) return
    if (!spawn) locationTiles[actor.pos].classList.remove('mark')
    // const direction = e.key ? e.key.toLowerCase().replace('arrow','') : e
    const direction = e
    switch (direction) {
      case 'right': if (noWall(actor.pos + 1)){
          spawn ? spawnWalk(actor,'left',cellD,spawn) : setX(x - cellD)
          actor.pos += 1 } break
      case 'left': if (noWall(actor.pos - 1)){
          spawn ? spawnWalk(actor,'left',-cellD,spawn) : setX(x + cellD)
          actor.pos -= 1 } break
      case 'up': if (noWall(actor.pos - iWidth)){
          spawn ? spawnWalk(actor,'top',-cellD,spawn) : setY(y + cellD)
          actor.pos -= iWidth } break
      case 'down': if (noWall(actor.pos + iWidth)){
          spawn ? spawnWalk(actor,'top',cellD,spawn) : setY(y - cellD)
          actor.pos += iWidth } break
      default: console.log('invalid command')
        return
    }
    turnSprite(direction,actor,sprite,true)
    if (!spawn) locationTiles[actor.pos].classList.add('mark')

    if (!spawn && mapImageTiles[bear.pos].dataset.event) {
      const event = mapImageTiles[bear.pos].dataset.event.split('-')[0]
      const index = mapImageTiles[bear.pos].dataset.event.split('-')[1]
      events[event](index)
    } 
  }

  const select = () =>{
    // bear.textCount++
    texts[1].innerHTML = ''
    bear.pause = false
    bear.prevChoices[bear.textCount - 1] = bear.choice
    check(bear.textCount)
  }

  const prevText = () =>{
    if (bear.textCount > 1) {
      texts[1].innerHTML = ''
      //* needs to be minus 2, because textCount would be incremented by then
      bear.textCount = bear.textCount - 2 
      bear.pause = false
      check(bear.textCount,true)
    } else {
      clearText()
    }
  }
  

  //! need external index handler if there are more than one choice for answer.
  const handleKeyAction = e =>{
    const key = e.key ? e.key.toLowerCase().replace('arrow','') : e
    if (bear.pause) {
      bear.options.forEach(option=>option.classList.remove('selected'))
      switch (key) {
        case 'up': if(bear.choice > 0) bear.choice--; break
        case 'down': if(bear.choice < bear.options.length - 1) bear.choice++; break
        case ' ': select(); break   
        case 'enter': select(); break   
        case 'right': select(); break 
        case 'left' : prevText(); break
        default: console.log('invalid command')
      }
      displayChoiceDetails()
      bear.options[bear.choice].classList.add('selected')
      return
    }
    if (key === 'left' && texts[0].innerHTML) prevText()
    if (key === ' ' || key === 'enter' || (key === 'right' && texts[0].innerHTML)) {
      check(bear.textCount)
      return
    }
    spriteWalk(key, bear, sprites[sprites.length - 1])
  }


  //* key control
  window.addEventListener('keyup', (e)=>handleKeyAction(e))

  
  

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
    sprite.style.width = `${cellD * 7}px`
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


  // buttons[5].addEventListener('click',()=>events['transport']('portal1'))
  // buttons[6].addEventListener('click',()=>events.transport('portal2'))
  // buttons[7].addEventListener('click',()=>events.transport('portal3'))

  controlButtons.forEach(c=>{
    c.addEventListener('click',()=>handleKeyAction(c.dataset.c))
  })

  
  touchToggle.addEventListener('change', ()=>{
    control.classList.toggle('hide')
    const status = document.querySelector('.touch_status')
    status.innerHTML = status.innerHTML === 'off' ? 'on' : 'off'
  })
}

window.addEventListener('DOMContentLoaded', init)


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
  
