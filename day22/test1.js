let time = "2020-1-23 10:2:10";
String.prototype.timeFormat = function (
    template = "{0}年{1}月{2}日 {3}时{4}分{5}秒"
) {
    let reg = /\d+?/g;
    let timeArr = this.match(reg);
    let b = reg.exec(this);
    console.log(b);
    template = template.replace(/\{\d\}/g, (a, index) => {
        let time = timeArr[index] || "00";
        time.length < 2 ? "0" + time : time;
        return time;
    });
    // console.log(template);
};
time.timeFormat();
