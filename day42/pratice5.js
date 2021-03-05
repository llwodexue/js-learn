var a = {
    name: "a",
};
a.self = a;
var b = JSON.parse(JSON.stringify(a));
console.log(b); // TypeError: Converting circular structure to JSON