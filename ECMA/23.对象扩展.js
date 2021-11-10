/* console.log(Object.is(NaN, NaN)) // true
console.log(NaN === NaN) // false

console.log(Object.is(-0, +0)) // false
console.log(-0 === +0) // true

console.log(Object.is(0, +0)) // true
console.log(Object.is(0, -0)) // false */

/* let a = { name: 'bird', age: 23 }
let b = { name: 'dog', addr: 'ground' }
console.log(Object.assign({}, a, b)) // { name: 'dog', age: 23, addr: 'ground' }
 */

/* const animals = {
  name: 'bird',
}
const cities = {
  migration: ['北京', '上海', '深圳'],
}
Object.setPrototypeOf(animals, cities)
console.log(Object.getPrototypeOf(animals))// { migration: [ '北京', '上海', '深圳' ] }
console.log(animals) // { name: 'bird' } */

/* let obj = { name: 'bird', age: 23, addr: ['beijing', 'shanghai', 'guangzhou'] }

console.log(Object.getOwnPropertyNames(obj))
console.log(Object.keys(obj)) */

/* let obj = {
  0: 'bird',
  1: 21,
  length: 2,
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
} */


let obj = {
  name: 'bird',
  age: 21,
  *[Symbol.iterator](){
    for (let val of Object.values(this)) {
      yield val
    }
  }
}
console.log(Array.from(obj))