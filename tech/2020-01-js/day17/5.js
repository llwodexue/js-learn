
function C1(name) { // 有形参，但没传值，name=undefined
    if (name) {
        this.name = name;
    }
}
function C2(name) { // 有形参，但没传值，name=undefined
    //this  就是当前的实例
    // f1.name=undefined
    this.name = name;
}
function C3(name) { // un
    //this.name =undefined || 'join';===>"join"
    this.name = name || 'join';
}
C1.prototype.name = 'Tom'; // 给C1类的原型增加属性
C2.prototype.name = 'Tom'; // 给C2类的原型增加属性
C3.prototype.name = 'Tom'; // 给C3类的原型增加属性
//(new C1().name)===>"Tom" (私有的无，找公有的)
//(new C2().name)==>undefined (私有的有)
//(new C3().name)==>"join"
alert((new C1().name) + (new C2().name) + (new C3().name));//"Tomundefinedjoin"