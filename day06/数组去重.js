var arr = [1, 2, 3, 4, 2, 2, 4];
/*
    第一次：拿1
        ==> 2,3,2,4
    第二次：拿2
        ==> 3,2,4 删除2 ==> 3,4
    第三次：拿3
        ==> 4
    第四次：不用再拿了
*/
// 原理：依次拿出数组中的每一项，和它后面的所有剩余项进行比较，如果有相同的就删除
function unique1(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var el = arr[i];
        for (var j = i + 1; j < arr.length; j++) {
            var els = arr[j];
            if (el == els) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}
console.log(unique1(arr));
/*
    var obj = {1:1, 2:2}
    原理：创建一个空对象，去遍历数组中的每一项，把数组中的每项当成属性名和属性值，给此对象添加，在添加的过程中，如果此对象已经有此项，说明重复，在数组中删除此项
*/
function unique2(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        if (obj[el] == el) {
            arr.splice(i, 1);
            j--;
            continue;
        }
        obj[el] = el;
    }
    return arr;
}
console.log(unique2(arr));

var obj = { 1: 1, 2: 2, 3: 3, 4: 4 };
// console.log(obj.valueOf());
var ary = [];
for (key in obj) {
    ary.push(obj[key]);
}
console.log(ary);

function unique3(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        // newArr
        if (newArr.indexOf(el) == -1) {
            newArr.push(el);
        }
    }
    return newArr;
}
console.log(unique3(arr));

function unique4(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        if (!newArr.includes(el)) {
            newArr.push(el);
        }
    }
    return newArr;
}
console.log(unique4(arr));