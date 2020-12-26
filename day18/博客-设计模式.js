var utils = {
    num: 6,
    method: function () {
        return this.num;
    },
};
var obj = utils;
console.log(obj.method());

var utils = (function () {
    var num = 6;
    function fn() {
        return this.num;
    }
    return {
        num: num,
        method: fn,
    };
})();
var obj = utils;
console.log(obj.method());

var Substance = (function () {
    var unique;
    function init() {
        var type;
        return {
            setType: function (t) {
                console.log((type = t));
            },
        };
    }

    return {
        getInstance: function () {
            if (!unique) {
                unique = init();
            }
            return unique;
        },
    };
})();
var Adam = Substance.getInstance();
var Eve = Substance.getInstance();
Adam.setType("Man"); //Man

function Person(name, age) {
    return {
        name: name,
        age: age,
        say: function () {
            console.log(this.name);
        },
    };
}
var p = Person("lion", 13);
p.say();

function Animals(opts) {
    var animals = {
        name: opts.name,
        type: opts.type,
    };
    animals.sayName = function () {
        console.log(this.name);
    };
    return animals;
}
var tony = Animals({ name: "tony", type: "dog" });
console.log(tony.type);
tony.sayName();
var sina = Animals({ name: "sina", type: "cat" });
console.log(sina.type);
sina.sayName();

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function () {
    console.log(this.name);
};
var f = new Person("cat", 17);
f.sayName();

console.log(global.toString === Object.prototype.toString);

let isType = (type, obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
};
console.log(isType("Number", 12)); // true
console.log(isType("Number", "12")); // false

let isType = (type, obj) =>
    Object.prototype.toString.call(obj) === `[object ${type}]`;
console.log(isType("Number", 12)); // true
