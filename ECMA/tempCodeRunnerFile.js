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
