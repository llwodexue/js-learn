/* function* func() {
    return 2;
}
func.prototype.xxx = "xxx";
let itor = func();
console.log(itor.next());
console.log(itor.next());
// { value: 2, done: true }
// { value: undefined, done: true } */

/* function* func() {
    console.log("A");
    yield 1;
    console.log("B");
    yield 2;
    console.log("C");
    yield 3;
    console.log("D");
    yield 4;
}
let itor = func();
console.log(itor.next());
console.log(itor.next());
console.log(itor.return());
console.log(itor.next());
console.log(itor.next());

// A
// { value: 1, done: false }
// B
// { value: 2, done: false }
// { value: undefined, done: true }
// { value: undefined, done: true }
// { value: undefined, done: true } */


/* function* func() {
    let x1 = yield 1;
    console.log(x1);
    let x2 = yield 2;
    console.log(x2);
}
let itor = func();
console.log(itor.next());
console.log(itor.next());
console.log(itor.next());
// { value: 1, done: false }
// undefined
// { value: 2, done: false }
// undefined
// { value: undefined, done: true } */


/* function* func1(){
    yield 1;
    yield 2;
}
function* func2(){
    yield 3;
    yield func1();
    yield *func1();
    yield 4;
}
let itor = func2();
console.log(itor.next());
console.log(itor.next());
console.log(itor.next());
console.log(itor.next());
console.log(itor.next());
console.log(itor.next());

// { value: 3, done: false }
// { value: Object [Generator] {}, done: false }
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 4, done: false }
// { value: undefined, done: true } */


var query = interval => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (interval === 1000) reject(interval);
            resolve(interval);
        }, interval);
    });
}
query(1000).then(res1 => {
    return query(2000);
}).then(res2 => {
    return query(3000);
}).then(res3 => {
    console.log(res3);
})

(async () => {
    let res1 = await query(1000);
    console.log(res1);

    let res2 = await query(2000);
    console.log(res2);

    let res3 = await query(3000);
    console.log(res3);
})()

function* gen() {
    let res1 = yield query(1000);
    console.log(res1);

    let res2 = yield query(2000);
    console.log(res2);

    let res3 = yield query(3000);
    console.log(res3);
}
let itor = gen();
itor.next().value.then(res1 => {
    itor.next(res1).value.then(res2 => {
        itor.next(res2).value.then(res3 => {
            itor.next(res3); // 此时{done:true,value:undefined}
        })
    })
})

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

// async await处理的事情：构建generator执行器
function AsyncFunction(generator) {
    let itor = generator();
    const next = x => {
        let {
            value,
            done
        } = itor.next(x);
        if (done) {
            resolve(value);
            return;
        }
        if (!isPromise(value)) value = Promise.resolve(value);
        /* value.then(result => {
            next(result);
        }); */
        value.then(next).catch(reason => {
            // 如果返回的实例是失败态，跑出异常信息
            itor.throw(reason)
        });
    }
    next();
}
AsyncFunction(function* gen() {
    let res1 = yield query(1000);
    console.log(res1);

    let res2 = yield query(2000);
    console.log(res2);

    let res3 = yield query(3000);
    console.log(res3);
})