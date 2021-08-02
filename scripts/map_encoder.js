
function init() {

  const original = document.querySelector('.original')
  const output= document.querySelector('.output')
  const compress= document.querySelector('.compress')

  const trigger = document.querySelector('button')

  original.addEventListener('change',()=>{
    output.innerText = original.value.split('')
  })

  output.addEventListener('change',()=>{
    original.innerText = output.value.split(',').join('')
  })

  trigger.addEventListener('click',()=>{
    const originalArray = original.value.split('')
    let current = ''
    const record = []

    originalArray.forEach((letter,i)=>{
      const next = i > originalArray.length ? '' : originalArray[i + 1]
      if (letter === next){
        current += letter
      } else {
        current += letter
        record.push(current)
        current = ''        
      }
    })

    console.log('record',record)

    compress.value = record.map(arr=>arr[0] + arr.length)
  })


}

window.addEventListener('DOMContentLoaded', init)

// trigger.addEventListener('click',()=>{
//   const originalArray = original.value.split('')
//   let prev
//   let current = ''
//   const record = []
//   console.log('test',originalArray)

//   originalArray.forEach((letter,i)=>{
//     prev = i < 0 ? '' : originalArray[i - 1]

//     // console.log('p',prev)
//     // console.log('letter',letter)
//     // if (current = '' && prev === letter) {
//     //   current += (letter + letter)
//     if (prev === letter){
//       current += letter
//     } else {
//       if (current !== '') record.push(current)
//       current = ''        
//     }

//     console.log('record',record)
//     console.log('current',current)
//   })

//   console.log('record',record)
// })