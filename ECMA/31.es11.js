/* class Animal {
  // 公有属性
  name
  // 私有属性
  #age
  #addr
  constructor(name, age, addr) {
    this.name = name
    this.age = age
    this.#addr = addr
  }

  say(){
    console.log(this.#addr)
  }
}

let cat = new Animal('cat', 4, 'beijing')
cat.say() // 'beijing'
console.log(cat['#addr']) // undefined */

/* let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('one')
  }, 1000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('two')
  }, 1000)
})

Promise.allSettled([p1, p2]).then(res => console.log(res))
/!* 
[
  { status: 'fulfilled', value: 'one' },
  { status: 'rejected', reason: 'two' }
]
*!/
Promise.all([p1, p2])
  .then(res => console.log(res))
  .catch(err => console.log(err))
// two */

/* let str = `
<ul>
  <li>
    <a>肖生克的救赎</a>
    <p>上映日期: 1994-09-10</p>
  </li>
  <li>
    <a>阿甘正传</a>
    <p>上映日期: 1994-07-06</p>
  </li>
</ul>
`
let reg = /<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs
let result = str.matchAll(reg)
let data = []
for (let v of result) {
  data.push({ title: v[1], time: v[2] })
}
console.log(data) */

/* function main(config) {
  // let dbHost = config && config.db && config.db.host
  let dbHost = config?.db?.host
  console.log(dbHost)
}
main(
  {
    db: {
      host: '192.168.1.100',
      username: 'root',
    },
  },
  {
    cache: {
      host: '192.168.1.200',
      username: 'admin',
    },
  }
)
 */


/* let max = Number.MAX_SAFE_INTEGER
console.log(max) // 9007199254740991
console.log(max + 1) // 9007199254740992
console.log(max + 2) // 9007199254740992

console.log(BigInt(max)) // 9007199254740991n
console.log(BigInt(max) + BigInt(1)) // 9007199254740992n
console.log(BigInt(max) + BigInt(2)) // 9007199254740993n */

console.log(globalThis)