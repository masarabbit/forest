const decode = arr =>{
  return arr.split('').map(c => {
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
    const letter = x.split('').filter(y => y * 0 !== 0).join('')
    const repeat = x.split('').filter(y => y * 0 === 0).join('')
    for (let i = 0; i < repeat; i++){
      output.push(letter)
    }
  })
  return output
}

export {
  decode,
  decompress
}