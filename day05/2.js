var main = document.getElementById("main");
var lis = main.getElementsByTagName("li");
var divs = main.getElementsByTagName("div");
for (var i = 0; i < lis.length; i++) {
    lis[i].index = i;
    lis[i].onclick = function () {
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
            divs[i].className = "";
        }
        lis[this.index].className = "current";
        divs[this.index].className = "current";
    };
}
for (const key in { a: 1, b: 2 }) {
    console.log(key); // a b
}
for (const val of "abc") {
    console.log(val); // a b c
}

var arr = [1, "3", 5, "21", null, "a", "v", "A", undefined, "z"];
console.log(arr.sort());
