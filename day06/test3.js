function unique1(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var el1 = arr[i];
        for (var j = i + 1; j < arr.length; j++) {
            var el2 = arr[j];
            if (el1 == el2) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

function unique2(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        if (obj[el] == el) {
            arr.splice(i, 1);
            i--;
            continue;
        }
        obj[el] = el;
    }
    return arr;
}

function unique3(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        if (newArr.indexOf(el) == -1) {
            newArr.push(el);
        }
    }
    return arr;
}

var arr = [1, 2, 3, 1, 1, 2, 3];
console.log(unique1(arr));
console.log(unique2(arr));
console.log(unique3(arr));