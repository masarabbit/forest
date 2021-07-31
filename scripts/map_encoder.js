
function init() {

  const original = document.querySelector('.original')
  const output= document.querySelector('.output')



  original.addEventListener('change',()=>{
    output.innerText = original.value.split('')
  })

  output.addEventListener('change',()=>{
    original.innerText = output.value.split(',').join('')
  })


}

window.addEventListener('DOMContentLoaded', init)

