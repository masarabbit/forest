import { settings } from './elements.js'


const radToDeg = rad => Math.round(rad * (180 / Math.PI))
const distanceBetween = (a, b) => Math.round(Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)))
const randomN = max => Math.ceil(Math.random() * max)
const px = n => `${n}px`
const getRandomPos = key =>  20 * randomN((settings.map[key] / 20) - 1)


export {
  radToDeg,
  distanceBetween,
  randomN,
  px,
  getRandomPos,
}