// ES7: generator + promise 的语法糖 async await
// async function fn() {
//     try {
//         console.log(a);
//     } catch {}
//     return 10;
// }
// console.log(fn());
// fn().then();


function api(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(interval)
        }, interval);
    });
}
// await：后面应该放置一个promise实例（即使我们书写的不是promise实例，浏览器也会把其变为promise实例），await会中断函数体中，其下面的代码执行（await表达式会暂停整个async函数的执行过程并出让其控制权）
// 只有等待await后面的实例是成功态之后，才会把之前暂停的代码继续执行，如果后面的promise实例是失败的，则下面的代码就不再执行了
/* async function func() {
    await 1;
    let result1 = await api(1000);
    console.log(result1);
    let result2 = await api(2000);
    console.log(result2);
}
func();


async function foo() {
    await 1;
    return Promise.resolve(1).then(() => undefined)
}
console.log(foo()); */

var resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

var resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

var sequentialStart = async function () {
    console.log('==SEQUENTIAL START==');

    // 1. Execution gets here almost instantly
    const slow = await resolveAfter2Seconds();
    console.log(slow); // 2. this runs 2 seconds after 1.

    const fast = await resolveAfter1Second();
    console.log(fast); // 3. this runs 3 seconds after 1.
}
var concurrentStart = async function () {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds(); // starts timer immediately
    const fast = resolveAfter1Second(); // starts timer immediately

    // 1. Execution gets here almost instantly
    console.log(await slow); // 2. this runs 2 seconds after 1.
    console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}
var concurrentPromise = function () {
    console.log('==CONCURRENT START with Promise.all==');
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
        console.log(messages[0]); // slow
        console.log(messages[1]); // fast
    });
}
var parallel = async function () {
    console.log('==PARALLEL with await Promise.all==');

    // Start 2 "jobs" in parallel and wait for both of them to complete
    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Second()))()
    ]);
}

// This function does not handle errors. See warning below!
var parallelPromise = function () {
    console.log('==PARALLEL with Promise.then==');
    resolveAfter2Seconds().then((message) => console.log(message));
    resolveAfter1Second().then((message) => console.log(message));
}
sequentialStart();
concurrentStart();
concurrentPromise();
parallel();
parallelPromise();