function problem() {
    let o1 = new Object();
    let o2 = new Object();
    o1.A = o2;
    o2.B = o1;
}

let el = document.getElementById("div");
let o = new Object();
o.el = el;
el.obj = o;

o.el = null;
el.obj = null;

function Person(name) {
    this.age = 12;
    this.name = name;
}
let a1 = new Person();
let a2 = new Person("lion");

function say() {
    name = "lion";
}

let name = "lion";
setInterval(() => {
    console.log(name);
}, 100);

let out = function () {
    let name = "lion";
    return function () {
        return name;
    };
};
