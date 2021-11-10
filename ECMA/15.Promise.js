// 使用 nodejs 的 fs 读取文件模块
const fs = require('fs')

const p = new Promise((resolve, reject) => {
  fs.readFile('./resources/为学.txt', (err, data) => {
    if (err) reject(err)
    resolve(data)
  })
})

p.then(
  value => console.log(value.toString()),
  reason => console.log('读取失败!!')
)
