function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
var getName = function () {
    console.log(2);
};
console.log(Foo.getName);