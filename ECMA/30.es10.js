/* let result1 = Object.fromEntries([
  ['name', 'bird'],
  ['age', 23],
])
console.log(result1) // {name: 'bird', age: 23}

let m = new Map()
m.set('name', 'dog')
m.set('age', 17)
let result2 = Object.fromEntries(m)
console.log(result2) // {name: 'dog', age: 17}

let arr = Object.entries({
  name: 'cat',
  age: 18,
})
console.log(arr) // [ [ 'name', 'cat' ], [ 'age', 18 ] ]
 */

/* const s = '  abc  '

console.log(s.trim()) // "abc"
console.log(s.trimStart()) // "abc  "
console.log(s.trimEnd()) // "  abc
 */

console.log([1, [2, [3]]].flat(Infinity)) // [ 1, 2, 3 ]

console.log([1, 2, 3, 4].map(item => [item * 10])) // [ [ 10 ], [ 20 ], [ 30 ], [ 40 ] ]
console.log([1, 2, 3, 4].flatMap(item => [item * 10])) // [ 10, 20, 30, 40 ]


let s1 = Symbol('bird')
let s2 = Symbol('bird')
console.log(s1 === s2) // false
console.log(s2.description) // bird
console.log(Symbol.keyFor(s2)) // undefined