
function init() {

  const original = document.querySelector('.original')
  const compressed = document.querySelector('.compressed')
  const decoded = document.querySelector('.decode')

// <path  d="M  D
// <path fill="#fff"  F
// /> /
// -1 N
// -2 T

  original.addEventListener('change',()=>{
    compressed.innerText = original.value.replaceAll('<path d="M','D').replaceAll('<path fill="#ffffff" d="M','F').replaceAll('/>','/').replaceAll('-1','N').replaceAll('-2','T').replaceAll(' v ','v').replaceAll(' h ','h').replaceAll('<path fill="#000000" d="M','D')
  })
  
  const decode = arr =>{
    return arr.split('').map(c=>{
      if (c === 'D') return '<path d="M'
      if (c === 'F') return '<path fill="#fff"'
      if (c === '/') return '/>'
      if (c === 'N') return '-1' 
      if (c === 'T') return '-2'
      return c
    }).join('')
  }

  compressed.addEventListener('change',()=>{
    decoded.innerText = decode(compressed.value)
  })

}

window.addEventListener('DOMContentLoaded', init)
