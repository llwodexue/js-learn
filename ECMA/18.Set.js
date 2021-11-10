let s = new Set(['一', '二', '三', '二', '四', '三'])

console.log(s) // Set { '一', '二', '三', '四' }
console.log(s.size) // 4
s.add('五')
console.log(s) // Set { '一', '二', '三', '四', '五' }
let result1 = s.delete('三')
console.log(result1) // true
let result2 = s.has('三')
console.log(result2) // false
let result3 = s.clear()
console.log(result3) // undefined
console.log(s) // Set {}

/* let arr = [1, 2, 2, 3, 2, 3, 4, 1, 4]

// 数组去重
let result1 = [...new Set(arr)]
console.log(result1) // [ 1, 2, 3, 4 ]

// 交集
let arr2 = [4, 5, 6, 4, 5]
let result2 = [...new Set(arr)].filter(item => new Set(arr2).has(item))
console.log(result2) // [ 4 ]

// 并集
let result3 = [...new Set([...arr, ...arr2])]
console.log(result3) // [ 1, 2, 3, 4, 5, 6 ]

// 差集
let result4 = [...new Set(arr)].filter(item => !new Set(arr2).has(item))
console.log(result4) // [ 1, 2, 3 ] */
