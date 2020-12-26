var main = document.getElementById("main");
var arr = [1, 2, 3, 4];
var html = "";
var res = arr.map(function (item, index) {
    return (html += `<li>这个索引是${index}</li>`);
});
console.log(res);
main.innerHTML = res[res.length - 1];
