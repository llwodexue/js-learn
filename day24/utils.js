let utils = (function () {
    function offset(el) {
        let left = el.offsetLeft;
        let top = el.offsetTop;
        let parent = el.offsetParent;
        while (parent !== document.body) {
            left += parent.offsetLeft + parent.clientLeft;
            top += parent.offsetTop + parent.clientTop;
            parent = parent.offsetParent;
        }
        return {
            left,
            top,
        };
    }

    function win(attr, val) {
        if (val == undefined) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }

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
    return {
        offset,
        win,
        css,
    };
})();
