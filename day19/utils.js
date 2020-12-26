var utils = (function () {
    // function toArr(cArr) {
    //     var arr = [];
    //     for (var i = 0; i < cArr.length; i++) {
    //         arr.push(cArr[i]);
    //     }
    //     return arr;
    // }
    // function toArr(cArr) {
    //     return [].slice.call(cArr);
    // }
    function toArr() {
        var res = Array.from(arguments);
        console.log(res[0]);
    }
    return {
        toArr: toArr,
    };
})();
