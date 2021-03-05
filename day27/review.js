Array.prototype.myIndexOf = function (val, index = 0) {
    if (index < 0) {
        index = -index > this.length ? 0 : index + this.length;
    }
    for (let i = index; i < this.length; i++) {
        if (this[i] === val) {
            return i;
        }
    }
    return -1;
};

console.log([1, 3, 5, 3, 2, 3, 6, 4].indexOf(3));
console.log([1, 3, 5, 3, 2, 3, 6, 4].myIndexOf(3));

// Array.prototype.myFlat = function () {
//     let arr = [];
//     fn(this);
//     function fn(ary) {
//         ary.forEach((item, index) => {
//             if (Array.isArray(item)) {
//                 fn(item);
//             } else {
//                 arr.push(item);
//             }
//         });
//     }
//     return arr;
// };

// Array.prototype.myFlat = function () {
//     return this.toString()
//         .split(",")
//         .map(function (item, index) {
//             return Number(item);
//         });
// };
// var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
// console.log(arr4.myFlat());

Array.prototype.myLastIndexOf = function (val, index = this.length) {
    if (index < 0) {
        index = -index >= this.length ? 0 : index + this.length;
    }
    for (let i = index; i >= 0; i--) {
        if (this[i] === val) {
            return i;
        }
    }
    return -1;
};
console.log([1, 3, 5, 3, 2, 3, 6, 4].lastIndexOf(3));
console.log([1, 3, 5, 3, 2, 3, 6, 4].myLastIndexOf(3));

// let ary = [1,2,3,[4,5,6,[7,8,[9,0]]]];
//     // [1,2,3,4,5,6,7,8,9,0]
//     //console.log(ary.flat(Infinity));   //[1,2,3,4,5,6,7,8,9,0]
//     Array.prototype.myFlat=function(){
//         //this==>ary;
//         let ary=[];
//         let _this=this;
//         function fn(arr){
//             arr.forEach(function(item,index){
//                 if(Array.isArray(item)){        //如果if成立，说明当前项是数组
//                     fn(item);
//                 }else{
//                     ary.push(item);
//                 }
//             })
//         }
//         fn(_this)
//         return ary;
//     }
//     console.log(ary.myFlat());
