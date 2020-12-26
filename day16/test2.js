function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3

/*
变量提升：
function Foo
function getName: [w]console5
Foo 对象添加一个属性 getName:console2
类 往原型上添加公有方法 getName:console3
把全局 getName 值更改 [w]console5->[w]console4

Foo().getName();getName不是私有的，把全局 getName 值更改[w]console4->[w]console1
new Foo.getName(); 就相当于执行
先运算 new Foo()，new Foo()当成构造函数，函数里面的 this 就是这个实例（f1）f1.getName先找自己私有的 getName，没有，去原型找
先运算new Foo()（看成A） A.getName()（看成B） new B
*/