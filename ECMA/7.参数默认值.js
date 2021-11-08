let add = (a, b, c = 10) => a + b + c

let result = add(1, 2)
console.log(result) // 13

function connect({ host = '127.0.0.1', username, password, port }) {
  console.log(host)
  console.log(username)
  console.log(password)
  console.log(port)
}
connect({
  username: 'root',
  password: 'root',
  port: 3306,
})
