var time = "2019-12-3";
function timeFormat(template = "{0}年{1}月{2}日 {3}时{4}分{5}秒") {
    let timeArr = this.match(/\d+/g);
    // ["2019", "12", "3", "12", "12", "3"]
    template = template.replace(/\{(\d)\}/g, (...arg) => {
        let [, index] = arg;
        // 如果在 timeArr 中获取不到对应的值，就赋一个默认值“00”
        let time = timeArr[index] || "00"
        time = time.length < 2 ? "0" + time : time;
        return time;
    });
    return template;
}
String.prototype.timeFormat = timeFormat;
console.log(time.timeFormat());


