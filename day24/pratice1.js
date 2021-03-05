var box = document.getElementById("box");
// console.log(getComputedStyle(box));
function getCss(ele, attr) {
    var val = null;
    if ("getComputedStyle" in window) {
        val = getComputedStyle(ele)[attr];
    } else {
        val = ele.currentStyle[attr];
    }
    var reg = /^(width|height|padding|margin|fontSize|lineHeight|left|top|right|bottom|opacity|)$/;
    if (reg.test(attr)) {
        val = parseFloat(val);
    }
    return val;
}

function setCss(ele, attr, val) {
    var reg = /^(width|height|padding|margin|fontSize|lineHeight|left|top|right|bottom|opacity|)$/;
    if (reg.test(attr)) {
        if (Number(val)) {
            val = val + "px";
        }
    }
    ele.style[attr] = val;
}

function setGroupCss(ele, obj) {
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) return;
        setCss(ele, key, obj[key]);
    }
}
// setGroupCss(box, {
//     width: 300,
//     height: 300,
//     backgroundColor: "blue",
// });

function css() {
    var [ele, attr, val] = arguments;
    if (arguments.length < 3) {
        if (typeof attr == "string") {
            return getCss(ele, attr);
        } else {
            setGroupCss(ele, attr);
        }
    } else {
        setCss(ele, attr, val);
    }
}
console.log(css(box, "width"));
css(box, "fontSize", 50);
css(box, {
    width: 300,
    height: 300,
    backgroundColor: "blue",
});
