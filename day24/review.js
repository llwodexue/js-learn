Array.prototype.mySlice = function (start = 0, end = this.length) {
    var arr = [];
    // start<0?this[start+this.length]:this[start]
    if (start < 0) {
        start = -start > this.length ? 0 : this.length + start;
    }
    if (end < 0) {
        end = -end > this.length ? 0 : this.length + end;
    }
    let j = 0;
    for (let i = start; i < end; i++) {
        arr[j] = this[i];
        j++;
    }
    return arr;
};
