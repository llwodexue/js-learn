function Fn(num) {
    // num=10
    // this f
    this.x = this.y = num;
}
Fn.prototype = {
    x: 20,
    sum: function () {
        // this f
        // f.x+f.y

        //------------
        // this Fn.prototype
        //Fn.prototype.x+Fn.prototype.y===>20+undefined=NaN
        console.log(this.x + this.y);
    }
};
let f = new Fn(10);//{x:10,y:10}
console.log(f.sum === Fn.prototype.sum);//true
f.sum();//20
Fn.prototype.sum();//NaN
console.log(f.constructor);//Object