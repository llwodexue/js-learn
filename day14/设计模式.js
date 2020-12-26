// 单例设计模式
var utils = (function () {
    var num = 3;
    function fn() {}
    return {
        num: num,
        fn: fn,
    };
})();
utils.fn();

// 工厂设计模式
function person(name, age) {
    return {
        name: name,
        age: age,
        des: "hello",
    };
}
var p = person("lion", 13);
console.log(p);

// 构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}
var f1 = new Person();
var f2 = new Person("cat", 17);
console.log(f1);
console.log(f2);
