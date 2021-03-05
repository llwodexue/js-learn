// console.log(1);
// setTimeout(() => {
//     console.log(2);
// }, 20);
// setTimeout(() => {
//     console.log(3);
// }, 10);
// console.log(4);
var name = "WINDOW";
function fn() {
    console.log(this.name);
}
var obj = {
    name: "OBJ",
    fn: () => {
        console.log(this.name);
    },
};
fn();
obj.fn();
fn.call(obj);
window.onload = function () {
    //页面加载完成，事件就会触发
    fn();
    obj.fn();
};
fn.bind(obj);
