var arr = [1, 2, 3, 4, 2, 2, 4];
function unique(arr) {
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
console.log(unique(arr));
