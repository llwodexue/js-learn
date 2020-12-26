function Fn(num) {
    this.x = this.y = num;
}
Fn.prototype = {
    x: 20,
    sum: function () {
        console.log(this.x + this.y);
    },
};
let f = new Fn(10);
console.log(f.sum === Fn.prototype.sum); // true
f.sum(); // 20
Fn.prototype.sum(); // 20+undefined NaN
console.log(f.constructor); // object

var arr = ["http://llmysnow.top/posts/3344fd09/","http://llmysnow.top/posts/6669e648/","http://llmysnow.top/posts/5a7a946b/","http://llmysnow.top/posts/ea26882a/","http://llmysnow.top/posts/bf596df5/","http://llmysnow.top/posts/fc53734b/","http://llmysnow.top/posts/47fd9c19/","http://llmysnow.top/posts/8a7b4226/","http://llmysnow.top/posts/908d091d/","http://llmysnow.top/posts/97acee74/"];
for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    console.log(element);
}
http://llmysnow.top/posts/3344fd09/
http://llmysnow.top/posts/6669e648/
http://llmysnow.top/posts/5a7a946b/
http://llmysnow.top/posts/ea26882a/
http://llmysnow.top/posts/bf596df5/
http://llmysnow.top/posts/fc53734b/
http://llmysnow.top/posts/47fd9c19/
http://llmysnow.top/posts/8a7b4226/


http://llmysnow.top/posts/908d091d/
http://llmysnow.top/posts/97acee74/