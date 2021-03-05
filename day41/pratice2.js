class Iterator {
    constructor(assemble) {
        let self = this;
        self.assemble = assemble;
        self.index = 0;
    }
    next() {
        let self = this;
        if (self.index > self.assemble.length - 1) {
            return {
                done: true,
                value: undefined
            };
        }
        return {
            done: false,
            value: self.assemble[self.index++]
        };
    }
}
// let itor = new Iterator([10, 20, 30, 40]);
// console.log(itor.next());
// console.log(itor.next());
// console.log(itor.next());
// console.log(itor.next());
// console.log(itor.next());



// for of 循环就是按照迭代器的规范去遍历集合中的每一项


let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    // [Symbol.iterator]: Array.prototype[Symbol.iterator]
    [Symbol.iterator]: function () {
        return new Iterator(this);
    }
}
for (const item of obj) {
    console.log(item);
}