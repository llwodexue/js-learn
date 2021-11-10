const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ msg: 'user data', code: 0 })
    // reject({ msg: 'error', code: -1 })
  }, 1000)
})

const res = p.then(value => {
  console.log(value)
  return new Promise((resolve, reject) => {
    // 1.没有返回值
    /* return */
    // 2.非Promise类型的属性
    /* return 'bird' */
    // 3.是Promise类型对象
    /* return new Promise((resolve, reject) => {
      resolve('Ok')
      reject('Error')
    }) */
    // 4.抛出异常
    /* throw new Error('error') */
  })
})
