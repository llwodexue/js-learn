let m1 = new Map()
m1.set('aaa', 111)
m1.set('bbb', 222)
m1.set('ccc', 333)

let m2 = new Map([
  ['aaa', 111],
  ['bbb', 222],
  ['ccc', 333],
])

console.log(m1, m2) // Map(3) {'aaa' => 111, 'bbb' => 222, 'ccc' => 333}
console.log(m1.get('aaa')) // 111
console.log(m1.has('aaa')) // true
m1.clear()
console.log(m1) // Map {}