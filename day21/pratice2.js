var reg = /\d+/;
var reg = new RegExp("d+");

var name = "lion";
var reg = new RegExp(`^${name}`);
console.log(reg.test("lions"));
