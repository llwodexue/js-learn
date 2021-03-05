function _new(Ctor) {
    var reg = /^(object|function)$/i,
        params = [].slice.call(arguments, 1),
        obj = Object.create(Ctor.prototype),
        result = Ctor.call(obj, params);
    if (typeof Ctor !== "function" || !reg.test(typeof Ctor.prototype)) throw new TypeError("Ctor is not a constructor");
    if (reg.test(typeof result)) return result;
    return obj;
}

function Dog(name) {
    this.name = name;
}
Dog.prototype.bark = function () {
    console.log('wangwang');
};
Dog.prototype.sayName = function () {
    console.log('my name is ' + this.name);
};
let d = _new(Dog, '狗');
d.bark(); // wangwang
d.sayName(); // my name is 狗
console.log(d instanceof Dog); // true

// if (!Object.create) {
Object.create = function (prototype) {
    if (!/^(object|function)$/i.test(typeof prototype)) throw new TypeError("Object prototype may only be an Object or null");

    function proxy() {}
    proxy.prototype = prototype;
    return new proxy;
}
// }
console.log(Object.create(Array.prototype));