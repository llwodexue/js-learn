/* class Person {
  static [Symbol.hasInstance](params) {
    console.log(params) // { flag: true }
    return params.flag
  }
}

let o = {
  flag: true,
}
console.log(o instanceof Person) // true
 */

/* let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let arr3 = [4, 5, 6]
arr2[Symbol.isConcatSpreadable] = false
console.log(arr1.concat(arr2))
// [ 1, 2, 3, [ 4, 5, 6, [Symbol(Symbol.isConcatSpreadable)]: false ] ]
console.log(arr1.concat(arr3))
// [ 1, 2, 3, 4, 5, 6 ]
 */

/* let obj = {
  0: 'bird',
  1: 21,
  length: 2,
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
}
for (let item of obj) {
  console.log(item)
} */

/* let obj = {
  name: 'Neo',
  age: 21,
  *[Symbol.iterator]() {
    for (let val of Object.values(this)) {
      yield val
    }
  },
}
for (let item of obj) {
  console.log(item)
} */
/* 
Neo
21
*/

let a = {
  value: 1,
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return this.value
      case 'string':
        return String(this.value)
      case 'default':
        return ++this.value
    }
  },
}

console.log(+a + 10) // 11
console.log(String(a)) // 1
if (a == 2 && a == 3) {
  console.log('OK') // OK
}

class Person {
  get [Symbol.toStringTag]() {
    return 'Person'
  }
}
let p1 = new Person()
console.log(Object.prototype.toString.call(p1)) //"[object Person]"
