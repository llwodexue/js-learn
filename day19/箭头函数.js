var fn = (x) => x;
var fn = (x) => ({ name: "lion" });

var f1 = function (a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
};
var f2 = (a) => (b) => (c) => a + b + c;
var res1 = f1(1)(2)(3);
var res2 = f2(1)(2)(3);
