var obj = {
    n: 10,
    b: obj.n * 10,
};
console.log(obj.b);
// TypeError: Cannot read property 'n' of undefined