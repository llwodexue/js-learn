/*
    点击按钮的时候：让数量相应的增减

    怎么知道是加法按钮还是减法按钮？
    1.在结构中增加一个自定义属性flag，值1为加法，值0为减法
    2.用dom方法获取所有的加法、减法按钮
    3.根据li下面的第几个孩子button判断加减法按钮
    ...
*/
var lis = document.querySelectorAll(".uls li");
var btn = document.querySelectorAll(".uls button");
var zongjian = document.querySelector(".shopInfo .zongjian");
var zongjia = document.querySelector(".shopInfo .zongjia");
var max = document.querySelector(".shopInfo .max");
for (var i = 0; i < btn.length; i++) {
    btn[i].onclick = function () {
        var flag = this.getAttribute("flag");
        var fjd = this.parentNode;
        var numEl = fjd.querySelector(".num");
        var numValue = Number(numEl.innerText);
        var newValue = 0;
        if (flag == 1) {
            newValue = numValue + 1;
        } else {
            if (numValue <= 0) {
                newValue = 0;
                return;
            }
            newValue = numValue - 1;
            // if (numValue > 0) {
            //     newValue = numValue - 1;
            // }
        }
        numEl.innerText = newValue;

        var danjia = fjd.querySelector(".danjia").innerText;
        var xiaoji = fjd.querySelector(".xiaoji");
        var zongnum = 0;
        var zongjianum = 0;
        var ary = [];
        var max1 = 0;
        xiaoji.innerText = danjia * newValue;
        for (var i = 0; i < lis.length; i++) {
            var num1 = Number(lis[i].querySelector(".num").innerText);
            zongnum += num1;

            var zongjia1 = Number(lis[i].querySelector(".xiaoji").innerText);
            zongjianum += zongjia1;

            var danjia1 = Number(lis[i].querySelector(".danjia").innerText);
            if (num1 > 0) {
                ary.push(danjia1);
            }
        }
        if (ary.length > 0) {
            max1 = ary.sort(function (a, b) {
                return a - b;
            })[ary.length - 1];
        } else {
            max1 = 0;
        }
        zongjian.innerText = zongnum;
        zongjia.innerText = zongjianum;
        max.innerText = max1;
    };
}
