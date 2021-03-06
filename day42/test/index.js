const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const deepClone = require("../src/index");
describe("deepClone", () => {
    it("是一个函数", () => {
        assert.isFunction(deepClone);
    });
    it("能够复制基本数据类型", () => {
        const n = 123;
        const n2 = deepClone(n);
        assert(n === n2);
        const s = "123456";
        const s2 = deepClone(s);
        assert(s === s2);
        const b = true;
        const b2 = deepClone(b);
        assert(b === b2);
        const u = undefined;
        const u2 = deepClone(u);
        assert(u === u2);
        const empty = null;
        const empty2 = deepClone(empty);
        assert(empty === empty2);
        const sym = Symbol();
        const sym2 = deepClone(sym);
        assert(sym2 === sym);
    });
    describe("对象", () => {
        it("能够复制普通对象", () => {
            const a = { name: "lion", child: { name: "cat" } };
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.name === a2.name);
            assert(a.child !== a2.child);
        });
        it("能够复制数组对象", () => {
            const a = [
                [11, 12],
                [21, 22],
                [31, 32],
            ];
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a[0] !== a2[0]);
            assert(a[1] !== a2[1]);
            assert(a[2] !== a2[2]);
            assert.deepEqual(a, a2);
        });
        it("能够复制函数", () => {
            const a = function (x, y) {
                return x + y;
            };
            a.xx = { yy: { zz: 1 } };
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.xx.yy.zz === a2.xx.yy.zz);
            assert(a.xx.yy !== a2.xx.yy);
            assert(a.xx !== a2.xx);
            assert(a(1, 2) === a2(1, 2));
        });
        it("环也能复制", () => {
            const a = { name: "lion", child: { name: "cat" } };
            a.self = a;
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.name === a2.name);
            assert(a.child !== a2.child);
            assert(a.self !== a2.self);
        });
    });
});
