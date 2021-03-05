class Fn {
    constructor(x) {
        this.x = x;
    }
    // ES7:this.y=200 设置的是私有的属性
    y = 200;
    // Fn.prototype 设置的是公有方法
    getX() {} // 没有prototype
    // getX = function () {} // 设置的是私有方法

    // 设置静态私有属性方法
    static m = 400;
    // static getM = function () {} // 有prototype
    static getM() {}; //没有prototype
}
// 公有的属性只能外侧添加
Fn.prototype.z = 300;

// 基于class创建的类只能被new执行
// Fn(); // Uncaught TypeError: Class constructor Fn cannot be invoked without 'new'
let f = new Fn();

console.dir(Fn.getM); // 但是没有prototype，所以此静态私有的方法不能被new