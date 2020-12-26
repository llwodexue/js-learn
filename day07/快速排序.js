var arr = [12, 15, 14, 13, 16, 11];
var arr = [1, 2, 3, 4, 5, 6];

function QuickSort(arr) {
    // 如果是空数组或单项数组直接返回
    if (arr.length <= 1) {
        return arr;
    }
    // 中间项
    var centerIndex = Math.floor(arr.length / 2);
    // splice 返回值是删除的数组
    var centerValue = arr.splice(centerIndex, 1)[0];
    var leftArr = [],
        rightArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < centerValue) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }
    // return QuickSort(leftArr).concat(centerValue, QuickSort(rightArr));
    return arguments.callee(leftArr).concat(centerValue, arguments.callee(rightArr));
}
console.log(QuickSort(arr));
