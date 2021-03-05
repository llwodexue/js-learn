function throttle(func, wait) {
    var timer = null,
        previous = 0,
        result;
    return function proxy() {
        var self = this,
            params = [].slice.call(arguments);
        var now = +new Date,
            remaining = wait - (now - previous);
        if (remaining <= 0) {
            // 两次间隔时间已经超过WAIT了，此时我们立即执行
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = now;
            result = func.apply(self, params);
            return result;
        }
        // 没有定时器我们才设置，有定时器说明上次还没执行呢，只有上一次执行了，我们在开启下一次
        if (!timer) {
            timer = setTimeout(function () {
                clearTimeout(timer);
                timer = null;
                previous = +new Date;
                result = func.apply(self, params);
            }, remaining);
        }
        return result;
    };
}
window.onscroll = throttle(fn, 200);