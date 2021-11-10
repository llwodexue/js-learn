// 单个导出
export let name = 'bird'
export let say = function () {
  console.log('whisper')
}

// 合并导出
let name = 'bird'
let say = function () {
  console.log('whisper')
}
export { name, say }

// 默认导出
export default {
  name: 'bird',
  say() {
    console.log('whisper')
  },
}
