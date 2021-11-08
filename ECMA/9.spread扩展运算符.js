let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let array1 = [...arr1, ...arr2]
let array2 = arr1.concat(arr2)
console.log(array1) // [1, 2, 3, 4, 5, 6]
console.log(array2) // [1, 2, 3, 4, 5, 6]

let clone1 = ['a', 'b', 'c']
let clone2 = [...clone1]
console.log(clone2) // ['a', 'b', 'c']

function func() {
  console.log([...arguments]) // [ 1, 2, 3 ]
  console.log([].slice.call(arguments)) // [ 1, 2, 3 ]
  console.log(Array.from(arguments)) // [ 1, 2, 3 ]
}
func(1, 2, 3)

let obj1 = {
  a: 123,
}
let obj2 = {
  b: 456,
}
let object1 = { ...obj1, ...obj2 }
let object2 = Object.assign(obj1, obj2)
console.log(object1) // { a: 123, b: 456 }
console.log(object2) // { a: 123, b: 456 }
