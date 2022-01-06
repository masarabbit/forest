

//*maybe design maps first.
//! temporal solution for image display added, but 
//! add ways to decorate map further
//! design other avatars and map

//! change when the map is updated (currently updates too early)


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

  // const svgWrapper = ( content, color, rotate, flip, wrapper ) =>{
  //   let scale = 1
  //   if (flip === 'h') scale = '-1, 1'
  //   if (flip === 'v') scale = '1, -1'
  //   return `
  //     <div class="${wrapper}" style="transform: rotate(${rotate}deg) scale(${scale});">
  //       <svg x="0px" y="0px" width="100%" height="200%" viewBox="0 0 16 32" fill="${color ? color : 'black'}">${content}</svg>
  //     </div>
  //     `
  // }

  const svgWrapper = ( { content, color, rotate, flip, wrapper }) =>{
    let scale = 1
    if (flip === 'h') scale = '-1, 1'
    if (flip === 'v') scale = '1, -1'
    return `
      <div class="${wrapper}" style="transform: rotate(${rotate || 0}deg) scale(${scale});">
        <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 16 16" fill="${color ? color : 'black'}">${content}</svg>
      </div>
      `
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
      // sprite: 'D 4 0h2v1hTvN"/D 10 0h2v1hTvN"/D 20 0h2v1hTvN"/D 26 0h2v1hTvN"/D 36 0h2v1hTvN"/D 42 0h2v1hTvN"/D 52 0h2v1hTvN"/D 58 0h2v1hTvN"/D 70 0h2v1hTvN"/D 73 0h2v1hTvN"/D 86 0h2v1hTvN"/D 89 0h2v1hTvN"/D 102 0h2v1hTvN"/D 105 0h2v1hTvN"/D 3 1h1v4hNv-4"/>F 4 1h2v2hNv1h1vNh1v1h2vNh1vTh2v4hTv2h2vTh1v8hNv2hTvNhNvNhTvNhNv2hTvNhNv-8h1v-4"/D 6 1h1v2hNvT"/D 9 1h1v2hNvT"/D 12 1h1v4hNv-4"/D 19 1h1v4hNv-4"/>F 20 1h2v2hNv1h1vNh1v1h2vNh1vTh2v4hTv2h2vTh1v8hNv1hTvNh1vNh1v-3hTv2h1v1hNv1h-3vNhNv2hTvNhNv-8h1v-4"/D 22 1h1v2hNvT"/D 25 1h1v2hNvT"/D 28 1h1v4hNv-4"/D 35 1h1v4hNv-4"/>F 36 1h2v2h1v1h2vNh1vTh2v4h1v9hNv1hTvNhNvNh1vThNvNhTv1hNv2h1v1h-3vNhNv-8h1v-4"/D 38 1h1v2hNvT"/D 41 1h1v2hNvT"/D 44 1h1v4hNv-4"/D 51 1h1v4hNv-4"/>F 52 1h2v2h1v1h2vNh1vTh2v4h1v8hNv1h-3vNh1vThNvNhTv1hNv2h1v1h-3vNhNv-8h1v-4"/D 54 1h1v2hNvT"/D 57 1h1v2hNvT"/D 60 1h1v4hNv-4"/D 69 1h1v3hNv-3"/>F 70 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1h-3vNhNvNhNvNh1vNhNv1hNv1h1v1h1v2hTvNhNv-4hNvNh1vNhNvTh1vNh1v-3"/D 72 1h1v3hNv-3"/D 75 1h1v3hNv-3"/D 85 1h1v3hNv-3"/>F 86 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1hNv1hTvNhNv1hTvNhNv-4hNvNh1vNhNvTh1vNh1v-3"/D 88 1h1v3hNv-3"/D 91 1h1v3hNv-3"/D 101 1h1v3hNv-3"/>F 102 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1hNv1hTvThNvNhNvNh1vNhNv1hNv1h1v1h1v1h-3v-4hNvNh1vNhNvTh1vNh1v-3"/D 104 1h1v3hNv-3"/D 107 1h1v3hNv-3"/>F 5 3h1v1hNvN"/D 7 3h2v1hTvN"/>F 21 3h1v1hNvN"/D 23 3h2v1hTvN"/D 39 3h2v1hTvN"/D 55 3h2v1hTvN"/D 68 4h1v1hNvN"/D 76 4h1v1hNvN"/D 84 4h1v1hNvN"/D 92 4h1v1hNvN"/D 100 4h1v1hNvN"/D 108 4h1v1hNvN"/D 2 5h1v3hNv-3"/D 5 5h1v2hNvT"/D 10 5h1v2hNvT"/>F 11 5h1v2hNvT"/D 13 5h1v3hNv-3"/D 18 5h1v3hNv-3"/D 21 5h1v2hNvT"/D 26 5h1v2hNvT"/>F 27 5h1v2hNvT"/D 29 5h1v3hNv-3"/D 34 5h1v3hNv-3"/D 45 5h1v3hNv-3"/D 50 5h1v3hNv-3"/D 61 5h1v3hNv-3"/D 67 5h1v2h1v1hTv-3"/D 70 5h1v2hNvT"/D 77 5h1v3hNv-3"/D 83 5h1v2h1v1hTv-3"/D 86 5h1v2hNvT"/D 93 5h1v3hNv-3"/D 99 5h1v2h1v1hTv-3"/D 102 5h1v2hNvT"/D 109 5h1v3hNv-3"/>F 4 6h1v1hNvN"/>F 20 6h1v1hNvN"/D 7 7h2v1hTvN"/D 23 7h2v1hTvN"/>F 6 8h1v1hNvN"/>F 22 8h1v1hNvN"/D 76 8h1v2hNvT"/D 92 8h1v2hNvT"/D 108 8h1v2hNvT"/D 2 9h1v4hNv-4"/D 4 9h1v1hNvN"/>F 5 9h1v1hNvN"/>F 10 9h1v1hNvN"/D 11 9h1v1hNvN"/D 13 9h1v5hNv-5"/D 18 9h1v4hNv-4"/D 20 9h1v1hNvN"/>F 21 9h1v1hNvN"/>F 26 9h1v1hNvN"/D 27 9h1v1hNvN"/D 29 9h1v4hNv-4"/D 34 9h1v4hNv-4"/D 45 9h1v5hNv-5"/D 50 9h1v4hNv-4"/D 61 9h1v4hNv-4"/D 68 9h1v4hNv-4"/D 71 9h1v1hNvN"/D 84 9h1v4hNv-4"/D 87 9h1v1hNvN"/D 100 9h1v4hNv-4"/D 103 9h1v1hNvN"/D 5 10h1v1hNvN"/D 10 10h1v1hNvN"/>F 11 10h1v1hNvN"/D 21 10h1v1hNvN"/D 26 10h1v1hNvN"/>F 27 10h1v1hNvN"/D 39 10h2v1hTvN"/D 55 10h2v1hTvN"/D 70 10h1v1hNvN"/D 77 10h1v2hNvT"/D 86 10h1v1hNvN"/D 93 10h1v2hNvT"/D 102 10h1v1hNvN"/D 109 10h1v2hNvT"/D 4 11h1v1hNvN"/D 11 11h1v1hNvN"/D 20 11h1v1hNvN"/D 27 11h1v1hNvN"/D 38 11h1v2hNvT"/>F 39 11h2v2hTvT"/D 41 11h1v2hNvT"/D 54 11h1v2hNvT"/>F 55 11h2v2hTvT"/D 57 11h1v2hNvT"/D 71 11h1v1hNvN"/D 87 11h1v1hNvN"/D 103 11h1v1hNvN"/>F 6 12h1v1hNvN"/>F 10 12h1v1hNvN"/>F 22 12h1v1hNvN"/>F 26 12h1v1hNvN"/D 72 12h1v1h3v1h-4vT"/D 76 12h1v1hNvN"/D 92 12h1v1hNvN"/D 104 12h1v2h-4vNh3vN"/D 108 12h1v1hNvN"/D 3 13h1v1hNvN"/D 6 13h3v1h-3vN"/>F 12 13h1v1hNvN"/D 19 13h1v1hNvN"/D 22 13h4v1h-4vN"/D 28 13h1v1hNvN"/D 35 13h1v1hNvN"/D 39 13h2v1hTvN"/D 51 13h1v1hNvN"/D 55 13h2v1hTvN"/D 60 13h1v1hNvN"/D 69 13h1v1hNvN"/D 85 13h1v1hNvN"/D 88 13h1v1hNvN"/D 91 13h1v1hNvN"/D 107 13h1v1hNvN"/D 4 14h2v1hTvN"/D 9 14h1v1hNvN"/D 12 14h1v1hNvN"/D 20 14h2v1hTvN"/D 26 14h2v1hTvN"/D 36 14h2v1hTvN"/D 41 14h1v1hNvN"/D 44 14h1v1hNvN"/D 52 14h2v1hTvN"/D 58 14h2v1hTvN"/D 70 14h2v1hTvN"/D 86 14h2v1hTvN"/D 89 14h2v1hTvN"/D 105 14h2v1hTvN"/D 10 15h2v1hTvN"/D 42 15h2v1hTvN"/>',
      sprite : '<path fill="#c2d3f4" d="M 4 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 10 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 20 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 26 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 36 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 42 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 52 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 58 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 70 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 73 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 86 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 89 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 102 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 105 0h2v1hTvN"/ <path fill="#c2d3f4" d="M 3 1h1v4hNv-4"/ F 4 1h2v2h1v1h2vNh1vTh2v4h1v8hNv2hTvNhNvNh-3v1hTvTh1vNh1vNhNvNhNv1h1v1hNv1hNv-7h1v-4"/ <path fill="#c2d3f4" d="M 6 1h1v2hNvT"/ <path fill="#c2d3f4" d="M 9 1h1v2hNvT"/ <path fill="#c2d3f4" d="M 12 1h1v4hNv-4"/ <path fill="#c2d3f4" d="M 19 1h1v4hNv-4"/ F 20 1h2v2h1v1h2vNh1vTh2v4h1v8hNv1hTvNh-4v1hTvTh1vNh1vNhNvNhNv1h1v1hNv1hNv-7h1v-4"/ <path fill="#c2d3f4" d="M 22 1h1v2hNvT"/ <path fill="#c2d3f4" d="M 25 1h1v2hNvT"/ <path fill="#c2d3f4" d="M 28 1h1v4hNv-4"/ <path fill="#c2d3f4" d="M 35 1h1v4hNv-4"/ F 36 1h2v2h1v1h2vNh1vTh2v4h1v9hNv1hTvNhNvNh1vThNvNhTv1hNv2h1v1h-3vNhNv-8h1v-4"/ <path fill="#c2d3f4" d="M 38 1h1v2hNvT"/ <path fill="#c2d3f4" d="M 41 1h1v2hNvT"/ <path fill="#c2d3f4" d="M 44 1h1v4hNv-4"/ <path fill="#c2d3f4" d="M 51 1h1v4hNv-4"/ F 52 1h2v2h1v1h2vNh1vTh2v4h1v8hNv1h-3vNh1vThNvNhTv1hNv2h1v1h-3vNhNv-8h1v-4"/ <path fill="#c2d3f4" d="M 54 1h1v2hNvT"/ <path fill="#c2d3f4" d="M 57 1h1v2hNvT"/ <path fill="#c2d3f4" d="M 60 1h1v4hNv-4"/ <path fill="#c2d3f4" d="M 69 1h1v3hNv-3"/ F 70 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1h-3vNhNvNhNvNh1vNhNv1hNv1h1v1h1v2hTvNhNv-4hNvNh1vNhNvTh1vNh1v-3"/ <path fill="#c2d3f4" d="M 72 1h1v3hNv-3"/ <path fill="#c2d3f4" d="M 75 1h1v3hNv-3"/ <path fill="#c2d3f4" d="M 85 1h1v3hNv-3"/ F 86 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1hNv1hTvNhNv1hTvNhNv-4hNvNh1vNhNvTh1vNh1v-3"/ <path fill="#c2d3f4" d="M 88 1h1v3hNv-3"/ <path fill="#c2d3f4" d="M 91 1h1v3hNv-3"/ <path fill="#c2d3f4" d="M 101 1h1v3hNv-3"/ F 102 1h2v3h1v-3h2v3h1v1h1v3hNv2h1v2hNv1hNv1hTvThNvNhNvNh1vNhNv1hNv1h1v1h1v1h-3v-4hNvNh1vNhNvTh1vNh1v-3"/ <path fill="#c2d3f4" d="M 104 1h1v3hNv-3"/ <path fill="#c2d3f4" d="M 107 1h1v3hNv-3"/ <path fill="#c2d3f4" d="M 7 3h2v1hTvN"/ <path fill="#c2d3f4" d="M 23 3h2v1hTvN"/ <path fill="#c2d3f4" d="M 39 3h2v1hTvN"/ <path fill="#c2d3f4" d="M 55 3h2v1hTvN"/ <path fill="#c2d3f4" d="M 68 4h1v1hNvN"/ <path fill="#c2d3f4" d="M 76 4h1v1hNvN"/ <path fill="#c2d3f4" d="M 84 4h1v1hNvN"/ <path fill="#c2d3f4" d="M 92 4h1v1hNvN"/ <path fill="#c2d3f4" d="M 100 4h1v1hNvN"/ <path fill="#c2d3f4" d="M 108 4h1v1hNvN"/ <path fill="#c2d3f4" d="M 2 5h1v3hNv-3"/ <path fill="#102ec6" d="M 5 5h1v2hNvT"/ <path fill="#102ec6" d="M 10 5h1v2hNvT"/ <path fill="#c2d3f4" d="M 13 5h1v3hNv-3"/ <path fill="#c2d3f4" d="M 18 5h1v3hNv-3"/ <path fill="#102ec6" d="M 21 5h1v2hNvT"/ <path fill="#102ec6" d="M 26 5h1v2hNvT"/ <path fill="#c2d3f4" d="M 29 5h1v3hNv-3"/ <path fill="#c2d3f4" d="M 34 5h1v3hNv-3"/ <path fill="#c2d3f4" d="M 45 5h1v3hNv-3"/ <path fill="#c2d3f4" d="M 50 5h1v3hNv-3"/ <path fill="#c2d3f4" d="M 61 5h1v3hNv-3"/ <path fill="#c2d3f4" d="M 67 5h1v2hNvT"/ <path fill="#102ec6" d="M 70 5h1v2hNvT"/ <path fill="#c2d3f4" d="M 77 5h1v3hNv-3"/ <path fill="#c2d3f4" d="M 83 5h1v2hNvT"/ <path fill="#102ec6" d="M 86 5h1v2hNvT"/ <path fill="#c2d3f4" d="M 93 5h1v3hNv-3"/ <path fill="#c2d3f4" d="M 99 5h1v2hNvT"/ <path fill="#102ec6" d="M 102 5h1v2hNvT"/ <path fill="#c2d3f4" d="M 109 5h1v3hNv-3"/ <path fill="#929dce" d="M 7 7h2v1hTvN"/ <path fill="#929dce" d="M 23 7h2v1hTvN"/ <path fill="#929dce" d="M 67 7h2v1hTvN"/ <path fill="#929dce" d="M 83 7h2v1hTvN"/ <path fill="#929dce" d="M 99 7h2v1hTvN"/ <path fill="#c2d3f4" d="M 76 8h1v2hNvT"/ <path fill="#c2d3f4" d="M 92 8h1v2hNvT"/ <path fill="#c2d3f4" d="M 108 8h1v2hNvT"/ <path fill="#c2d3f4" d="M 2 9h1v3h1v2hNvNhNv-4"/ <path fill="#929dce" d="M 4 9h1v1hNvN"/ <path fill="#929dce" d="M 11 9h1v1hNvN"/ <path fill="#c2d3f4" d="M 13 9h1v5hNv1hNvTh1v-4"/ <path fill="#c2d3f4" d="M 18 9h1v3h1v2hNvNhNv-4"/ <path fill="#929dce" d="M 20 9h1v1hNvN"/ <path fill="#929dce" d="M 27 9h1v1hNvN"/ <path fill="#c2d3f4" d="M 29 9h1v4hNv-4"/ <path fill="#c2d3f4" d="M 34 9h1v4hNv-4"/ <path fill="#c2d3f4" d="M 45 9h1v5hNv-5"/ <path fill="#c2d3f4" d="M 50 9h1v4hNv-4"/ <path fill="#c2d3f4" d="M 61 9h1v4hNv-4"/ <path fill="#c2d3f4" d="M 68 9h1v4hNv-4"/ <path fill="#929dce" d="M 71 9h1v1hNvN"/ <path fill="#c2d3f4" d="M 84 9h1v4hNv-4"/ <path fill="#929dce" d="M 87 9h1v1hNvN"/ <path fill="#c2d3f4" d="M 100 9h1v4hNv-4"/ <path fill="#929dce" d="M 103 9h1v1hNvN"/ <path fill="#929dce" d="M 5 10h1v1hNvN"/ <path fill="#929dce" d="M 10 10h1v1hNvN"/ <path fill="#929dce" d="M 21 10h1v1hNvN"/ <path fill="#929dce" d="M 26 10h1v1hNvN"/ <path fill="#c2d3f4" d="M 39 10h2v1hTvN"/ <path fill="#c2d3f4" d="M 55 10h2v1hTvN"/ <path fill="#929dce" d="M 70 10h1v1hNvN"/ <path fill="#c2d3f4" d="M 77 10h1v2hNvT"/ <path fill="#929dce" d="M 86 10h1v1hNvN"/ <path fill="#c2d3f4" d="M 93 10h1v2hNvT"/ <path fill="#929dce" d="M 102 10h1v1hNvN"/ <path fill="#c2d3f4" d="M 109 10h1v2hNvT"/ <path fill="#929dce" d="M 4 11h1v1hNvN"/ <path fill="#929dce" d="M 11 11h1v1hNvN"/ <path fill="#929dce" d="M 20 11h1v1hNvN"/ <path fill="#929dce" d="M 27 11h1v1hNvN"/ <path fill="#c2d3f4" d="M 38 11h1v2hNvT"/ F 39 11h2v2hTvT"/ <path fill="#c2d3f4" d="M 41 11h1v2hNvT"/ <path fill="#c2d3f4" d="M 54 11h1v2hNvT"/ F 55 11h2v2hTvT"/ <path fill="#c2d3f4" d="M 57 11h1v2hNvT"/ <path fill="#929dce" d="M 71 11h1v1hNvN"/ <path fill="#929dce" d="M 87 11h1v1hNvN"/ <path fill="#929dce" d="M 103 11h1v1hNvN"/ <path fill="#c2d3f4" d="M 72 12h1v1h3v1h-4vT"/ <path fill="#c2d3f4" d="M 76 12h1v1hNvN"/ <path fill="#c2d3f4" d="M 92 12h1v1hNvN"/ <path fill="#c2d3f4" d="M 104 12h1v2h-4vNh3vN"/ <path fill="#c2d3f4" d="M 108 12h1v1hNvN"/ <path fill="#c2d3f4" d="M 6 13h3v1h-3vN"/ <path fill="#c2d3f4" d="M 22 13h4v1h-4vN"/ <path fill="#c2d3f4" d="M 28 13h1v1hNvN"/ <path fill="#c2d3f4" d="M 35 13h1v1hNvN"/ <path fill="#c2d3f4" d="M 39 13h2v1hTvN"/ <path fill="#c2d3f4" d="M 51 13h1v1hNvN"/ <path fill="#c2d3f4" d="M 55 13h2v1hTvN"/ <path fill="#c2d3f4" d="M 60 13h1v1hNvN"/ <path fill="#c2d3f4" d="M 69 13h1v1hNvN"/ <path fill="#c2d3f4" d="M 85 13h1v1hNvN"/ <path fill="#c2d3f4" d="M 88 13h1v1hNvN"/ <path fill="#c2d3f4" d="M 91 13h1v1hNvN"/ <path fill="#c2d3f4" d="M 107 13h1v1hNvN"/ <path fill="#c2d3f4" d="M 4 14h2v1hTvN"/ <path fill="#c2d3f4" d="M 9 14h1v1hNvN"/ <path fill="#c2d3f4" d="M 20 14h2v1hTvN"/ <path fill="#c2d3f4" d="M 26 14h2v1hTvN"/ <path fill="#c2d3f4" d="M 36 14h2v1hTvN"/ <path fill="#c2d3f4" d="M 41 14h1v1hNvN"/ <path fill="#c2d3f4" d="M 44 14h1v1hNvN"/ <path fill="#c2d3f4" d="M 52 14h2v1hTvN"/ <path fill="#c2d3f4" d="M 58 14h2v1hTvN"/ <path fill="#c2d3f4" d="M 70 14h2v1hTvN"/ <path fill="#c2d3f4" d="M 86 14h2v1hTvN"/ <path fill="#c2d3f4" d="M 89 14h2v1hTvN"/ <path fill="#c2d3f4" d="M 105 14h2v1hTvN"/ <path fill="#c2d3f4" d="M 10 15h2v1hTvN"/ <path fill="#c2d3f4" d="M 42 15h2v1hTvN"/',
      speed: 2000
    }     
  }
  const randomColor = () =>{
    const r = ()=> Math.ceil(Math.random() * 255)
    return `rgb(${r()},${r()},${r()})`
  }

  // const randomGreen = () =>{
  //   const r = ()=> Math.ceil(Math.random() * 80)
  //   const g = ()=> Math.ceil(Math.random() * 155) + 100
  //   const b = ()=> Math.ceil(Math.random() * 100)
  //   return `rgb(${r()},${g()},${b()})`
  // }
  
  const treeOne = () =>{
    return '<path fill="#3ddbbc" d="M 13 0 h 3 v 9 h -2 v -1 h -2 v -2 h -1 v -3 h -1 v -1 h 2 v -1 h 1 v -1"/> <path fill="#239f86" d="M 9 3 h 2 v 3 h 1 v 2 h 2 v 1 h 2 v 7 h -9 v -2 h -1 v -2 h -2 v -3 h 1 v -2 h 1 v -2 h 2 v -1 h 1 v -1"/> <path fill="#185463" d="M 3 12 h 3 v 2 h 1 v 2 h -6 v -1 h 1 v -1 h 1 v -2"/>'
  }

  const treeTwo = () =>{
    return '<path fill="#3ddbbc" d="M 0 0 h 3 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 2 h 1 v 2 h -2 v 1 h -1 v 1 h -4 v -1 h -1 v -2 h -1 v 1 h -2 v -9"/> <path fill="#239f86" d="M 2 8 h 1 v 2 h 1 v 1 h 4 v -1 h 1 v -1 h 3 v 3 h 1 v 2 h 1 v 1 h 1 v 1 h -15 v -7 h 2 v -1"/>'
  }

  const treeThree = () =>{
    return '<path fill="#185463" d="M 1 0 h 7 v 1 h 2 v 1 h 4 v -1 h 2 v 7 h -8 v -1 h -3 v -1 h -2 v -1 h -1 v -2 h -1 v -3"/> <path fill="#239f86" d="M 8 0 h 8 v 1 h -2 v 1 h -4 v -1 h -2 v -1"/> <path fill="#2e114b" d="M 11 8 h 3 v 4 h 2 v 3 h -4 v -1 h -1 v -1 h -1 v -1 h 1 v -4"/> <path fill="#542682" d="M 14 8 h 2 v 4 h -2 v -4"/> <path fill="#185463" d="M 10 10 h 1 v 2 h -1 v 1 h 1 v 1 h 1 v 1 h 4 v 1 h -5 v -1 h -1 v -1 h -1 v -3 h 1 v -1"/>'
  }

  const treeFour = () =>{
    return '<path fill="#239f86" d="M 0 0 h 1 v 1 h -1 v -1"/> <path fill="#185463" d="M 1 0 h 1 v 2 h 1 v 1 h 1 v 1 h 5 v -1 h 1 v -1 h 1 v -1 h 1 v 1 h 3 v 1 h -1 v 2 h -1 v 1 h -2 v 1 h -3 v 1 h -4 v 1 h -4 v -8 h 1 v -1"/> <path fill="#239f86" d="M 2 0 h 13 v 2 h -3 v -1 h -1 v 1 h -1 v 1 h -1 v 1 h -5 v -1 h -1 v -1 h -1 v -2"/> <path fill="#542682" d="M 4 8 h 1 v 4 h -1 v 1 h -4 v -4 h 4 v -1"/> <path fill="#185463" d="M 5 10 h 1 v 1 h 1 v 3 h -1 v 1 h -1 v 1 h -5 v -1 h 4 v -1 h 1 v -1 h 1 v -1 h -1 v -2"/> <path fill="#2e114b" d="M 4 12 h 2 v 1 h -1 v 1 h -1 v 1 h -4 v -2 h 4 v -1"/>'
  }

  const tree = () =>{
    // return 'D 5 0h6v1h2v1h1v1h1v1h1v7hNv1hNv1hNv1hTv2hNv-3hNvNhTv1hNv3hNvThTvNhNvNhNvNhNv-7h1vNh1vNh1vNh2vN"/ F 7 12h2v1h1v3h-4v-3h1vN"/'
    return '<path fill="#3ddbbc" d="M 6 1 h 4 v 1 h 1 v 1 h 1 v 3 h -1 v -1 h -1 v 1 h -1 v -2 h -1 v 1 h -1 v -2 h -1 v -2"/> <path fill="#239f86" d="M 5 2 h 1 v 1 h 1 v 2 h 1 v -1 h 1 v 2 h 1 v -1 h 1 v 1 h 2 v 6 h -1 v -1 h -1 v -1 h -1 v 1 h -1 v -1 h -1 v 1 h -1 v -1 h -1 v -2 h -1 v 1 h -1 v -1 h -1 v -2 h 1 v -3 h 1 v -1"/> <path fill="#185463" d="M 3 8 h 1 v 1 h 1 v -1 h 1 v 2 h 1 v 1 h 1 v -1 h 1 v 1 h 1 v -1 h 1 v 1 h 1 v 2 h -2 v 1 h -2 v -1 h -4 v -1 h -1 v -4"/> <path fill="#2e114b" d="M 6 13 h 2 v 1 h 2 v 2 h -4 v -3"/>'
    // return `<path fill="#51c8e6" d="M 6 5 h 4 v 1 h 1 v 1 h 1 v 3 h -1 v -1 h -1 v 1 h -1 v -2 h -1 v 1 h -1 v -2 h -1 v -2"/> <path fill="#2fa4c1" d="M 5 6 h 1 v 1 h 1 v 2 h 1 v -1 h 1 v 2 h 1 v -1 h 1 v 1 h 2 v 6 h -1 v -1 h -1 v -1 h -1 v 1 h -1 v -1 h -1 v 1 h -1 v -1 h -1 v -2 h -1 v 1 h -1 v -1 h -1 v -2 h 1 v -3 h 1 v -1"/> <path fill="#247589" d="M 3 12 h 1 v 1 h 1 v -1 h 1 v 2 h 1 v 1 h 1 v -1 h 1 v 1 h 1 v -1 h 1 v 1 h 1 v 2 h -1 v 2 h -3 v -1 h -3 v -1 h -1 v -1 h -1 v -4"/> <path fill="#239f86" d="M 5 18 h 1 v 1 h 1 v 2 h 1 v -1 h 1 v 2 h 1 v -1 h 1 v 1 h 2 v 6 h -1 v -1 h -1 v -1 h -1 v 1 h -1 v -1 h -1 v 1 h -1 v -1 h -1 v -2 h -1 v 1 h -1 v -1 h -1 v -2 h 1 v -3 h 1 v -1"/> <path fill="#3ddbbc" d="M 6 18 h 2 v 1 h 4 v 3 h -1 v -1 h -1 v 1 h -1 v -2 h -1 v 1 h -1 v -2 h -1 v -1"/> <path fill="#185463" d="M 3 24 h 1 v 1 h 1 v -1 h 1 v 2 h 1 v 1 h 1 v -1 h 1 v 1 h 1 v -1 h 1 v 1 h 1 v 2 h -2 v 1 h -2 v -1 h -4 v -1 h -1 v -4"/> <path fill="#2e114b" d="M 6 29 h 2 v 1 h 2 v 2 h -4 v -3"/>`
  }

  const flowers = () =>{
    return 'D 2 1h2v1hTvN"/ D 1 2h1v1hNvN"/ D 4 2h1v1hNvN"/ D 2 3h2v1hTvN"/ D 11 4h2v1hTvN"/ D 10 5h1v1hNvN"/ D 13 5h1v1hNvN"/ D 11 6h2v1hTvN"/ D 4 8h2v1hTvN"/ D 3 9h1v1hNvN"/ D 6 9h1v1hNvN"/ D 4 10h2v1hTvN"/ D 13 12h2v1hTvN"/ D 12 13h1v1hNvN"/ D 15 13h1v1hNvN"/ D 13 14h2v1hTvN"/'
  }

  const buildingCorner = subColor =>{
    return `D 5 0h11v1hN1vN"/ D 3 1h2v1hTvN"/ <path fill="${subColor || 'white'}" d="M 5 1h11v15hN5vN1h1vTh1vNh2vN"/ D 2 2h1v1hNvN"/ D 1 3h1v2hNvT"/ D 0 5h1v11hNvN1"/`
  }

  const roofCorner = subColor =>{
    return `D 0 0h1v11h1v2hNv3hNvN6"/ <path fill="${subColor || 'white'}" d="M 1 0h15v15hN1vNhTvNhNvThNvN1"/ F 1 13h1v1h1v1h2v1h-4v-3"/ D 2 13h1v1hNvN"/ D 3 14h2v1hTvN"/ D 5 15h11v1hN1vN"/`
  }

  const checkered = () =>{
    return 'D 0 0h2v2hTvT"/ D 4 0h2v2hTvT"/ D 8 0h2v2hTvT"/ D 12 0h2v2hTvT"/ D 2 2h2v2hTvT"/ D 6 2h2v2hTvT"/ D 10 2h2v2hTvT"/ D 14 2h2v2hTvT"/ D 0 4h2v2hTvT"/ D 4 4h2v2hTvT"/ D 8 4h2v2hTvT"/ D 12 4h2v2hTvT"/ D 2 6h2v2hTvT"/ D 6 6h2v2hTvT"/ D 10 6h2v2hTvT"/ D 14 6h2v2hTvT"/ D 0 8h2v2hTvT"/ D 4 8h2v2hTvT"/ D 8 8h2v2hTvT"/ D 12 8h2v2hTvT"/ D 2 10h2v2hTvT"/ D 6 10h2v2hTvT"/ D 10 10h2v2hTvT"/ D 14 10h2v2hTvT"/ D 0 12h2v2hTvT"/ D 4 12h2v2hTvT"/ D 8 12h2v2hTvT"/ D 12 12h2v2hTvT"/ D 2 14h2v2hTvT"/ D 6 14h2v2hTvT"/ D 10 14h2v2hTvT"/ D 14 14h2v2hTvT"/'
  }

  const plain = subColor =>{
    return `<path fill="${subColor || 'white'}" d="M 0 0h16v16hN6vN6"/`
  }

  const plainEdge = subColor =>{
    return `D 0 0h16v1hN6vN"/ <path fill="${subColor || 'white'}" d="M 0 1h16v15hN6vN5"/`
  }

  const door = () =>{
    return 'F 0 0h16v15hNvN0hNvThTvNhTvNh-4v1hTv1hTv2hNv10hNvN5"/ D 6 1h4v1h2v1h2v2h1v10h1v1hN6vNh1vN0h1vTh2vNh2vN"/'
  }

  const roundWindow = () =>{
    return 'F 0 0h16v16hN6vN6"/ D 6 2h4v1h2v1h1v2h1v4hNv2hNv1hTv1h-4vNhTvNhNvThNv-4h1vTh1vNh2vN"/'
  }

  const squareWindow = () =>{
    return 'F 0 0h16v16hN6vN6"/ D 5 2h6v1h1v10hNv1h-6vNhNvN0h1vN"/'
  }

  const sideSquareWindow = () =>{
    return 'D 0 0h1v16hNvN6"/ F 1 0h15v16h-3vNh1v-9hNvNh-4v1hNv9h1v1h-8vN6"/ D 9 5h4v1h1v9hNv1h-4vNhNv-9h1vN"/'
  }

  const noSideWindow = () =>{
    return 'F 0 0h16v16h-3vNh1v-9hNvNh-4v1hNv9h1v1h-9vN6"/ D 9 5h4v1h1v9hNv1h-4vNhNv-9h1vN"/`'
  }

  const roofCurve = subColor =>{
    return `<path fill="${subColor || 'white'}" d="M 0 0h16v15hTvNhNvNhNvNhTvNh-4v1hTv1hNv1hNv1hTvN5"/ D 6 11h4v1h-4vN"/ D 4 12h2v1hTvN"/ F 6 12h4v1h2v1h1v1h1v1hN2vNh1vNh1vNh2vN"/ D 10 12h2v1hTvN"/ D 3 13h1v1hNvN"/ D 12 13h1v1hNvN"/ D 2 14h1v1hNvN"/ D 13 14h1v1hNvN"/ D 0 15h2v1hTvN"/ D 14 15h2v1hTvN"/`
  }

  const roofTopBottomCorner = subColor =>{
    return `D 0 0h1v11hNvN1"/ F 1 0h15v15hN1vNhTvNhNvThNvN1"/ <path fill="${subColor || 'white'}" d="M 0 11h1v2h1v1h1v1h2v1h-5v-5"/ D 1 11h1v2hNvT"/ D 2 13h1v1hNvN"/ D 3 14h2v1hTvN"/ D 5 15h11v1hN1vN"/`
  }

  const river = () =>{
    const main = '#58d3d8'
    const sub = '#a2fcf0'

    return `<path fill="${main}" d="M 0 0h2v7h2v-7h12v16hTv-7hTv7hN2vN6"/ <path fill="${sub}" d="M 2 0h2v7hTv-7"/ <path fill="${sub}" d="M 7 4h2v8hTv-8"/ <path fill="${sub}" d="M 12 9h2v7hTv-7"/`
  }

  const riverAnim = () =>{
    const main = '#58d3d8'
    const sub = '#a2fcf0'

    return `<path fill="${main}" d="M 0 0h7v4h2v-4h7v16h-7v-5hTv5h-7vN6"/ <path fill="${sub}" d="M 7 0h2v4hTv-4"/ <path fill="${sub}" d="M 12 3h2v9hTv-9"/ <path fill="${sub}" d="M 2 4h2v9hTv-9"/ <path fill="${sub}" d="M 7 11h2v5hTv-5"/`
  }

  const riverCurve = () =>{
    const main = '#58d3d8'
    const sub = '#a2fcf0'

    return `<path fill="${main}" d="M 8 0h8v16h-7v-4h1vTh1vNh2vThTv1hNv1hNv1hNv2hNv4h-7v-8h1vTh1vTh1vNh1vNh2vNh2vN"/ <path fill="${sub}" d="M 10 2h5v2h-5v1hTv1hNv1hTvTh2vNh1vNh2vN"/ <path fill="${sub}" d="M 11 7h2v2hTv1hNv2hNv4hTv-4h1vTh1vNh1vNh1vN"/`
  }

  const riverCurveAnim = () =>{
    const main = '#58d3d8'
    const sub = '#a2fcf0'

    return `<path fill="${main}" d="M 8 0h8v2h-3v1h-4v2h4vNh3v8hTv1hTv3h-8v-5h1vThTv2hNv5hTv-8h1vTh1vTh1vNh1vNh2vNh2vN"/ <path fill="${sub}" d="M 13 2h3v2h-3v1h-4vTh4vN"/ <path fill="${sub}" d="M 10 7h3v2h-3v1hNv1hTvTh1vNh2vN"/ <path fill="${sub}" d="M 3 9h2v2hNv5hTv-5h1vT"/ <path fill="${sub}" d="M 14 12h2v2hTv2hTv-3h2vN"/ <path fill="${main}" d="M 14 14h2v2hTvT"/`
    
  }

  const ladder = subColor =>{
    return `<path fill="${subColor || 'white'}" d="M 0 0h16v16hN6vN6"/ D 3 1h1v1hNvN"/ D 12 1h1v1hNvN"/ D 4 2h8v1h-8vN"/ D 3 5h1v1hNvN"/ D 12 5h1v1hNvN"/ D 4 6h8v1h-8vN"/ D 3 9h1v1hNvN"/ D 12 9h1v1hNvN"/ D 4 10h8v1h-8vN"/ D 3 13h1v1hNvN"/ D 12 13h1v1hNvN"/ D 4 14h8v1h-8vN"/`
  }

  const ladderHole = subColor =>{
    return `D 0 0h16v1hNv10hNv2hTv1hTv1h-4vNhTvNhTvThNvN0hNvN"/ F 0 1h1v10h1v2h2v1h2v1h4vNh2vNh2vTh1vN0h1v15hN6vN5"/ <path fill="${subColor}" d="M 3 1h1v1hNvN"/ <path fill="${subColor}" d="M 12 1h1v1hNvN"/ <path fill="${subColor}" d="M 4 2h8v1h-8vN"/ <path fill="${subColor}" d="M 3 5h1v1hNvN"/ <path fill="${subColor}" d="M 12 5h1v1hNvN"/ <path fill="${subColor}" d="M 4 6h8v1h-8vN"/ <path fill="${subColor}" d="M 3 9h1v1hNvN"/ <path fill="${subColor}" d="M 12 9h1v1hNvN"/ <path fill="${subColor}" d="M 4 10h8v1h-8vN"/`
  } 

  const exit = subColor =>{
    return `<path fill="${subColor}" d="M 0 0h16v4hTv2hTvThTv2hTvThTv2hTvThTv2hTv-6"/ D 2 4h2v2hTvT"/ D 6 4h2v2hTvT"/ D 10 4h2v2hTvT"/ D 14 4h2v2hTvT"/ D 0 6h2v2h2vTh2v2h2vTh2v2h2vTh2v2h2v8hN6vN0"/ <path fill="${subColor}" d="M 2 6h2v2hTvT"/ <path fill="${subColor}" d="M 6 6h2v2hTvT"/ <path fill="${subColor}" d="M 10 6h2v2hTvT"/ <path fill="${subColor}" d="M 14 6h2v2hTvT"/`
  }

  const sub = '#f9ede5'
  const main = '#74645a'

  const svgData = {
    'ta': { svg: treeOne },
    'tb': { svg: treeTwo },
    'tc': { svg: treeThree },
    'td': { svg: treeFour },
    't': { svg: tree, color: '#0d8799' },
    'w': { svg: tree, color: '#0d8799' },
    'o': { svg: flowers, color: randomColor },
    'd': { svg: buildingCorner, color: main, subColor: sub },
    's': { svg: buildingCorner, color: main, subColor: sub, rotate: 90 },
    'bt': { svg: buildingCorner, color: main },
    'br': { svg: buildingCorner, color: main, rotate: 90 },
    'bb': { svg: buildingCorner, color: main, rotate: 180 },
    'bl': { svg: buildingCorner, color: main, rotate: 270 },
    'bx': { svg: roofTopBottomCorner, color: main, subColor: '#0d8799' },
    'by': { svg: roofTopBottomCorner, color: main, subColor: '#0d8799', flip: 'h' },
    'rr': { svg: roofTopBottomCorner, color: main, subColor: sub },
    'rl': { svg: roofTopBottomCorner, color: main, subColor: sub, flip: 'h' },
    'rt': { svg: roofTopBottomCorner, rotate: 180, color: main, subColor: sub },
    'ry': { svg: roofTopBottomCorner, rotate: 180, color: main, subColor: sub, flip: 'h' },
    'g': { svg: roofCorner, color: main, subColor: sub },
    'y': { svg: roofCorner, color: main, subColor: sub, flip: 'h' },
    'p': { svg: plain },
    'rp': { svg: plain, subColor: sub },
    'do': { svg: door, color: main },
    'wi': { svg: roundWindow, color: main },
    'sw': { svg: squareWindow, color: main },
    'sl': { svg: sideSquareWindow, color: main },
    'sr': { svg: sideSquareWindow, color: main, flip: 'h' },
    'nw': { svg: noSideWindow, color: main },
    'nr': { svg: noSideWindow, color: main, flip: 'h' },
    'at': { svg: plainEdge, color: main  },
    'ar': { svg: plainEdge, color: main, rotate: 90 },
    'ab': { svg: plainEdge, color: main, rotate: 180 },
    'al': { svg: plainEdge, color: main, rotate: 270 },
    'rc': { svg: roofCurve, color: main, subColor: sub },
    'pt': { svg: plainEdge, color: main, subColor: sub },
    'pr': { svg: plainEdge, color: main, subColor: sub, rotate: 90 },
    'pb': { svg: plainEdge, color: main, subColor: sub, rotate: 180 },
    'pu': { svg: plainEdge, color: main, subColor: sub, rotate: 270 },
    'b': { svg: plain, subColor: '#a2fcf0' },
    'bd': { svg: plain, subColor: '#0d8799' },
    'r': { svg: river, animation: riverAnim },
    'rh': { svg: river, rotate: 90, animation: riverAnim },
    'ra': { svg: riverCurve, animation: riverCurveAnim },
    'rb': { svg: riverCurve, rotate: 90, animation: riverCurveAnim },
    'rd': { svg: riverCurve, rotate: 180, animation: riverCurveAnim },
    're': { svg: riverCurve, rotate: 270, animation: riverCurveAnim },
    'la': { svg: ladder, color: main, subColor: sub },
    'c': { svg: checkered, color: '#a2e8fc' },
    'e': { svg: exit, color: '#0d8799', subColor: '#fff' },
    'lh': { svg: ladderHole, color: '#bba293', subColor: sub }
  }

    
  const mapData = {
    one: {
      iWidth: 30,
      iHeight: 20,
      characters: [
        { pos: 155, avatar: 'bunny', spritePos: 0, event: 'hello' },
        { pos: 156, avatar: 'bunny', spritePos: 0, event: 'apple' },
        { pos: 309, avatar: 'bunny', spritePos: 0, event: 'tomato' },
      ],
      events: {
        5: { event: transport, gateway: 'portal3'},
        6: { event: transport, gateway: 'portal3'},
        419: { event: transport, gateway: 'portal4'},
        449: { event: transport, gateway: 'portal4'},
        253: { event: transport, gateway: 'portal7'},
        288: { event: transport, gateway: 'portal6'},
        167: { event: transport, gateway: 'portal13'},
      },
      map: 'v5,b2,v24,w4,b2,w22,v2,w1,b14,d1,pt2,s1,b8,w1,v2,w1,b12,t1,b1,g1,pb2,y1,b6,t1,b1,w1,v2,w1,b2,t1,b10,d1,al1,p1,nr1,sr1,pt1,s1,b6,w1,v2,w1,b10,d1,pt2,pu1,rr1,do1,ab1,rl1,rp1,pr1,b6,w1,v2,w1,b6,t1,b3,g1,rc1,pb1,g1,pb5,y1,b6,w1,v2,w1,b10,sl1,p1,nr1,al1,p5,ar1,b6,w1,v2,w1,b10,bl1,do1,ab1,al1,wi1,p1,sw1,p1,wi1,ar1,b2,d1,pt1,s1,b1,w1,v2,w1,b13,bl1,ab2,do1,ab2,bb1,b2,g1,rc1,y1,b1,w1,v2,w1,b1,t1,b3,t1,b3,t1,b12,sl1,p1,sr1,b1,w1,v2,w1,b19,t1,b2,bl1,do1,bb1,b1,w1,v2,w1,b2,t1,b6,ra1,rh5,rb1,b10,w1,v2,w1,b5,ra1,rh3,rd1,b5,r1,b12,v1,w1,b5,r1,b7,w1,b1,r1,b7,t1,b4,v1,w1,b1,t1,b3,r1,b1,t1,b7,r1,b4,t1,b5,w1,v2,w1,b5,r1,b5,w1,b3,re1,rh2,rb1,b7,w1,v2,w1,b5,r1,b12,r1,b7,w1,v2,w6,r1,w12,r1,w8,v8,r1,v12,r1,v9',
      eventContents: {
        hello: { first:{ text:['hello!'], }, },
        tomato: {
          first:{ text:['hello!', 'test'], },
        },
        apple: {
          first:{ 
              text:['how are you?', 'test'], 
              choice: {
                'okay': 's_1',
                'not so good': 's_2',
                'banana' : 'banana'
              }
            },
          s_1: {
            text: ['yeah!'], 
              choice: {
                'yes': 's_3',
                'no': 's_4'
              }
            },
          s_2: {
            text: ['really?'], 
              choice: {
                'yes': 's_3',
                'no': 's_4'
              }
            },
          s_3: { text: ['cool!','cool two'] },
          s_4: { text: ['whatever'] },  
          banana: { text: ['banana!', 'bananananana!'] }  
        }
      },
      entry: {
        start: {
          map: 'one',
          cell: 313,
        },
        portal3: {
          map: 'three',
          cell: 224,
          direction: 'up'
        },
        portal4: {
          map: 'four',
          cell: 81,
          direction: 'right'
        },
        portal7: {
          map: 'house_one_0',
          cell: 62,
          direction: 'up',
          noWall: ['bt','at','rtl','rtr','ar','bx','ab','by','p','la','e']
        },
        portal6: {
          map: 'house_one_0',
          cell: 79,
          direction: 'up',
          noWall: ['bt','at','rtl','rtr','ar','bx','ab','by','p','la','e']
        },
        portal13: {
          map: 'house_one_1',
          cell: 26,
          direction: 'up',
          noWall: ['ry','bt','at','rtl','rtr','ar','bx','ab','by','p','la','lh','e']
        },
      },
    },
    two: {
      iWidth: 40,
      iHeight: 30,
      characters: [
        { pos: 779, avatar: 'bunny', spritePos: 0, event: 'hello' },
      ],
      events: {
        1178: { event: transport, gateway: 'portal1'},
        1179: { event: transport, gateway: 'portal1'},
        1180: { event: transport, gateway: 'portal1'},
      },
      map: 'v18,b3,v20,w17,b3,w12,v8,w1,b30,w1,v2,t1,v5,w1,b11,t1,b18,w1,v8,w1,b6,t1,b19,t1,b3,w1,v5,t1,v2,w1,b2,t1,b27,w1,v8,w1,b18,t1,b2,t1,b8,w7,v2,w1,b36,w1,v2,w1,b11,t1,b24,w1,v2,w1,b33,t1,b2,w1,v2,w1,b6,t1,b29,w1,v2,w1,b2,t1,b20,o8,b5,w1,v2,w1,b23,o8,b5,w1,v2,w1,b16,t1,b6,o8,b5,w1,v2,w1,b23,o8,b2,t1,b2,w1,v2,w1,b23,o8,b5,w1,v2,w1,b3,t1,b8,t1,b10,o8,b5,w1,v2,w1,b36,w1,v2,w1,b36,w1,v2,w1,b7,t1,b25,t1,b2,w1,v2,w1,b36,w1,v2,w13,b24,w1,v14,w1,b4,t1,b4,t1,b9,t1,b4,w1,v4,t1,v4,t1,v4,w1,b24,w1,v14,w1,b24,w1,v6,t1,v7,w1,b1,t1,b22,w1,v12,t1,v1,w1,b12,t1,b3,t1,b2,t1,b4,w1,v14,w1,b24,w1,v4,t1,v5,t1,v3,w5,b3,w18,v19,b3,v19',
      eventPoints: {
        hello: { text: ['hello!'] },
      },
      entry: {
        portal1: {
          map: 'one',
          cell: 35,
          direction: 'down',
        },
      }
    },
    three: {
      iWidth: 18,
      iHeight: 14,
      characters: [
        { pos: 135, avatar: 'bunny', spritePos: 9, event: 'hello' },
        { pos: 101, avatar: 'bunny', spritePos: 6, event: 'hello' },
        { pos: 165, avatar: 'bunny', spritePos: 3, event: 'hello' },
      ],
      events: {
        241: { event: transport, gateway: 'portal1'},
        242: { event: transport, gateway: 'portal1'},
        243: { event: transport, gateway: 'portal1'},
        62: { event: check, index: 'tree1'},
        112: { event: check, index: 'bunny1'},
      },
      // map: 'v19,w16,v2,w1,b1,o3,b6,o3,b1,w1,v2,w1,b14,w1,v2,w1,b14,w1,v2,w1,b1,o1,b10,o1,b1,w1,v2,w1,b1,o1,b10,o1,b1,w1,v2,w1,b1,o1,b10,o1,b1,w1,v2,w1,b14,w1,v2,w1,b14,w1,v2,w1,b14,w1,v2,w1,b1,o3,b6,o3,b1,w1,v2,w6,b3,w7,v8,b3,v8',
      map: 'v19,ta1,tb1,ta1,tb1,ta1,tb1,ta1,tb1,ta1,tb1,ta1,tb1,ta1,tb1,ta1,tb1,v2,tc1,td1,tc1,td1,tc1,td1,tc1,td1,tc1,td1,tc1,td1,tc1,td1,tc1,td1,v2,ta1,tb1,b12,ta1,tb1,v2,tc1,td1,b12,tc1,td1,v2,ta1,tb1,o1,b10,o1,ta1,tb1,v2,tc1,td1,o1,b6,ta1,tb1,b2,o1,tc1,td1,v2,ta1,tb1,o1,b6,tc1,td1,b2,o1,ta1,tb1,v2,tc1,td1,b12,tc1,td1,v2,ta1,tb1,b12,ta1,tb1,v2,tc1,td1,b12,tc1,td1,v2,ta1,tb1,ta1,tb1,ta1,tb1,b2,ta1,tb1,ta1,tb1,ta1,tb1,ta1,tb1,v2,tc1,td1,tc1,td1,tc1,td1,b2,tc1,td1,tc1,td1,tc1,td1,tc1,td1,v8,b2,v9',
      eventContents: {
        hello: { first:{ text:['hello!'], }, },
        tree1: {
          text: [
            'hello! I\'m a tree!',
            'yeah!'
          ],
          art: 'http://masahito.co.uk/img/icecream_bunny.png',
          // item: null,
          direction: 'up'
        },
        bunny1: {
          text: ['hello! Bunny!'],
          // item: null,
          direction: 'left'
        },
      },
      entry: {
        portal1: {
          map: 'one',
          cell: 35,
          direction: 'down',
        },
      }
    },
    four: {
      iWidth: 20,
      iHeight: 10,
      events: {
        80: { event: transport, gateway: 'portal5'},
        100: { event: transport, gateway: 'portal5'},
      },
      map: 'v21,w14,v6,w1,b12,w1,v6,w1,b2,o3,b7,w5,v1,b18,w1,v1,b18,w1,v2,w1,b12,o3,b1,w1,v2,w1,b16,w1,v2,w18,v21',
      entry: {
        portal5: {
          map: 'one',
          cell: 418,
          direction: 'left'
        },
      }
    },
    house_one_0: {
      name: 'house_one_0',
      iWidth: 12,
      iHeight: 9,
      events: {
        74: { event: transport, gateway: 'portal8'},
        91: { event: transport, gateway: 'portal9'},
        5: { event: transport, gateway: 'portal10'},
      },
      map: 'bd4,rp1,la1,rp5,bd5,rp1,la1,rp5,bd2,rp4,la1,rp5,bd2,rp3,ry1,at5,rt1,bd2,ry1,at2,p6,ar1,bd2,bx1,p1,ab1,p6,ar1,bd3,e1,bd1,bx1,ab2,p1,ab2,by1,bd8,e1,bd16',
      entry: {
        portal8: {
          map: 'one',
          cell: 283,
          direction: 'down',
        },
        portal9: {
          map: 'one',
          cell: 318,
          direction: 'down',
        },
        portal10: {
          map: 'house_one_1',
          cell: 21,
          direction: 'down',
          noWall: ['ry','bt','at','rtl','rtr','ar','bx','ab','by','p','la','lh','e']
        }, 
      }
    },
    house_one_1: {
      iWidth: 6,
      iHeight: 6,
      events: {
        20: { event: transport, gateway: 'portal11'},
        32: { event: transport, gateway: 'portal12'},
      },
      map: 'bd7,rp4,bd2,rp1,la1,rp2,bd2,ry1,lh1,at1,rt1,bd2,bx1,p1,ab1,by1,bd3,e1,bd3',
      entry: {
        portal11: {
          map: 'house_one_0',
          cell: 5,
          direction: 'up',
          noWall: ['bt','at','rtl','rtr','ar','bx','ab','by','p','la','e']
        },
        portal12: {
          map: 'one',
          cell: 197,
          direction: 'down',
          noWall: ['d','pt','s','pu','rp','pr','g','pb','y','do']
        },
      }
    }
  }


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

  
  // map related variables
  let height
  let width
  let iHeight
  let iWidth
  let start
  const cellD = 32
  let minicellD 
  const mapXY = {
    x: null,
    y: null
  }
  let mapTiles
  let locationTiles
  let mapImageTiles

  // gameplay related variables
  let mapKey = 'one'
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
    prevChoices: {}, 
    animationTimer: [],
    //? could this be renamed to something else?
    dialogue: {},
    dialogueKey: null,
    dialogueHistory: []
  }

  const directionKey = {
    9: 'right',
    6: 'left',
    3: 'up',
    0: 'down',
  }


  const setWidthAndHeight = ()=>{
    const { offsetWidth: w, offsetHeight:h } = wrapper
    const pWidth = w < 800 ? w : 800
    width = 2 * Math.floor((pWidth / cellD) / 2)
    const pHeight = h < 600 ? h : 600
    height = 2 * Math.floor((pHeight / cellD) / 2)
  }

  const setLocation = key => {
    mapKey = key
    setWidthAndHeight()
    
    const { iWidth:w, iHeight:h } = mapData[mapKey]   
    // TODO where does this get used?
    iHeight = h
    iWidth = w
    location.innerHTML = mapMap(w, h,'location_indicator_tile')
    locationTiles = document.querySelectorAll('.location_indicator_tile')
    mapImage.innerHTML = mapMap(w, h,'map_image_tile', mapImageTiles)
    mapImageTiles = document.querySelectorAll('.map_image_tile')
  }


  const placeInCenterOfMap = () =>{
    start = Math.floor((width * height) / 2) - Math.floor((width / 2)) - 1
  }

  const mapMap = (w, h, classToAdd)=>{
    const mapArr = new Array(w * h).fill('').map((_ele, i)=>i)
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

  const adjustRectSize = (target, w, h, cellD, cells) =>{
    target.style.width = `${w * cellD}px`
    target.style.height = `${h * cellD}px` 
    cells 
      ? cells.forEach(cell=>{
        cell.style.width = `${cellD}px`
        cell.style.height = `${cellD}px`
      })
      : ''
  }

  let noWallList = ['b','do'] //! maybe switch this depending on the map?
  const noLeftEdgeList = ['pu','g']

  const noWall = pos =>{    
    if (!mapImageTiles[pos] || bear.pos === pos || spawnData.filter(s=>s.pos === pos).length) return false

    // prevents sprite walking beyond edge
    if (bear.facingDirection === 'left' && noLeftEdgeList.filter(w => mapImageTiles[pos + 1].classList.contains(w)).length) return false
    return noWallList.filter(w => mapImageTiles[pos].classList.contains(w)).length
  }

  const populateWithSvg = (key, target) =>{
    if (svgData[key]){
      const { svg, color, subColor, rotate, flip, animation } = svgData[key]
      let colorAction = ''
      colorAction = typeof(color) === 'function' ? color() : color

      const svgContent = `
      ${animation 
    ? `${svgWrapper(
      {
      content: decode(subColor ? animation(subColor) : animation()),
      color: color ? colorAction : '',
      rotate,
      flip,
      wrapper: 'svg_anim_wrap', 
      }
    )}`
    : ''
}
          ${svgWrapper(
    {
    content: decode(subColor ? svg(subColor) : svg()),
    color: color ? colorAction : '',
    rotate,
    flip,
    wrapper: 'svg_wrap',
    }
  )}  
      `
      target.innerHTML = svgContent
    } 
  }

  const setUpWalls = target =>{
    const decompressedMap = decompress(mapData[mapKey].map)
    target.forEach((tile,i)=>{
      const letterCode = decompressedMap[i]
      tile.classList.add(letterCode)

      if (svgData[letterCode])  {
        populateWithSvg(letterCode, tile) 
      }
    })
  }
  
  const spawnWalk = (actor, para, m, spawn) =>{
    actor[para] += m
    spawn.style[para] = `${actor[para]}px`
  }
  
  const spawnMotion = (spawn, i) =>{
    if (spawnData[i].pause || !windowActive) return
    const motionOption = [
      ()=>spriteWalk('down', spawnData[i], sprites[i], spawn),
      ()=>spriteWalk('right', spawnData[i], sprites[i], spawn),
      ()=>spriteWalk('up', spawnData[i], sprites[i], spawn),
      ()=>spriteWalk('left', spawnData[i], sprites[i], spawn)
    ]
    motionOption[Math.floor(Math.random() * 4)]()
  }

  const setPos = (key,num,dir) =>{
    mapXY[key] = num
    mapImage.style[dir] = `${num}px`
  }

  const setSpritePos = (num, actor, sprite) =>{
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

    mapData[mapKey].characters?.forEach((c, i)=>{
      const { pos, avatar, spritePos, event } = c
      const sx = Math.floor(pos % iWidth) * cellD
      const sy = Math.floor(pos / iWidth) * cellD
      spawnData[i] = {
        interval: null,
        left: sx,
        top: sy,
        animationTimer: ['',''],
        spritePos,
        event,
        pos
      }

      const spawnContainer = document.createElement('div')
      spawnContainer.classList.add('spawn_container')
      spawnContainer.style.left = `${sx}px`
      spawnContainer.style.top = `${sy}px`

      const spawn = document.createElement('div')
      const sprite = () =>{
        return `
        <svg class="sprite" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 112 16" style="height: ${cellD}px; width: ${cellD * 7}px;">
          ${decode(avatars[avatar].sprite)}
        </svg>  
        `
      }

      spawn.innerHTML = sprite()
      // spawn.innerHTML = spriteContainer.innerHTML //! this needs to be changed to whatever defined in avatar object
      spawn.classList.add('spawn')
      // spawn.style.fill = randomColor()
      spawn.style.fill = '#74645a'
      spawnContainer.appendChild(spawn)    
      mapImage.appendChild(spawnContainer)    
      spawnData[i].interval = setInterval(()=>{
        spawnMotion(spawnContainer, i)
      }, avatars[avatar].speed)
    })

    sprites = document.querySelectorAll('.sprite')
    sprites.forEach((sprite, i)=>{
      if (i === sprites.length - 1) return
      sprites[i].style.animationDelay = `${i * 0.1}s`
      turnSprite(directionKey[spawnData[i].spritePos], spawnData[i], sprite,false)
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

  const talk = () => {
    const key = { right: 1, left: -1, up: -iWidth, down: iWidth }
    const targetDirection = key[bear.facingDirection]
    const talkTargetIndex = spawnData.findIndex(actor => actor.pos === bear.pos + targetDirection)
  
    if (talkTargetIndex !== -1) {
      const talkTarget = spawnData[talkTargetIndex]
      talkTarget.pause = true
      const opposite = Object.keys(key).find(k => key[k] === targetDirection * -1)
      turnSprite(opposite, talkTarget, sprites[talkTargetIndex], false)
      
      if (!bear.dialogueKey) {
        bear.dialogue = mapData[mapKey].eventContents[talkTarget.event]
        bear.dialogueKey = 'first'
      }

      bear.dialogue[bear.dialogueKey].text.length !== bear.textCount
        ? displayText(bear.textCount, false)
        : clearText()
    } 
  }
  

  
  // displays multiple choice
  const displayAnswer = prev =>{ 
    const eventPoint = bear.dialogue[bear.dialogueKey]
    bear.pause = true
    bear.choice = prev ? bear.prevChoices[bear.dialogueKey] : 0 
    bear.optionTexts = Object.keys(eventPoint.choice)
    texts[1].innerHTML = bear.optionTexts.map((qu, i)=>{
      return `
        <div class="option ${i === bear.choice && 'selected'}">
          ${qu}
        </div>`
    }).join('')
    
    // makes multiple choice clickable
    bear.options = document.querySelectorAll('.option')
    bear.options.forEach((op, i)=>{
      op.addEventListener('click',()=>{
        bear.options.forEach(op => op.classList.remove('selected'))
        op.classList.add('selected')

        bear.choice = i
        select()
      })
    })
  }

  const displayTextGradual = (t, i) =>{
    texts[0].innerHTML = t.slice(0, i)
    if (i < t.length) {
      setTimeout(()=>{
        displayTextGradual(t, i + 1)
      },30)
    }
  }

  const clearText = () =>{
    bear.textCount = 0
    bear.prevChoices = {}
    bear.motion = true
    bear.pause = false
    bear.dialogueHistory.length = 0
    bear.dialogue = {}
    bear.dialogueKey = null

    texts.forEach(t => t.innerText = '')
    transitionCover.innerHTML = ''
  }

  const displayText = (count, prev) =>{
    const eventPoint = bear.dialogue[bear.dialogueKey]

    if (count < eventPoint.text.length){
      const text = eventPoint.text[count]

      bear.textCount++
      bear.motion = false
      displayTextGradual(text, 0)
      if (eventPoint.choice && count === eventPoint.text.length - 1) {
        displayAnswer(prev)
      } 
      return
    }
    clearText()
  }

  const investigate = (count, eventPoint) =>{
    if (count < eventPoint.text.length){
      // displays text and answer
      const text = eventPoint.text[count]
      bear.textCount++
      bear.motion = false
      displayTextGradual(text, 0)
      if (eventPoint.art) transitionCover.innerHTML = `
        <div>
          <img src=${eventPoint.art} />
        </div>
      `
      return
    }
    clearText()
  }


  function check(count){
    const event = mapData[mapKey].events[bear.pos]
    if (event) {
      const eventPoint = mapData[mapKey].eventContents[event.index]
      if (eventPoint && bear.facingDirection === eventPoint.direction) {
        investigate(count, eventPoint)
        return
      }
    }
    talk()
  }

  function transport(key){
    transition()

    mapImage.classList.add('transition')
    setTimeout(()=> mapImage.classList.remove('transition'),400)
    const entryPoint = mapData[mapKey].entry[key]
    if (!entryPoint) return // this added to prevent error when user walks too fast
    
    noWallList = entryPoint.noWall || ['b','do']
    setLocation(entryPoint.map)
    bear.pos = entryPoint.cell
    setWidthAndHeightAndResize()
    setUpWalls(mapImageTiles)
    setUpWalls(locationTiles)
    turnSprite(bear.facingDirection, bear, sprite, false)
    setTimeout(()=> turnSprite(entryPoint.direction, bear, sprite, false),150)
    spawnCharacter()
  }
  

  const turnSprite = (e = 'down', actor, sprite, animate) => {
    let m = -cellD
    actor.facingDirection = e
    const animateWalk = (a, b ,c , turn) =>{
      actor.animationTimer.forEach(timer=>clearTimeout(timer))
      m = animate ? m * a : m * c
      if (turn) sprite.parentNode.classList.contains('right') 
        ? sprite.parentNode.classList.remove('right') 
        : sprite.parentNode.classList.add('right')
      if (animate){
        actor.animationTimer[0] = setTimeout(()=>setSpritePos(-cellD * b, actor, sprite),100)
        actor.animationTimer[1] = setTimeout(()=>setSpritePos(-cellD * c, actor, sprite),200) 
      }   
    }
    const spriteChange = {
      right: ()=> { 
        sprite.parentNode.classList.add('right')
        animateWalk(4, 6, 5, false)
      },
      left: ()=> { 
        sprite.parentNode.classList.remove('right')
        animateWalk(4, 6, 5, false)
      },
      up: ()=> animateWalk(2, 2, 3, true), 
      down: ()=> animateWalk(0, 0, 1, true)
    }
    spriteChange[e]()
    setSpritePos(m,actor,sprite)
  }

  const spriteWalk = (dir, actor, sprite, spawn = false) =>{
    // when spawn is true, this function is used by spawn

    if (!dir || !bear.motion) return
    if (!spawn) locationTiles[actor.pos].classList.remove('mark')
    const { x, y } = mapXY

    // prevents bear from turning away from ladder
    mapImageTiles[bear.pos].classList.contains('la') || 
    (mapImageTiles[bear.pos - iWidth] && mapImageTiles[bear.pos - iWidth].classList.contains('la') 
    && dir === 'down')
      ? turnSprite('up', actor, sprite, true)
      : turnSprite(dir, actor, sprite, true)
      
    if (dir === 'right' && noWall(actor.pos + 1)) {
      spawn ? spawnWalk(actor, 'left', cellD, spawn) : setPos('x', x - cellD, 'left')
      actor.pos += 1 
    }
    if (dir === 'left' && noWall(actor.pos - 1)) {
      spawn ? spawnWalk(actor, 'left', -cellD, spawn) : setPos('x', x + cellD, 'left')
      actor.pos -= 1 
    }
    if (dir === 'up' && noWall(actor.pos - iWidth)) {
      spawn ? spawnWalk(actor, 'top', -cellD, spawn) : setPos('y', y + cellD, 'top')
      actor.pos -= iWidth 
    }
    if (dir === 'down' && noWall(actor.pos + iWidth)) {
      spawn ? spawnWalk(actor, 'top', cellD, spawn) : setPos('y', y - cellD, 'top')
      actor.pos += iWidth 
    }
      
    if (!spawn) locationTiles[actor.pos].classList.add('mark')
    
    // trigger event based on bear position
    if (!spawn && mapData[mapKey].events[bear.pos]) {
      const { event, gateway } = mapData[mapKey].events[bear.pos]
      if (gateway) setTimeout(()=> event(gateway),200)
    } 

    const { x: dataX, y: dataY } = mapImageTiles[bear.pos].dataset
    indicator.innerHTML = `x:${x} y:${y} pos:${locationTiles[bear.pos].dataset.index} dataX:${dataX} dataY:${dataY}`
  }

  const select = () =>{
    const { dialogueKey } = bear
    texts[1].innerHTML = ''
    bear.pause = false
    bear.prevChoices[dialogueKey] = bear.choice
    
    bear.textCount = 0
    const eventPoint = bear.dialogue[dialogueKey]
    bear.dialogueHistory.push(dialogueKey)
    bear.dialogueKey = eventPoint.choice[bear.optionTexts[bear.choice]]
    displayText(bear.textCount, false)
  }

  const prevText = () =>{
    const { dialogue, dialogueKey, dialogueHistory } = bear
    const currentDialogueLength = dialogue[dialogueKey].text.length
    
    if (!dialogueHistory.length && bear.textCount === 1) {
      // if beginning of dialogue, end conversation
      clearText()
      return
    } else if ( currentDialogueLength === 1 || (currentDialogueLength > 1 && bear.textCount === 1)) {
      // return to previous dialogue
      bear.dialogueKey = bear.dialogueHistory.pop()
      const previousDialogue = dialogue[bear.dialogueKey].text
      bear.textCount = previousDialogue.length - 1
    } else {
      // return within same dialogue
      bear.textCount -= 2
    }
    texts[1].innerHTML = ''
    displayText(bear.textCount, true)
  }
  

  const handleKeyAction = e =>{
    const key = e.key ? e.key.toLowerCase().replace('arrow','') : e
    if (bear.pause) {
      bear.options.forEach(option=>option.classList.remove('selected'))
      if (key === 'up' && bear.choice > 0) bear.choice--
      if (key === 'down' && bear.choice < bear.options.length - 1) bear.choice++
      if ([' ', 'enter', 'right'].some(k => k === key)) select()
      if (key === 'left') prevText()
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


  const resize = () =>{
    positionSprite(start)

    // update offset margins
    const { x: dataX, y: dataY } = mapImageTiles[bear.pos].dataset
    const xMargin = dataX * -cellD + ((Math.floor(width / 2) - 1) * cellD)
    const yMargin = dataY * -cellD + ((Math.floor(height / 2) - 1) * cellD) 
    setPos('x', xMargin, 'left')  
    setPos('y', yMargin, 'top')

    // adjust sprite
    setSpritePos(-cellD, bear, sprite)
    sprite.style.height = `${cellD}px`
    sprite.style.width = `${cellD * 7}px`
    spriteContainer.style.height = `${cellD}px`
    spriteContainer.style.width = `${cellD}px`

    // resize mapImageContainer
    adjustRectSize(mapImageContainer, width, height, cellD)
    
    // resize map
    map.innerHTML = mapMap(width,height,'map_tile', mapTiles)
    mapTiles = document.querySelectorAll('.map_tile')
    adjustRectSize(map, width, height, cellD, mapTiles)
    
    // setup location indicator
    minicellD = Math.floor(cellD / 8)
    adjustRectSize(location, iWidth, iHeight, minicellD, locationTiles)
    locationTiles[bear.pos].classList.add('mark')
  
    // setup map image
    adjustRectSize(mapImage, iWidth, iHeight, cellD, mapImageTiles)
    
    // setup mapcover
    adjustRectSize(mapCover, width, height, cellD)
  }
  
  const setWidthAndHeightAndResize = () =>{
    setWidthAndHeight()
    placeInCenterOfMap()
    resize()
  }
  

  // set up

  // key control
  window.addEventListener('keyup', (e)=>handleKeyAction(e))

  window.addEventListener('resize', setWidthAndHeightAndResize)

  controlButtons.forEach(c=>{
    c.addEventListener('click',()=>handleKeyAction(c.dataset.c))
  })

  touchToggle.addEventListener('change', ()=>{
    control.classList.toggle('hide')
    const status = document.querySelector('.touch_status')
    status.innerHTML = status.innerHTML === 'off' ? 'on' : 'off'
  })

  transport('start')

}

window.addEventListener('DOMContentLoaded', init)


//*indicator


// console.log(
//   'cellD',cellD,
//   'dataX',dataX,
//   'dataY',dataY,
//   'x',x,
//   'y',y,
//   'los',bear.pos
//   )
  
