import { elements } from './elements.js'
import { settings } from './state.js'
import { decompress } from './utils/compression.js'
import { clampMax, resizeCanvas, setStyles } from './utils/utils.js'
import { createSpriteSheet, outputFromSpriteSheet, animateMap } from './mapDraw.js'
import { addTouchAction } from './utils/touchControl.js'


function init() {

  const mapX = () => bear.pos % settings.map.column 
  const mapY = () => Math.floor(bear.pos / settings.map.column)

  const bear = {
    pos: 464
  }


  const mapData = {
    one: {
      w: 30,
      h: 20,
      map: 'zz14,w2,zz5,f1,i1,f3,i1,f1,zz3,s1,s.h1,w8,s1,s.h1,w8,f7,w1,zz2,t1,t.h1,w8,t1,t.h1,w5,s1,s.h1,w1,g.c1,f2,h1,f2,g.b1,w1,zz2,w5,a1,a.a1,w10,t1,t.h1,w4,z1,w4,zz2,w1,v1,w2,a1,b.c1,b.b1,a.a1,w8,v1,w4,v1,w1,y1,s1,s.h1,w2,zz2,w4,c1,e.c1,e.b1,c1,w15,y1,t1,t.h1,w2,zz2,w4,b.c1,c2,b.b1,s1,s.h1,w3,x1,y9,x.b1,w2,v1,w1,zz2,w4,f4,t1,t.h1,w3,y1,w14,zz2,s1,s.h1,w2,k.h1,f2,k1,w5,y1,w14,zz2,t1,t.h1,v1,w1,g.c1,h1,f1,g.b1,w5,y1,w14,zz2,w13,z.b1,w14,zz2,aa13,ad1,aa14,zz2,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ad1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,ab.h1,ab1,zz2,c8,ac2,c3,ad1,c2,ac2,c1,ac2,c7,zz2,c11,ac1,c1,ad1,c6,ac2,c6,zz2,c2,ac2,c6,ac2,c1,ad1,c10,ac2,c2,zz2,c1,ac2,c4,ac2,c3,ah1,ai1,aj1,c3,ac2,c3,ac2,c3,zz2,c6,ac2,c7,ac1,c2,ac1,c7,ac1,c1,zz2,c12,ac1,c8,ac1,c6,zz31',
    }
  }

  const getMapCoord = para => (Math.floor(settings.map[para] / 2) - 1) * settings.d

  const adjustMapWidthAndHeight = () =>{
    const { offsetWidth: w, offsetHeight: h } = elements.wrapper
    const { d } = settings

    settings.map.w = 2 * Math.floor((clampMax(w, 800) / d) / 2)
    settings.map.h = 2 * Math.floor((clampMax(h, 600) / d) / 2)
    setStyles(settings.map)

    const x = getMapCoord('w')
    const y = getMapCoord('h')
    
    setStyles({ el: elements.bear, x, y })
    
    // adjust mapPosition
    setStyles({ 
      el: document.querySelector('.map-image'),
      x: mapX() * -d + x,
      y:  mapY() * -d + y
    })
    // setPos('left', mapX() * -d + x)
    // setPos('top', mapY() * -d + y)
  }


  // const setPos = (para, num) =>{
  //   settings.mapXY[para === 'left' ? 'x' : 'y'] = num
  //   const { x, y } = settings.mapXY
  //   document.querySelector('.map-image').style.transform = `translate(${x}px,${y}px)`
  // }



  const setUpCanvas = ({ canvas, w, h }) => {
    resizeCanvas({
      canvas: canvas.el,
      w: w * settings.d,
      h: h * settings.d,
    })
    canvas.ctx = canvas.el.getContext('2d')
    canvas.ctx.imageSmoothingEnabled = false
  }



  const createMap = key => {
    console.log('create')
    settings.map = {
      ...settings.map,
      ...mapData[key],
      key,
      d: settings.d,
      data: decompress(mapData[key].map),
      column: mapData[key].w, // column and row remains static, while w, and h adapts to screenWidth
      row: mapData[key].h,
    }
    setUpCanvas({
      canvas: elements.mapImage,
      w: settings.map.w,
      h: settings.map.h,
    })

    settings.map.data.forEach((code, i) => {
      outputFromSpriteSheet({ code, i })
    })
    animateMap()

    adjustMapWidthAndHeight()
  }



  window.addEventListener('resize', ()=> {
    adjustMapWidthAndHeight()
  })

  createSpriteSheet()

  elements.startButton.addEventListener('click', () => createMap('one'))

  addTouchAction(elements.control.childNodes[1].childNodes[1], e => {
    console.log(e)
  })

}

window.addEventListener('DOMContentLoaded', init)

