var arr = [{ age: 30 }, { age: 10 }, { age: 20 }];
arr.sort(function (a, b) {
    return a.age - b.age;
});
console.log(arr);