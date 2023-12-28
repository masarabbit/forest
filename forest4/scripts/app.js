
import { data } from '../scripts/state.js'
import startWorld from '../scripts/startWorld.js'

const query = window.location.hash || '#area1'

// TODO keep certain settings like touch mode in localstorage

if (query){
  const filePath = query.replace('#', '')
  const keys = Object.keys(data)
  
  Promise.all(
    keys.map(
      key => import(`../${filePath}/${key}.js`)
    ),
  ).then((modules) => modules.forEach((module, i) => {
    data[keys[i]] = module[keys[i]] || module.default
    // console.log(module, data)
  })).then(()=> startWorld(filePath !== 'area1'))
}
