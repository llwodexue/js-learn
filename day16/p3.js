function C1(name) {
    if (name) {
        this.name = name;
    }
}
function C2(name) {
    this.name = name;
}
function C3(name) {
    this.name = name || "join";
}
C1.prototype.name = "Tom";
C2.prototype.name = "Tom";
C3.prototype.name = "Tom";
// 有形参但没传值 name=undefined
console.log(new C1().name + new C2().name + new C3().name);
// C1 if(undefined)无法进入循环 当前作用域无name 去原型链找到Tom
// C2 name=undefined
// C3 undefined(false)||join
// Tomundefinedjoin
