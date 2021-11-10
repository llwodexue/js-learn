/* function* generator() {
  console.log('111')
  yield 111
  console.log('222')
  yield 222
  console.log('333')
  yield 333
  console.log('444')
}
let iter = generator()
console.log(iter.next()) // 111 { value: 111, done: false }
console.log(iter.next()) // 222 { value: 222, done: false }
console.log(iter.next()) // 333 { value: 333, done: false }
console.log(iter.next()) // 444 { value: undefined, done: false }
 */

function* generator(arg) {
  console.log(arg)
  let one = yield 111
  console.log(one)
  let two = yield 222
  console.log(two)
  let three = yield 333
  console.log(three)
}

let iter = generator('aaa')
console.log(iter.next())
console.log(iter.next('bbb'))
console.log(iter.next('ccc'))
console.log(iter.next('ddd'))
/* 
aaa
{ value: 111, done: false }
bbb
{ value: 222, done: false }
ccc
{ value: 333, done: false }
ddd
{ value: undefined, done: true }
*/