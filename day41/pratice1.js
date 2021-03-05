(function () {
    "use strict";
    // 工具方法
    var isArray = function isArray(value) {
        var type = Object.prototype.toString.call(value);
        return /^\[object Array\]$/.test(type);
    }
    var isPromise = function isPromise(x) {
        // return x instanceof Promise;
        if (x == null) return false;
        if (/^(object|function)$/.test(typeof x)) {
            if (typeof x.then === "function") {
                return true;
            }
        }
        return false;
    }
    // 当前then返回promise实例成功失败控制下一个then
    var handle = function handle(promise, x, resolve, reject) {
        if (x === promise) throw new TypeError('Chaining cycle detected for promise #<Promise>');
        if (isPromise(x)) {
            try {
                x.then(resolve, reject);
            } catch (err) {
                reject(err);
            }
            return;
        }
        resolve(x);
    };

    // 核心
    function Promise(executor) {
        var self = this,
            change;
        // 参数格式处理
        // 只允许new执行，不允许把其当做普通函数执行
        if (typeof self === "undefined")
            throw new TypeError("undefined is not a promise");
        // 传递的executor必须是一个函数
        if (typeof executor !== "function")
            throw new TypeError("Promise resolver" + executor + "is not a function");

        // 初始化私有属性
        self.state = "pending";
        self.result = undefined;
        self.onFulfilledCallbacks = [];
        self.onRejectedCallbacks = [];

        change = function change(state, result) {
            if (self.state !== "pending") return;
            self.state = state;
            self.result = result;
            // 通知基于then存储的方法执行
            if (self.onFulfilledCallbacks.length === 0 && self.onRejectedCallbacks === 0) return;
            setTimeout(function () {
                var i = 0,
                    callbacks = self.state === "fulfilled" ? self.onFulfilledCallbacks : self.onRejectedCallbacks,
                    len = callbacks.length,
                    item;
                for (; i < len; i++) {
                    item = callbacks[i];
                    typeof item === "function" ? item(self.result) : null;
                }
            })
        }

        // 立即执行executor
        /* var resolve = function resolve(result) {
            change("fulfilled", result)
        };
        var reject = function reject(reason) {
            change("rejected", reason);
        }
        executor(resolve, reject); */
        // 立即执行executor
        try {
            executor(function resolve(result) {
                change("fulfilled", result)
            }, function reject(reason) {
                change("rejected", reason);
            });
        } catch (err) {
            change("rejected", err)
        }
    }
    // 如果想要设为不可枚举的，可以使用 definedProperty
    Promise.prototype = {
        constructor: Promise,
        // 告诉使用者这是自己重构的customize定制
        customer: true,
        then: function (onfulfilled, onrejected) {
            if (typeof onfulfilled !== "function") {
                onfulfilled = function onfulfilled(result) {
                    return result;
                }
            }
            if (typeof onrejected !== "function") {
                onrejected = function onrejected(reason) {
                    throw reason;
                }
            }
            var self = this,
                promiseNew,
                x;
            promiseNew = new Promise(function (resolve, reject) {
                // resolve->promiseNew:fulfilled
                // reject->promiseNew:rejected
                switch (self.state) {
                    case "fulfilled":
                        // queueMicrotask(callback) //创建异步微任务（兼容性不好）
                        /* queueMicrotask(function () {
                            onfulfilled(self.result)
                        }) */
                        setTimeout(function () {
                            try {
                                x = onfulfilled(self.result);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        break;
                    case "rejected":
                        setTimeout(function () {
                            try {
                                x = onrejected(self.result);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        })
                        break;
                    default:
                        // 把传递进来的函数事先存储起来，以后执行resolve/reject的时候通知这些方法执行
                        self.onFulfilledCallbacks.push(function (result) {
                            try {
                                x = onfulfilled(result);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        self.onRejectedCallbacks.push(function (reason) {
                            try {
                                x = onrejected(reason);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                }
            });
            return promiseNew;
        },
        catch: function (onrejected) {
            var self = this;
            return self.then(null, onrejected)
        },
        // finally: function () {},
    };
    if (typeof Symbol !== "undefined") {
        Promise.prototype[Symbol.toStringTag] = "Promise";
    }

    Promise.resolve = function resolve(value) {
        return new Promise(function (resolve) {
            resolve(value);
        })
    };
    Promise.reject = function reject(value) {
        return new Promise(function (_, reject) {
            reject(value);
        })
    };
    Promise.all = function all(promises) {
        // 对象，类数组arguments不不能迭代
        // 具有[Symbol.iterator]，可被迭代。数组、set、map、节点结合
        var legal = true;
        typeof Symbol !== "undefined" ? (typeof promises[Symbol.iterator] !== "function" ? legal = false : null) : (!isArray(promises) ? legal = false : null);
        if (legal === false) throw new TypeError(promises + "is not iterable");
        return new Promise(function (resolve, reject) {
            var i = 0,
                len = promises.length,
                // 计数器
                index = 0,
                result = [];
            for (; i < len; i++) {
                // then是异步，循环早已结束
                (function (i) {
                    item = promises[i];
                    if (!isPromise(item)) item = Promise.resolve(item);
                    item.then(function (result) {
                        index++;
                        result[i] = result;
                        if (index >= len) resolve();
                    }, reject)
                })(i)
            }

        });

    };

    // 暴露API
    if (typeof window !== "undefined") {
        window.Promise = Promise;
    }
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = Promise;
    }
})();


// 测试
var p = new Promise(function (resolve, reject) {
    resolve("ok");
    reject("no");
});
var p1 = p.then(function (result) {
    console.log("success", result);
}, function (reason) {
    console.log("fail", reason);
}).then(function (result) {
    console.log("success", result);
}, function (reason) {
    console.log("fail", reason);
})
var query = interval => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (interval === 1000) reject(interval);
            resolve(interval);
        }, interval);
    });
}
Promise.all([query(1000), query(2000), query(3000)]);
console.log("promise实例", p);
console.log("promise.then", p1);