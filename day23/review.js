// Array.prototype.myConcat = function () {
//     let arr = [];
//     for (let i = 0; i < this.length; i++) {
//         arr[i] = this[i];
//     }
//     for (let i = 0; i < arguments.length; i++) {
//         const el = arguments[i];
//         if (Array.isArray(el)) {
//             for (let i = 0; i < el.length; i++) {
//                 arr[arr.length] = el[i];
//             }
//         } else {
//             arr[arr.length] = el;
//         }
//     }
//     return arr;
// };

// var arr = [1, 2, 3];
// console.log(arr.myConcat([4, 5, 6], 7, 8));
// console.log(arr.myConcat(1, 2, 3));
// console.log(arr);

// Array.prototype.mySlice = function (start = 0, end = this.length) {
//     var arr = [];
//     if (start < 0) {
//         start = -start > this.length ? 0 : this.length + start;
//     }
//     if (end < 0) {
//         end = -end > this.length ? 0 : this.length + end;
//     }
//     let j = 0;
//     for (let i = start; i < end; i++) {
//         arr[j] = this[i];
//         j++;
//     }
//     return arr;
// };

// var arr = [1, 2, 3];
// console.log(arr.mySlice(-1)); // [ 3 ]
// console.log(arr.mySlice(-4)); // [ 1, 2, 3 ]
// console.log(arr.mySlice(-5)); // [ 1, 2, 3 ]
// console.log(arr.mySlice(5)); // []
// console.log(arr.mySlice(0, -1)); // [ 1, 2 ]
// console.log(arr.mySlice(0, -4)); // []
// console.log(arr.mySlice(1, 3)); // [ 2, 3 ]

Array.prototype.mySplice = function (start, del) {
    let arr = [];
    if (start < 0) {
        start = -start > this.length ? 0 : this.length + start;
    }
    if (arguments.length <= 1) {
        for (let i = start; i < this.length; i) {
            // 从start开始的数据添加到新数组中
            arr.push(this[i]);
            // 把添加的那项放到末尾
            for (let j = i; j < this.length - 1; j++) {
                [this[j], this[j + 1]] = [this[j + 1], this[j]];
            }
            // 把添加的那项从原数组删除
            this.length--;
        }
    } else {
        let that = del;
        for (let i = that; i > 0; i++) {
            // 如果删除数目为0，不再进行删除
            if (that == 0) {
                break;
            }
            for (let j = start; j < this.length - 1; j++) {
                [this[j], this[j + 1]] = [this[j + 1], this[j]];
            }
            arr.push(this[this.length - 1]);
            this.length--;
            // 删除一个删除数量减一个
            that--;
        }
        let lArr = [];
        for (let i = 0; i < start; i++) {
            lArr[i] = this[i];
        }
        for (let i = 0; i < arguments.length - 2; i++) {
            lArr.push(arguments[i + 2]);
        }
        for (let i = start; i < this.length; i++) {
            lArr.push(this[i]);
        }
        for (let i = 0; i < lArr.length; i++) {
            this[i] = lArr[i];
        }
    }
    return arr;
};
var arr1 = [1, 2, 3, 4, 5];
console.log(arr1.splice(-3, 2, 5, 6, 7)); // [ 3, 4 ]
console.log(arr1); // [ 1, 2, 5 ]

var arr2 = [1, 2, 3, 4, 5];
console.log(arr2.mySplice(-3, 2, 5, 6, 7));
console.log(arr2); // [ 4 ]

// console.log(arr1.splice(1)); // [ 2, 3, 4, 5 ]
// console.log(arr1); // [ 1 ]
// console.log(arr1.splice(-1)); // [ 5 ]
// console.log(arr1); // [ 1, 2, 3, 4 ]
// console.log(arr.splice(1, 1)); // [2]
// console.log(arr.splice(-8, 1)); // [1]
// console.log(arr.splice(-1, 0)); // []

// console.log(arr1.mySplice(-1));
// console.log(arr1);
