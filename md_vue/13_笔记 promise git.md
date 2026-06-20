[toc]



# 13_笔记


## Promise


### 了解  Promise


Promise 是一个异步操作返回的对象，用来传递异步操作的消息



**可以解决的问题**



1. 解决回调地狱问题，不会导致难以维护
2. 合并多个异步请求，节约时间



**Promise 的三种状态**



1. Pending 等待态
2. Fulfilled 成功态
3. Rejected 失败态



### 使用 Promise


**Promise.resolve：将现有对象转为 Promise 对象，这个对象处于 resolve 状态**



作用：



+ 改状态
+ 发布事件池子里的方法



```javascript
Promise.resolve([1, 2, 3]).then((data) => {
    console.log(data);
}); // [1, 2, 3]
```



**Promise.reject：将现有对象转为 Promise 对象，这个对象处于 reject 状态**



作用：



+ 改状态
+ 发布事件池子里的方法



```javascript
Promise.reject([1, 2, 3]).then(null, (err) => {
    console.log(err);
}); // [1, 2, 3]
```



**Promise.then：用来指定 Promise 对象的状态改变时要执行的操作**



+ then 是同步的，then 里的回调函数是异步的



**注意几点：**



+ 如果当前 then 中回调函数的执行结果是一个 Promise 实例，那当前这个实例的状态会接管下一个 then 中回调函数的执行
+ 如果当前的 then 中的回调函数执行结果不是一个 Promise 实例，那下一个then中会默认执行成功的回调函数
+ 当 Promise 的回调函数执行的时候出现了错误，那当前的实例会变成失败态



```javascript
let p = new Promise(function (resolve, reject) {
    resolve("success");
    //reject('fail');
});

p.then((data) => {
        console.log("data：", data);
    },(err) => {
        console.log("err：", err);
    }
);
```



**Promise.all：接收一个数组，数组内是 Promise 实例。必须全部成功才表示成功**



**Promise.race：接收一个数组，数组内是 Promise 实例。最早返回的对象成功，就变成成功态；如果失败了，就变成失败态**



## 封装 Promise


Promise 是一个 ES6 的内置类



+ 当 new Promise 的时候，会给当前实例增加状态（默认是 pending 等待态）和两个事件池（成功和失败的事件池）
+ 还会给 Promise 的内部传递一个 executor 函数，此函数会立即执行，而且此函数会传递两个形参函数 resolve 和 reject，形参对应的实参函数在 Promise 内部，当执行任何一个函数的时候，都会做两件事 
    1. 去改变当前 Promise 实例的状态（**改状态**）
    2. **发布对应池子里的事件**
+ Promise 的类的原型上还有一个 then 方法，用来给当前的 Promise 实例的事件池子订阅方法，而且还会返回一个新的 Promise 实例



### 不考虑 then 链式调用


```javascript
class MyPromise {
    constructor(executor) {
        this.state = "pending";
        // Promise实例可以多次then，为了保证then中方法按顺序执行，这里把then中成功的回调和失败的回调存放到数组内
        this.fulfilledEvent = [];
        this.rejectedEvent = [];

        let resolve = (result) => {
            if (this.state !== "pending") return;
            this.state = "resolved";
            // resolve其实是一个微任务，这里宏任务替换一下
            setTimeout(() => {
                // 发布方法
                this.fulfilledEvent.forEach((item) => {
                    if (typeof item === "function") {
                        item(result);
                    }
                });
            }, 0);
        };
        let reject = (reason) => {
            if (this.state !== "pending") return;
            this.state = "rejected";
            setTimeout(() => {
                this.rejectedEvent.forEach((item) => {
                    if (typeof item === "function") {
                        item(reason);
                    }
                });
            }, 0);
        };
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        if (this.state === "resolved") {
            // 状态已确定，直接异步执行回调
            setTimeout(() => onFulfilled(this.result))
        }
        if (this.state === "rejected") {
            setTimeout(() => onRejected(this.result))
        }
        // pending 状态：订阅回调，等待 resolve/reject 触发
        if (this.state === "pending") {
            this.fulfilledEvent.push((result) => onFulfilled(result))
            this.rejectedEvent.push((reason) => onRejected(reason))
        }
    }
}
```



+ 可以简单测试一下



```javascript
let p = new MyPromise((resolve, reject) => {
    resolve(100);
});

p.then((res) => {
        console.log("res: ", res);
    },(err) => {
        console.log("err: ", err);
    }
);
// data: 100
```



### then 链式调用


