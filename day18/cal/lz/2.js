var btn = document.querySelectorAll(".uls button");
for (var i = 0; i < btn.length; i++) {
    btn[i].onclick = function () {
        var flag = this.getAttribute("flag");
        var fjd = this.parentNode;
        var jianshu = fjd.querySelector(".jianshu");
        var jianshuNum = Number(jianshu.innerText);
        if (flag == "1") {
            jianshuNum += 1;
        } else {
            if (jianshuNum > 0) {
                jianshuNum -= 1;
            }
            // if (jianshuNum < 0) {
            //     jianshuNum = 0;
            //     return;
            // }
            // jianshuNum -= 1;
        }
        jianshu.innerText = jianshuNum;
        var danjia = Number(fjd.querySelector(".danjia").innerText);
        var xiaoji = fjd.querySelector(".xiaoji");
        xiaoji.innerText = jianshuNum * danjia;

        var lis = document.querySelectorAll("li");
        var zongjian = document.querySelector(".zongjian");
        var zongjia = document.querySelector(".zongjia");
        var max = document.querySelector(".max");
        var jianshu1 = 0;
        var zongjia1 = 0;
        var max1 = 0;
        var ary = [];
        for (var i = 0; i < lis.length; i++) {
            var jianshu2 = Number(lis[i].querySelector(".jianshu").innerText);
            jianshu1 += jianshu2;
            zongjia1 += Number(lis[i].querySelector(".xiaoji").innerText);
            var danjia1 = Number(lis[i].querySelector(".danjia").innerText);
            if (jianshu2 > 0) {
                ary.push(danjia1);
            }
        }
        zongjian.innerText = jianshu1;
        zongjia.innerText = zongjia1;
        if (ary.length > 0) {
            max1 = ary.sort(function (a, b) {
                return a - b;
            })[ary.length - 1];
        } else {
            max1 = 0;
        }
        max.innerText = max1;
    };
}
