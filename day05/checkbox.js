var main = document.getElementById("main");
var lis = main.getElementsByTagName("li");
var div = main.getElementsByTagName("div");
console.log(div);
for (let i = 0; i < lis.length; i++) {
    // lis[i].index = i;
    lis[i].onclick = function () {
        for (let j = 0; j < lis.length; j++) {
            lis[j].className = "";
            div[j].className = "";
        }
        // lis[lis[i].index].className = "current";
        // div[lis[i].index].className = "current";
        lis[i].className = "current";
        div[i].className = "current";
    };
}
// 思路：点击哪个 li 就给哪个 li 添加 current，并且给相应的 div 添加 current
// 点击的时候只能保证选中只有一个，在给选中的元素添加样式后，把所有 li 的样式先清空