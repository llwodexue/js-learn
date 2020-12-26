var str = "";
for (var i = 0; i < 10; i++) {
    str += String.fromCharCode(48 + i);
}
for (var i = 0; i < 26; i++) {
    str += String.fromCharCode(97 + i);
    str += String.fromCharCode(65 + i);
}
console.log(str);
console.log(str.length);