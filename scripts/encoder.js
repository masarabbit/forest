
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



// function encode(s) {
  
//   if(s === ''){
//     return ['','']
//   }
  
//   const splitS = s.split('')
//   let shiftedArray = s.split('')
//   const answer = [s]
  
//   splitS.forEach(() => {
//     shiftedArray = [...shiftedArray.slice(s.length - 1),...shiftedArray.slice(0,s.length - 1)]
//     answer.push(shiftedArray.join(''))
//   })
  
//   answer.pop()
    
//   const answer2 = answer.sort().map(word=>{
//     return word.split('').slice(s.length -1)
//   })
  
//   return [answer2.join(''),answer.sort().indexOf(s)]
// }



// function decode(s,i) {

//   if(s === '' ) return ''
  
//   const splitS = s.split('')
//   let decodedRow = splitS.sort()
  
//   for(let index = 0; index < (s.length - 1) ; index++){
//     const combineSplitS = decodedRow.map((letter,x)=>{
//       return `${s.split('')[x]}${letter}`
//     })
//     decodedRow = combineSplitS.sort()
//   }
  
//   return decodedRow[i]
  
// }