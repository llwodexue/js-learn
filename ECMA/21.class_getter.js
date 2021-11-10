class Test {
  constructor(log) {
    this.log = log
  }
  get pushLog() {
    console.log('获取 log')
    return this.log
  }
  set pushLog(e) {
    console.log('新增 log')
    this.log.push(e)
  }
}

let test = new Test(['a', 'b', 'c'])
// 每次新增 log 都会给出提示
test.pushLog = 'd' // 新增 log
console.log(test.pushLog) // 获取 log [ 'a', 'b', 'c', 'd' ]
