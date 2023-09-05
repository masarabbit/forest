
const animateCell = ({ target, start, end, interval, speed }) => {
  const startFrame = start || 0
  let i = startFrame
  clearInterval(interval)
  interval = setInterval(()=> {
    target.style.transform = `translateX(${-(i * 100)}%)`
    i = i >= end
      ? startFrame
      : i + 1
  }, speed || 200)
}

export {
  animateCell,
}