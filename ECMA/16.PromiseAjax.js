const p = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://api.apiopen.top/getJoke')
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

p.then(res => {
  console.log(res)
})
