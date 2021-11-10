/* function connect({ host, port, ...user }) {
  console.log(host) // 127.0.0.1
  console.log(port) // 3306
  console.log(user) // { username: 'root', password: 'root' }
}

connect({
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
})

let skillOne = { q: '天音波;回音击' }
let skillTwo = { w: '金钟罩;铁布衫' }
let skillThree = { w: '天雷破;催筋断骨' }
let skillFour = { r: '猛龙摆尾' }
let ms = { ...skillOne, ...skillTwo, ...skillThree, ...skillFour }
console.log(ms) // {q: '天音波;回音击', w: '天雷破;催筋断骨', r: '猛龙摆尾'}
 */

/* let str1 = '<a href="http://www.baidu.com">内容</a>'
let reg1 = /<a href="(.*)">(.*)<\/a>/
let result1 = reg1.exec(str1)
console.log(result1[1]) // http://www.baidu.com
console.log(result1[2]) // 内容

let str2 = '<a href="http://www.baidu.com">内容</a>'
let reg2 = /<a href="(?<url>.*)">(?<text>.*)<\/a>/
let result2 = reg2.exec(str2)
console.log(result2.groups.url) // http://www.baidu.com
console.log(result2.groups.text) // 内容 */

/* let str = 'Lorem999ipsum555sit'
let reg1 = /\d+(?=sit)/
let result1 = reg1.exec(str)
console.log(result1[0]) // 555

let reg2 = /(?<=ipsum)\d+/
let result2 = reg2.exec(str)
console.log(result2[0]) // 555 */

let str = `
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
let reg1 = /<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/g
let result1
let data1 = []
while ((result1 = reg1.exec(str))) {
  data1.push({ title: result1[1], time: result1[2] })
}
console.log(data1)

let reg2 = /<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs
let result2
let data2 = []
while ((result2 = reg2.exec(str))) {
  data2.push({ title: result2[1], time: result2[2] })
}
console.log(data2)
