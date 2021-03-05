// 利用js给当前元素设置left和top
box.style.position = "absolute";
// left = "ct clientWidth/2-box offsetWidth/2"
// let winW = utils.win("clientWidth");
let ctW = ct.clientWidth;
let boxW = box.offsetWidth;
let ctH = ct.clientHeight;
// let winH = utils.win("clientHeight");
let boxH = box.offsetHeight;
box.style.left = (ctW - boxW) / 2 + "px";
box.style.top = (ctH - boxH) / 2 + "px";
