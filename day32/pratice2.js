let box = document.getElementById("box");
let title = document.getElementById("title");
let l = (document.documentElement.clientWidth - box.offsetWidth) / 2;
let t = (document.documentElement.clientHeight - box.offsetHeight) / 2;
box.style.left = l + "px";
box.style.top = t + "px";
box.onmousedown = function (e) {
    this.oldX = e.clientX;
    this.oldY = e.clientY;
    this.left = parseFloat(this.style.left);
    this.top = parseFloat(this.style.top);
    document.onmousemove = move.bind(this);
}

function move(e) {
    let curLeft = e.clientX - this.oldX + this.left;
    let curTop = e.clientY - this.oldY + this.top;
    this.style.left = curLeft + "px";
    this.style.top = curTop + "px";
}
document.onmouseup = function () {
    document.onmousemove = null;
}