
function init() {

  const original = document.querySelector('.original')
  const output= document.querySelector('.output')
  const compress= document.querySelector('.compress')
  const decompress= document.querySelector('.decompress')

  const trigger = document.querySelectorAll('button')

  original.addEventListener('change',()=>{
    output.innerText = original.value.split('')
  })

  output.addEventListener('change',()=>{
    original.innerText = output.value.split(',').join('')
  })

  const compressCode = value =>{
    const originalArray = value.split(',')
    let current = ''
    const record = []

    originalArray.forEach((letter,i)=>{
      const next = i > originalArray.length ? '' : originalArray[i + 1]
      if (letter === next){
        current += (letter + '.')
      } else {
        current += (letter + '.')
        record.push(current)
        current = ''        
      }
    })

    return record.map(arr=>{
      if (arr === '.') return
      return arr.split('.')[0] + arr.split('').filter(a=>a === '.').length
    })
  }

  trigger[0].addEventListener('click',()=>{
    // const originalArray = original.value.split('')
    // let current = ''
    // const record = []

    // originalArray.forEach((letter,i)=>{
    //   const next = i > originalArray.length ? '' : originalArray[i + 1]
    //   if (letter === next){
    //     current += letter
    //   } else {
    //     current += letter
    //     record.push(current)
    //     current = ''        
    //   }
    // })

    // console.log('record',record)

    compress.value = compressCode(output.value)
  })
  
  trigger[1].addEventListener('click',()=>{
    const output = []
    compress.value.split(',').forEach(x=>{
      const letter = x.split('').filter(y=>y * 0 !== 0).join('')
      const repeat = x.split('').filter(y=>y * 0 === 0).join('')
      for (let i = 0; i < repeat; i++){
        output.push(letter)
      }
    })
    console.log(output)
    decompress.value = output
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