function A() {
    this.x = 10;
    this.y = 20;
}
A.prototype.getA = function () {
    console.log("getA");
};
A.a = 30;
var b = new A();
b.getA();

// 这个{}既不是对象也不是作用域
class A {
    constructor(name) {
        this.x = 10;
        this.y = 20;
    }
    // 只针对原型的方法
    getC() {
        console.log("getC");
    }
    // 给实例添加私有属性
    a = 30;
    // 把 A 这个类当成对象，给它添加静态属性
    static b = 40;
}
A.prototype.f = 30;
var b = new A();
b.getC();

class B extends A {
    constructor(name) {
        // 必须在 this 之前调用，用来访问父对象函数
        super(); // 相当于 call 继承
        this.z = 30;
    }
    getB() {
        console.log("getB");
    }
    fn() {
        // 通过 super 可以调用 A 类型原型上方法
        super.getC();
    }
}
