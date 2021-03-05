Array.prototype.mySplice = function (start, del) {
    let arr = [];
    if (start < 0) {
        start = -start > this.length ? 0 : this.length + start;
    }
    if (arguments.length <= 1) {
        for (let i = start; i < this.length; i) {
            arr.push(this[i]);
            for (let j = i; j < this.length - 1; j++) {
                [this[j], this[j + 1]] = [this[j + 1], this[j]];
            }
            this.length--;
        }
    } else {
        let that = del;
        for (let i = that; i > 0; i++) {
            if (that <= 0) {
                break;
            }
            for (let j = start; j < this.length - 1; j++) {
                [this[j], this[j + 1]] = [this[j + 1], this[j]];
            }
            arr.push(this[this.length - 1]);
            this.length--;
            that--;
        }
        let lArr = [];
        for (let i = 0; i < start; i++) {
            lArr.push(this[i]);
        }
        for (let i = 0; i < arguments.length - 2; i++) {
            lArr.push(arguments[i + 2]);
        }
        for (let i = start; i < this.length; i++) {
            lArr.push(this[i]);
        }
        for (let i = 0; i < lArr.length; i++) {
            this[i] = lArr[i];
        }
    }
    return arr;
};
for (let i = 0; i < this.length - start - delNum; i++) {
    this[start + i] = this[start + delNum + i];
}
this.length -= delNum;