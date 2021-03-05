let body = document.documentElement;
body.addEventListener("click", function () {
    Promise.resolve().then(() => {
        //微任务1
        console.log(1);
    });
    console.log(2);
}); //宏任务1
body.addEventListener("click", function () {
    Promise.resolve().then(() => {
        console.log(3);
    });
    console.log(4);
}); //宏任务2
