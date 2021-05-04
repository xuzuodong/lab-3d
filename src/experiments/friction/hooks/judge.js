import store from '../../../store'
import storeData from '../2d/storeData'
import index from './index'

let count = 0
let area
let mass
let mat
function judge(option, experAssume) {
  // let kexperimentId = index.kexperimentId
  if (option == false) {
    area = storeData[0].area
    mass = storeData[0].mass
    mat = storeData[0].mat
    if (experAssume == 1)
      return mat
    if (experAssume == 2)
      return area
    if (experAssume == 3)
      return mass
  }

  // console.log(kexperimentId);
  // let storeDataarea = storeData[0].area
  // let storeDatamass = storeData[0].mass
  // let storeDatamat = storeData[0].mat
  // if (storeDataarea != area) {
  //   count++
  // }
  // if (storeDatamass != mass) {
  //   count++
  // }
  // if (storeDatamat != mat) {
  //   count++
  // }
  console.log(count);
  console.log(option);
  return
}
export default { judge }
