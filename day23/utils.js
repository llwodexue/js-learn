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
        };0
    }

    function win(attr, val) {
        if (val == undefined) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }
    return {
        offset,
        win,
    };
})();