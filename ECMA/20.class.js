/* function Parent() {
  this.x = 100
}
Parent.prototype.getX = function getX() {
  return this.x
}

function Child() {
  Parent.call(this)
  this.y = 200
}
// Child.prototype.__proto__ = Parent.prototype
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
Child.prototype.getY = function getY() {
  return this.y
}

let c1 = new Child()
console.log(c1) */


class Parent {
  constructor() {
    this.x = 100
  }
  // Parent.prototype.getX=function...
  getX() {
    return this.x
  }
}

// 注意：继承后一定要在constructor加上super
class Child extends Parent {
  constructor() {
    super() // 类似call继承
    this.y = 200
  }
  getY() {
    return this.y
  }
}
// Child() // TypeError: Class constructor Child cannot be invoked without 'new ES6中创建的就是类，不能当做普通函数执行，只能new执行

let c1 = new Child()
console.log(c1)