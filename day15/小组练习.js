// 1.
var a = "lalala";
var obj = {
    a: "java",
    prop: {
        fn: function () {
            return this.a;
        },
    },
};
console.log(obj.prop.fn());
var res = obj.prop.fn;
console.log(res());

// 2.
var name = "window";
var tom = {
    name: "tom",
    show: function () {
        console.log(this.name);
    },
    wait: function () {
        var fun = this.show;
        fun();
    },
};
tom.wait();

// 3.
var name = "window";
var tom = {
    name: "tom",
    show: function () {
        console.log(this.name);
    },
    wait: function () {
        tom.show();
    },
};
tom.wait();

// 4.
var a = 1;
var obj1 = {
    a: 0,
    fn1: (function (a) {
        this.a = a;
        a++;
        return function () {
            this.a = a++;
            console.log(a);
        };
    })(a),
};
obj1.fn1();
var fn1 = obj1.fn1;
fn1();
console.log(a);
console.log(obj1.a);

// 5.
var num = 1;
var obj = {
    num: 2,
    fn: (function () {
        this.num *= 2;
        num += 3;
        var num = 1;
        return function () {
            num += 2;
            this.num += 2;
            console.log(++num);
        };
    })(),
};
var f = obj.fn;
f();
obj.fn();
console.log(window.num, obj.num);

// 6.
var num = 10;
var obj = { num: 15 };
obj.fn = (function (num) {
    this.num += 10;
    num *= 2;
    return function (n) {
        this.num += n;
        console.log(n + --num);
    };
})(obj.num);
var fn = obj.fn;
fn(10);
obj.fn(15);
console.log(window.num, obj.num);

// 7.
(function () {
    var val = 1;
    var json = {
        val: 10,
        dbl: function () {
            val *= 2;
        },
    };
    json.dbl();
    console.log(json.val + val);
})();


