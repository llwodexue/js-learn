let obj = {
    ary: [1, {
        ss: 2
    }]
}
// 让取值更加严谨
let res = obj && obj.ary && obj.ary[1] && obj.ary[1].s
// 赋默认值
let r = obj.ary || []

function fn({
    a,
    b = 2
}) {
    console.log(a, b);
}
// 如果函数调用不传参
fn(); // Cannot destructure property 'a' of 'undefined' as it is undefined
function fn(obj = {
    a: 1,
    b: 2
}) {
    let {
        a,
        b
    } = obj;
    console.log(a, b);
}
fn();

let fn = (...ary) => {}

function sum(num) {
    if (num > 5) {
        return 0;
    }
    if (num % 2 == 0) {
        return num + sum(num + 1);
    }
    return sum(num + 1);
}
let res = sum(1);
console.log(res);

let arr = [1, 3, 6, 7, 4, 8, 5]
let res = arr.find((item, index) => {
    return item > 4;
})
console.log(res);

function Field(value) {
    this.value = value;
}
Field.prototype.validate = function () {
    return this.value.length > 0;
}
var fields = [username, telephone, password];
var formIsValid = fields.every(function (field) {
    return field.validate();
})
console.log(formIsValid); //true