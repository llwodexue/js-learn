/* let p = new Promise((resolve, reject) => {
  // resolve('success')
  reject('error')
})

async function main() {
  let result
  try {
    result = await p
  } catch (e) {
    result = e
  }
  console.log(result)
}
console.log(main()) // Promise */

/* function sendAJAX(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (/^(2|3)\d{2}/.test(xhr.status)) {
          resolve(xhr.response)
        } else {
          reject(xhr.status)
        }
      }
    }
  })
}

async function main() {
  let result = await sendAJAX('https://api.apiopen.top/getJoke')
  console.log(result)
}
main() */

/* let obj = { name: 'Lee', age: 21, sex: 'man' }
console.log(Object.keys(obj)) // [ 'name', 'age', 'sex' ]
console.log(Object.values(obj)) // [ 'Lee', 21, 'man' ]
console.log(Object.entries(obj)) // [ [ 'name', 'Lee' ], [ 'age', 21 ], [ 'sex', 'man' ] ] */

let obj = Object.create(null, {
  name: {
    value: 'dog',
    writable: true,
    configurable: true,
    enumerable: true,
  },
  age: {
    value: 12
  }
})
console.log(Object.getOwnPropertyDescriptors(obj))
console.log(Object.keys(obj))