const res = {
  code: 200,
  msg: 'success',
  data: ['red', 'green', 'blue'],
}

let {
  code,
  data: [r, g, b],
} = res
console.log(code, r, g, b) // 200 red green blue
