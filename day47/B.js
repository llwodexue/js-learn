let a = require("./A");
let avg = (...arg) => {
    arg = arg.sort((a, b) => a - b).slice(1, arg.length - 1);
    return a.sum(...arg) / arg.length;
};
module.exports = {
    avg,
};
