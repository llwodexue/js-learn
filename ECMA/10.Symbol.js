let s1 = Symbol('bird')
let s2 = Symbol('bird')
console.log(s1 === s2) // false
console.log(s2.description) // bird
console.log(Symbol.keyFor(s2)) // undefined

let s3 = Symbol.for('dog')
let s4 = Symbol.for('dog')
console.log(s3 === s4) // true
console.log(s4.description) // dog
console.log(Symbol.keyFor(s4)) // dog

let game = {
  name: 'FlyBird',
  up() {},
  down() {},
  [Symbol('say')]() {
    console.log('say')
  },
}
let methods = {
  up: Symbol(),
  down: Symbol(),
}

game[methods.up] = () => console.log('上移')
game[methods.down] = () => console.log('下移')
console.log(game)
/* 
{
  name: 'FlyBird',
  up: [Function: up],
  down: [Function: down],
  [Symbol(say)]: [Function: [say]],
  [Symbol()]: [Function],
  [Symbol()]: [Function]
}
*/
