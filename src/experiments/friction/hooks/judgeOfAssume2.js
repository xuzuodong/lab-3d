import storeData from '../2d/storeData'
const objecdiff = require('objecdiff')

let count = 0
let areaCount = false
let massCount = false
let matCount = false
let area
let mass
let mat
function judge(option) {
  if (option == false) {
    area = storeData[0].area
    mass = storeData[0].mass
    mat = storeData[0].mat
    return area
  }
  if (option == true) {
    console.log(objecdiff.diff({ area, mass, mat }, storeData[0]));
    let diff = objecdiff.diff({ area, mass, mat }, storeData[0])
    console.log(diff.length);
    if (diff.length == 0) {
      return area
    }
    if (diff.length == 1) {
      if (diff[0].documentPath == 'mat') {
        return diff[0].new
      }
      if (diff[0].documentPath == 'area') {
        return diff[0].new
      }
      if (diff[0].documentPath == 'mass') {
        return diff[0].new
      }
    }
    if (diff.length >= 2) {
      for (let i = 0; i < diff.length; i++) {
        if (diff[i].documentPath == 'area') {
          areaCount = true
        }
        if (diff[i].documentPath == 'mass') {
          massCount = true
        }
        if (diff[i].documentPath == 'mat') {
          matCount = true
        }
      }
      console.log(mat, mass, area);
      console.log(matCount, areaCount, massCount);
      if (areaCount == false)
        return 'areaCount'
      if (massCount == false)
        return 'massCount'
      if (matCount == false)
        return 'matCount'
      if (areaCount == true && massCount == true && matCount == true)
        return 'allCount'
    }
  }
  console.log(mat, mass, area);
  areaCount = false
  massCount = false
  matCount = false
}
export default { judge, mat, mass, area }
