// export let name = 'bird'

// export const say = () => console.log('whisper')

// let arr = [1, 2, 3, 4, 5]
// console.log(arr.includes(1)) // true
// async function func() {
//   await say()
// }

/* function main(config) {
  // let dbHost = config && config.db && config.db.host
  let dbHost = config?.db?.host
  console.log(dbHost)
}
main(
  {
    db: {
      host: '192.168.1.100',
      username: 'root',
    },
  }
) */

export function hello() {
  alert('hello')
}
