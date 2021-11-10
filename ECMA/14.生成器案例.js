/* setTimeout(() => {
  console.log(111)
  setTimeout(() => {
    console.log(222)
    setTimeout(() => {
      console.log(333)
    }, 1000)
  }, 1000)
}, 1000)
 */

/* function one() {
  setTimeout(() => {
    console.log(111)
    iter.next()
  }, 1000)
}

function two() {
  setTimeout(() => {
    console.log(222)
    iter.next()
  }, 1000)
}

function three() {
  setTimeout(() => {
    console.log(333)
  }, 3000)
}

function* generator() {
  yield one()
  yield two()
  yield three()
}

let iter = generator()
iter.next() */

function getUsers() {
  setTimeout(() => {
    let data = '用户数据'
    iter.next(data)
  }, 1000)
}

function getOrders() {
  setTimeout(() => {
    let data = '订单数据'
    iter.next(data)
  }, 1000)
}

function getGoods() {
  setTimeout(() => {
    let data = '商品数据'
    iter.next(data)
  }, 1000)
}

function* generator() {
  let users = yield getUsers()
  console.log(users)
  let orders = yield getOrders()
  console.log(orders)
  let goods = yield getGoods()
  console.log(goods)
}

let iter = generator()
iter.next()
