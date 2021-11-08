/* let arr = ['bird', 'dog', 'lion']
let iterator = arr[Symbol.iterator]()

console.log(iterator.next()) // { value: 'bird', done: false }
console.log(iterator.next()) // { value: 'dog', done: false }
console.log(iterator.next()) // { value: 'lion', done: false }
console.log(iterator.next()) // { value: undefined, done: true } */

let obj = {
  name: '动物园',
  animals: ['bird', 'dog', 'lion'],
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.animals.length) {
          return {
            value: this.animals[index++],
            done: false,
          }
        } else {
          return {
            value: undefined,
            done: true,
          }
        }
      },
    }
  },
}
for (let item of obj) {
  console.log(item)
} // bird dog lion
