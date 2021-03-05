// 函数防抖（dobounce）
function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}

// 函数节流（throttle）
function throttle(func, wait) {
    var timeout;
    return function () {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait);
        }
    }
}