// 每个函数都有一个属性 prototype
// 每个 prototype 对象都有一个 constructor 属性，指向所属类的原型
// 每个对象都有一个 __proto__ 指向所属类的原型

// 回调函数内部 this 一般指向 window，但这个是可以修改的
Array.prototype.myForEach = function (callBack) {
    for (let i = 0; i < this.length; i++) {
        let index = i,
            item = this[i];
        callBack(item, index);
    }
};

let arr = [1, 2, 3, 4];
arr.myForEach(function (item, index) {
    console.log(index, item);
});
let arr = [1, 2, 3, 4];
arr.forEach(function (item, index) {
    console.log(index, item);
});

let arr = [1, 2, 3, 4];
let result = arr.map((item, index) => {
    return item * 10;
});
console.log(result);

Array.prototype.myMap = function (callBack) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        let index = i,
            item = this[i];
        arr[i] = callBack(item, index);
    }
    return arr;
};
let arr = [1, 2, 3, 4];
let result = arr.myMap((item, index) => {
    return item * 10;
});
console.log(result);
console.log(arr);

Array.prototype.myPush = function () {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
};
let arr = [1, 2, 3, 4];
console.log(arr.myPush(5, 6, 7));
console.log(arr);

Array.prototype.myPop = function () {
    return this.length == 0
        ? undefined
        : (this[this.length - 1], this.length--);
};
let arr = [];
console.log(arr.shift()); // undefined
console.log(arr.pop());
console.log(arr.myPop());
console.log(arr);

Array.prototype.myShift = function () {
    if (this.length == 0) {
        return;
    }
    let del = this[0];
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i + 1];
    }
    this.length--;
    return del;
};
var arr = [];
console.log(arr.myShift()); // undefined
console.log(arr);
var arr = [1, 2, 3, 4];
console.log(arr.myShift()); // undefined
console.log(arr);

Array.prototype.myUnshift = function () {
    let arr = [];
    for (let i = 0; i < arguments.length; i++) {
        arr[i] = arguments[i];
    }
    for (let i = 0; i < this.length; i++) {
        arr[arr.length] = this[i];
    }
    for (let i = 0; i < arr.length; i++) {
        this[i] = arr[i];
    }
    return this.length;
};
Array.prototype.myUnshift = function (...arg) {
    var newArr = [...arg, ...this];
    for (let i = 0; i < newArr.length; i++) {
        this[i] = newArr[i];
    }
    return this.length;
};
Array.prototype.myUnshift = function () {
    this.length += arguments.length;
    for (let i = this.length - 1; i >= 0; i--) {
        if (i >= arguments.length) {
            this[i] = this[i - arguments.length];
        } else {
            this[i] = arguments[i];
        }
    }
    return this.length;
};
var arr = [1, 2, 3, 4];
console.log(arr.myUnshift(1, 2)); // undefined
console.log(arr);
