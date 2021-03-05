/*
    点击按钮的时候：让数量相应的增减
    怎么知道是加法按钮还是减法按钮？在结构中增加一个自定义属性flag
*/
// 所有数组（加、减）
var btn = document.querySelectorAll(".shop button");
// 所有件数
var numArrEle = document.querySelectorAll(".shop .num");
// 总件数
var totalNumEle = document.querySelector(".shopInfo .totalNum");
var iPriceArrEle = document.querySelectorAll(".shop .isum");
var totalMoneyEle = document.querySelector(".shopInfo .totalMoney");
var specialPrice = document.querySelector(".shopInfo .specialPrice");
var lis = document.querySelectorAll(".shop li");
for (var i = 0; i < btn.length; i++) {
    // 给按钮帮点点击事件
    btn[i].onclick = function () {
        // 获取当前button的flag属性，用于判定是加法还是减法
        var flag = this.getAttribute("flag");
        // 当前button的父节点，通过父节点获取操作的子盒子
        var parentEl = this.parentNode;
        // 单价
        var iPrice = Number(parentEl.querySelector(".iprice").innerText);
        // 小计盒子
        var iSum = parentEl.querySelector(".isum");
        // 件数盒子，点击加/减影响里面的件数
        var numEl = parentEl.querySelector(".num");
        // 记录盒子中原始值
        var oldNum = Number(numEl.innerText);
        // 存放加/减
        var nowNum = 0;
        // 总计多少元
        var totalNum = 0;
        var totalMoney = 0;
        var numArr = [];
        var maxMoney = 0;
        if (flag == 1) {
            nowNum = oldNum + 1;
        } else {
            if (oldNum > 0) {
                nowNum = oldNum - 1;
            }
        }
        numEl.innerText = nowNum;
        iSum.innerText = iPrice * nowNum;
        for (var i = 0; i < numArrEle.length; i++) {
            totalNum += Number(numArrEle[i].innerText);
            totalMoney += Number(iPriceArrEle[i].innerText);
        }
        totalNumEle.innerText = totalNum;
        totalMoneyEle.innerText = totalMoney;
        for (var i = 0; i < lis.length; i++) {
            var item = lis[i];
            if (item.querySelector(".num").innerText > 0) {
                var value = item.querySelector(".iprice").innerText;
                numArr.push(value);
            }
        }
        if (numArr.length < 1) {
            maxMoney = 0;
        }else{
            maxMoney = numArr.sort(function (a, b) {
                return a - b;
            })[numArr.length - 1];
        }
        specialPrice.innerText = maxMoney;
    };
}
