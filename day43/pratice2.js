function countStr(str) {
    let obj = {};
    for (let i = 0; i < str.length; i++) {
        obj[str[i]] ? obj[str[i]]++ : (obj[str[i]] = 1);
    }
    return obj;
}
console.log(countStr("abcabc"));;
