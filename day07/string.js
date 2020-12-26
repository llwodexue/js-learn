var str = "2019-8-18 12:32:18";
var time = str.split(" ");
function lens(str) {
    return str < 10 ? `0${str}` : str;
}
var left = time[0].split("-");
var right = time[1].split(":");
var newTime = [];
newTime[0] = `${lens(left[0])}年${lens(left[1])}月${lens(left[2])}日`;
newTime[1] = `${lens(right[0])}时${lens(right[1])}分${lens(right[2])}秒`;
var Time = newTime.join(" ");
console.log(Time);
// "2019年08月18日 12时32分18秒"