+  当我们连续调用 then 的时候（p1），如果当前 then 中的回调函数执行不返回一个 Promise 实例，那当前的 then（p1） 默认是成功态，然后去发布它的成功事件池子里的方法 
+  如果当前 then 中的回调函数执行返回一个 Promise（p2） 实例，那这个 Promise（p2） 实例就会接管（p1）实例的状态，然后去影响（p1）事件池子里的方法发布  
原理：把（p1）的 resolve 和 reject 放到 （p2） 的对应的事件池子里，然后（p2）去发布自己池子里的的方法时，（p1）的 resolve 和 reject 就会执行，从而达到间接的让 （p2）去发布（p1）池子里的方法 



```javascript
class MyPromise {
    constructor(executor) {
        this.state = "pending";
        this.fulfilledEvent = [];
        this.rejectedEvent = [];

        let resolve = (result) => {
            if (this.state !== "pending") return;
            this.state = "resolved";
            setTimeout(() => {
                this.fulfilledEvent.forEach((item) => {
                    if (typeof item === "function") {
                        item(result);
                    }
                });
            }, 0);
        };
        let reject = (reason) => {
            if (this.state !== "pending") return;
            this.state = "rejected";
            setTimeout(() => {
                this.rejectedEvent.forEach((item) => {
                    if (typeof item === "function") {
                        item(reason);
                    }
                });
            }, 0);
        };
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled = () => {}, onRejected = () => {}) {
        return new MyPromise((resolve, reject) => {
            // 状态已确定时直接执行回调（用 setTimeout 模拟微任务）
            if (this.state === "resolved") {
                setTimeout(() => {
                    let fn = onFulfilled(this.result)
                    fn instanceof MyPromise ? fn.then(resolve, reject) : resolve(fn)
                })
                return
            }
            if (this.state === "rejected") {
                setTimeout(() => {
                    let fn = onRejected(this.result)
                    fn instanceof MyPromise ? fn.then(resolve, reject) : resolve(fn)
                })
                return
            }
            // pending 状态：推入事件池等待 resolve/reject 触发
            this.fulfilledEvent.push((result) => {
                let fn = onFulfilled(result);
                fn instanceof MyPromise
                    ? fn.then(resolve, reject)
                    : resolve(result);
            });
            this.rejectedEvent.push((reason) => {
                let fn = onRejected(reason);
                fn instanceof MyPromise
                    ? fn.then(resolve, reject)
                    : resolve(reason);
            });
        });
    }
}
```



+ 可以简单测试一下



```javascript
let p1 = new MyPromise((resolve, reject) => {
    resolve(100);
});

let p2 = p1.then((res) => {
        console.log("p1 res: ", res);
        return new MyPromise((resolve, reject) => {
            resolve(200);
        });
    },(err) => {
        console.log("p1 err: ", err);
    }
);

p2.then((res) => {
        console.log("p2 res: ", res);
    },(err) => {
        console.log("p2 err: ", err);
    }
);
// p1 res:  100
// p2 res:  200
```



## Git


在工作中开发的时候，一般都是多分支开发的，有一个 master 分支（主分支），它上面存储的都是最干净的代码



正常开发的时候一般都是在别的分支上进行开发的，当开发完成之后测试没有问题了，上线，上线之后也没有问题了，那就把当前分支的代码合并到 master 主分支上



在分支上开发的时候，第一件事就是先 merge 一遍 master上的代码，保证当前分支的代码和 master 上的代码同步， -> 进行正常的需求开发 -> 当开发完成之后，把当前分支的代码再 merge 到 master 分支上



```bash
# 查看当前分支（带*就是当前所处分支）
git branch
# 创建分支
git branch (branchname)
# 切换分支
git checkout (branchname)
# 创建分支并切换到这个分支上
git checkout -b (branchname)
# 合并分支
git merge (branchname)
```



+ 一定要谨记，在某个分支上开发之前，一定要先 merge 一下 master 上的代码



**代码冲突**



```bash
git add .
git commit -m "info"
git push origin dev
# ! [rejected] dev->dev (fetch first)
# 处理一下冲突
git pull origin dev
<<<<<<< HEAD
# ...
=======
>>>>>>> e585a3...
```



**从零开始**



+ 同名分支 pull push
+ 异名分支 merge



```bash
git clone ...
git checkout -b dev
# Switched to a new branch 'dev'

# 远程master修改了
git pull origin master
# 把master代码合并到本地
git merge master
# Updating 9a87607

# 本地代码修改
git add .
git commit -m "info"
git push origin dev
```

