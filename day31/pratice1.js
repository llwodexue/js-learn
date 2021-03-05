let box = document.getElementById("box");
let bigBox = document.getElementById("bigBox");
let img = bigBox.querySelector("img");
let mark = null;
box.onmouseenter = function () {
    mark = document.createElement("div");
    mark.id = "mark";
    box.appendChild(mark);
}
box.onmousemove = function (e) {
    let curLeft = e.clientX - box.offsetLeft - mark.offsetWidth / 2;
    let curTop = e.clientY - box.offsetTop - mark.offsetWidth / 2;
    let maxW = box.offsetWidth - mark.offsetWidth;
    let maxT = box.offsetHeight - mark.offsetHeight;
    curLeft < 0 ? curLeft = 0 : (curLeft > maxW ? curLeft = maxW : null)
    curTop < 0 ? curTop = 0 : (curTop > maxT ? curTop = maxT : null)
    mark.style.left = curLeft + "px";
    mark.style.top = curTop + "px";
    bigBox.style.display = "block";
    img.style.left = -2 * curLeft + "px";
    img.style.top = -2 * curTop + "px";
}
box.onmouseleave = function () {
    box.removeChild(mark);
    bigBox.style.display = "none";
}