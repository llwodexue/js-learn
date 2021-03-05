Array.prototype.mySort = function (callBack) {
    // 这里只对第一个数进行 ASCII 转换，如果第一个数相同则不做处理
    function ASCII(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                let f = String(arr[j]),
                    e = String(arr[j + 1]);
                // 如果第一位 ASCII 大于第二位 ASCII，交换
                if (f.charCodeAt() > e.charCodeAt()) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                } else if (f.charCodeAt() == e.charCodeAt()) {
                    if (f.length > e.length) {
                        // 取最短字符串长度进行循环
                        for (let i = 1; i < e.length; i++) {
                            // 如果字符串循环到头
                            if (i == e.length - 1) {
                                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                            }
                            if (f.charCodeAt(i) > e.charCodeAt(i)) {
                                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                            }
                        }
                    }else{
                        // 取最短字符串长度进行循环
                        for (let i = 1; i < f.length; i++) {
                            if (f.charCodeAt(i) > e.charCodeAt(i)) {
                                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                            }
                        }
                    }
                }
            }
        }
        return arr;
    }
    if (Object.prototype.toString.call(callBack).slice(8, 16) != "Function") {
        let ary = ASCII(this);
        for (let i = 0; i < ary.length; i++) {
            this[i] = ary[i];
        }
        return ary;
    } else {
        for (let i = 0; i < this.length - 1; i++) {
            for (let j = 0; j < this.length - 1; j++) {
                if (callBack(a, b) > 0) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
    }
};

var arr = [3, 7, 12, 4, 8, 113, 2, 1];
console.log(arr.mySort());

var arr = [3, 7, 12, 4, 8, 113, 2, 1];
console.log(arr.sort());
