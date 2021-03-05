let obj = [100, 200, 300, 400];

function off(ele, type, fn) {
    let pool = ele[type];
    ele[type] = pool.filter((item, index) => {
        return item != fn;
    })
}
let res = off(obj, "click", 200);