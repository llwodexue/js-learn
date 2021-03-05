let sum = (...arg) => {
    return arg.reduce((acc, item) => {
        return acc + item;
    }, 0);
};
module.exports = {
    sum,
};
