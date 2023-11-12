import { settings } from '../state.js'


const walkDirections = {
  u: 'up',
  d: 'down',
  r: 'right',
  l: 'left',
  s: 'stop',
  tu: 'up',
  td: 'down',
  tr: 'right',
  tl: 'left',
  tk: 'talk',
  re: 'resume',
}

const getWalkConfig = dir => {
  const { map: { column }, d } = settings
  return {
    right: { diff: 1, para: 'x', dist: -d },
    left: { diff: -1, para: 'x', dist: d },
    up: { diff: -column, para: 'y', dist: d },
    down: { diff: column, para: 'y', dist: -d }
  }[dir] 
}

export {
  walkDirections,
  getWalkConfig
}