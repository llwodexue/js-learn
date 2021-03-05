var str = "lion2019|lion2020";
str = str.replace("lion", "bird").replace("lion", "bird");
console.log(str); // bird2019|bird2020

var str = "lion2019|lion2020";
str = str.replace(/lion/g, "bird");
console.log(str); // bird2019|bird2020

var str = "lion2019|lion2020";
str = str.replace("lion", "lions").replace("lion", "lions");
console.log(str); // lionss2019|lion2020

var str = "lion2019|lion2020";
str = str.replace(/lion/g, "lions");
console.log(str); // lions2019|lions2020

var str = "dd123ff456";
var reg = /\d{3}/g;
var res = str.replace(reg, function (...ary) {
    console.log(arguments); // Arguments(3)
    console.log(ary); // (3) ["123", 2, "dd123ff456"] (3) ["456", 7, "dd123ff456"]
    return "$";
});
console.log(res); // dd$ff$

var str = "lion2019|lion2020";
str = str.replace(/lion/g, (...ary) => {
    return "lions";
});
console.log(str); // lions2019|lions2020
