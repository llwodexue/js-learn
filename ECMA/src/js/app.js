let btn = document.getElementById('btn')
btn.onclick = function () {
  import('./m1.js').then(module => {
    module.hello()
  })
}
