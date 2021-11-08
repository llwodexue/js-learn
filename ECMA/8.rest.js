let fn = (a, b, ...args) => {
  console.log(a)
  console.log(b)
  console.log(args)
}
fn(1, 2, 3, 4, 5)
/*
1
2
[3, 4, 5]
*/
