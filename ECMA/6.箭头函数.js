// 形参只有1个，只有1条语句
let hello = name => 'hello ' + name
console.log(hello('world')) // hello world

// call对箭头函数无效
let obj = {
  name: 'bird',
}
let foo = () => {
  console.log(this)
}
let bar = function () {
  console.log(this)
}
foo.call(obj) // Window
bar.call(obj) // { name: 'bird' }

// 不能作为构造函数实例化对象
let Person = (name, age) => {
  this.name = name
  this.age = age
}
// let m = new Person('man', 24) // TypeError: Person is not a constructor

let func = () => {
  console.log([].slice.call(arguments))
}
func(1, 2, 3) // Uncaught ReferenceError: arguments is not defined

