function fn() {
    // 这里的this
    console.log(this);//window
}
box.onclick = function () {
    console.dir(this);// box
    fn()
}