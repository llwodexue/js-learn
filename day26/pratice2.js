let $box = $("#box");
// console.log($box.children("a"));
// console.log($box.find("a"));
// console.log($("a").filter(":odd"));
// console.log($box.text());
function fn1() {
    console.log(1);
}
function fn2() {
    $box.toggleClass("hello");
}
$box.on("click", fn1);
$box.click(fn2);
$box.click(fn2);
// $box.off("click", fn1);
// $("ul li").each(function (index, item) {
//     console.log(item);
// });
