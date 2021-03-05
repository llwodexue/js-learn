console.log(1);
let p1 = new Promise((resolve, reject) => {
    console.log(8);
    setTimeout(() => {
        console.log(7);
        resolve()
    });
    reject();
});
console.log(2);
p1.then(() => {
    console.log(3);
}, () => {
    console.log(4);
});
console.log(5);

// 1 8 2 5 7 3
// 1 8 2 5 4 7