// var arr = [8, 2, 1, 5, 3, 3];
var arr = [8, 2, 1, 5];
/*
    需求：排序（升序）
    第一轮：
        [2,1,5,8] 经过第一轮比较，找到第一个最大数 8
    第二轮：
        [1,2,5,8] 经过第二轮比较，找到第二个最大数 5
    第三轮：
        [1,2,5,8] 经过第三轮比较，找到第二个最大数 2
    第四轮不用比较，总共四个数，已经得到三个最大数，最后一个是最小的
    轮数规律： arr.length-1

    第一次：arr.length-1
    第二次：arr.length-1-1
    第三次：arr-length-1-2
    两两比较规律：arr.length-1-轮数
*/
var arr = [8, 2, 1, 5, 6, 7, 8, 9, 0, 32, 47, 8, 2];
function BubbleSort(arr) {
    console.time("改进前冒泡排序耗时");
    // 轮数
    for (var i = 0; i < arr.length - 1; i++) {
        // 两两比较
        for (var j = 0; j < arr.length - 1 - i; j++) {
            // 当前项比下一项大，就换位置
            if (arr[j] > arr[j + 1]) {
                // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                // arr[j]的值临时存储下
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    console.timeEnd("改进前冒泡排序耗时");
    return arr;
}
console.log(BubbleSort(arr));

var arr = [8, 2, 1, 5, 6, 7, 8, 9, 0, 32, 47, 8, 2];
function unique(arr) {
    console.time("改进后冒泡排序耗时");
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    console.timeEnd("改进后冒泡排序耗时");
    return arr;
}
console.log(unique(arr));


