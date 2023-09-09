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

const compress = value =>{
  const originalArray = value.split(',')
  let count = 0
  const record = []

  originalArray.forEach((letter, i)=>{
    const next = i > originalArray.length ? '' : originalArray[i + 1]
    count++
    if (letter === next) return
    record.push([letter, count])
    count = 0 
  })

  return record.map(x=> x[0] + x[1])
}

const decompress = arr =>{
  const output = []
  const input = Array.isArray(arr) ? arr : arr.split(',')
  input.forEach(x=>{
    const letter = x.split('').filter(y => y * 0 !== 0).join('')
    const repeat = x.split('').filter(y => y * 0 === 0).join('') || 1
    for (let i = 0; i < repeat; i++){
      output.push(letter)
    }
  })
  return output
}

export {
  decode,
  compress,
  decompress
}