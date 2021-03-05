// Array.prototype.mySplice = function (start, del) {
//     let arr = [];
//     if (start < 0) {
//         start = -start > this.length ? 0 : this.length + start;
//     }
//     if (arguments.length <= 1) {
//         for (let i = start; i < this.length; i) {
//             arr.push(this[i]);
//             for (let j = i; j < this.length - 1; j++) {
//                 [this[j], this[j + 1]] = [this[j + 1], this[j]];
//             }
//             this.length--;
//         }
//     } else {
//         let that = del;
//         for (let i = that; i > 0; i++) {
//             if (that == 0) {
//                 break;
//             }
//             for (let j = start; j < this.length - 1; j++) {
//                 [this[j], this[j + 1]] = [this[j + 1], this[j]];
//             }
//             arr.push(this[this.length - 1]);
//             this.length--;
//             that--;
//         }
//         let lArr = [];
//         for (let i = 0; i < start; i++) {
//             lArr.push(this[i]);
//         }
//         for (let i = 0; i < arguments.length - 2; i++) {
//             lArr.push(arguments[i + 2]);
//         }
//         for (let i = start; i < this.length; i++) {
//             lArr.push(this[i]);
//         }
//         for (let i = 0; i < lArr.length; i++) {
//             this[i] = lArr[i];
//         }
//     }
//     return arr;
// };

// Array.prototype.MySpli = function (n, m, ...arg) {
//     let ary1 = [];
//     let ary2 = [];
//     for (let i = 0; i < n; i++) {
//         ary1.push(this[i]);
//     }
//     for (let i = m + n; i < this.length; i++) {
//         ary2.push(this[i]);
//     }
//     NewAry = ary1.concat(arg, ary2);
//     let len = this.length;
//     for (let i = 0; i < len; i++) {
//         this.shift();
//     }
//     for (let i = 0; i < NewAry.length; i++) {
//         this.push(NewAry[i]);
//     }
//     return this;
// };
// var arr1 = [1, 2, 3, 4, 5];
// console.log(arr1.splice(-3, 2, 5, 6, 7)); // [ 3, 4 ]
// console.log(arr1); // [ 1, 2, 5 ]


Array.prototype.mySplice = function () {
    var res = []; //返回的删除项数组
    // var start=arguments[0];//开始操作项索引
    var start = 0; //开始操作项索引
    // var delNum=arguments[1];//删除项数
    var delNum = this.length - start; //删除项数
    var inserNum; //插入项数
    var leftAry = []; //开始索引前的项
    var rightAry = []; //开始索引及以后的项

    if (arguments.length > 0) {
        start = arguments[0];
    }

    if (arguments.length > 1) {
        delNum = arguments[1];
    }

    if (arguments.length > 2) {
        inserNum = arguments.length - 2;
    }
    if (delNum < 0) {
        return [];
    }
    if (start < 0) {
        start += this.length;
    }
    if (start < 0) {
        start = 0;
    }
    //将要删除的项放入res
    for (let i = 0; i < delNum; i++) {
        if (this[start + i] != undefined) {
            res[i] = this[start + i];
        }
        // res[i]=this[start+i];
    }
    //将删除项后面的向前移动
    for (let i = 0; i < this.length - start - delNum; i++) {
        this[start + i] = this[start + delNum + i];
    }
    this.length -= delNum;

    //如果没有传入插入项
    if (inserNum == undefined) {
        return res;
    }
    //以开始索引为界分开
    for (let i = 0; i < this.length; i++) {
        if (i < start) {
            leftAry[leftAry.length] = this[i];
        } else {
            rightAry[rightAry.length] = this[i];
        }
    }
    //将插入项放入开始索引前的数组
    for (let i = 0; i < inserNum; i++) {
        leftAry[leftAry.length] = arguments[2 + i];
    }
    this.length += inserNum;
    //写入开始索引前的项
    for (let i = 0; i < leftAry.length; i++) {
        this[i] = leftAry[i];
    }
    //写入开始索引及其后的项
    for (let i = 0; i < rightAry.length; i++) {
        this[leftAry.length + i] = rightAry[i];
    }
    return res;
};

var arr = [1, 2, 3, 4];
// console.log(arr.mySplice(1,1,5,6));
// console.log(arr.splice(1));
console.log(arr.mySplice(2));
// console.log(arr.mySplice(1));
console.log(arr);
