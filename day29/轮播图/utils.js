let utils = (function () {
    function linear(t, b, c, d) {
        return c / d * t + b;
    }
    // move
    function animate(curEle, target, duration, callBack) {
        let begin = {};
        let change = {};
        for (var key in target) {
            begin[key] = parseFloat(getComputedStyle(curEle)[key]);
            change[key] = target[key] - begin[key];
        }
        let interval = 0;
        let timer = setInterval(function () {
            interval += 20;
            for (var key in target) {
                let cur = linear(interval, begin[key], change[key], duration);
                // console.log(interval,begin[key],change[key],duration)
                curEle.style[key] = cur + 'px';
            }
            if (interval >= duration) {
                clearInterval(timer);
                typeof callBack === 'function' ? callBack() : null
            }
        }, 20)
    };

    function ss(fn, wait) {
        let timer;
        return function () {
            clearInterval(timer);
            timer = setTimeout(() => {
                fn.call(this);
            }, wait)
        }
    }

    function debounce(fn, wait) {
        let timer = null,
            result;
        return function (...params) {
            if (timer) clearInterval(timer);
            timer = setTimeout(() => {
                result = fn.apply(this, ...params);
            })
            return result;
        }
    }
    return {
        animate,
        ss,
        debounce
    }

})()