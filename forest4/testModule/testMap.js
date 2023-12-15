
import { data } from '../scripts/state.js'
import startWorld from '../area1/app.js'

const query = window.location.hash

// if (query){
//   const queryArray = query.split('#').filter(q => q)
//   const keys = object.keys(data)
  
//   Promise.all(
//     queryArray.map(
//       file => import(`../area1/${file}.js`)
//     ),
//   ).then((modules) => modules.forEach((module, i) => {
//     console.log(module)
//     data[queryArray[i]] = module[queryArray[i]] || module.default
//     console.log(data)
//   }))
// }

if (query){
  const filePath = query.replace('#', '')
  const keys = Object.keys(data)
  
  Promise.all(
    keys.map(
      key => import(`../${filePath}/${key}.js`)
    ),
  ).then((modules) => modules.forEach((module, i) => {
    data[keys[i]] = module[keys[i]] || module.default
    console.log(module, data)
  })).then(()=> startWorld())
}