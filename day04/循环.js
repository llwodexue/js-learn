var obj = { name: "lion", undefined: null };
for (var key in obj) {
    console.log(key);
    console.log(obj[key]);
}

var i = 0;
while (i < 10) {
    i++;
    console.log(i);
}

var j = 0;
do {
    console.log("start");
} while (j > 1);
{
    j++;
    console.log(j);
}
