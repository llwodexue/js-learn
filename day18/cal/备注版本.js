/*
    点击按钮的时候：让数量相应的增减

    怎么知道是加法按钮还是减法按钮？
    1.在结构中增加一个自定义属性flag，值1为加法，值0为减法
    2.用dom方法获取所有的加法、减法按钮
    3.根据li下面的第几个孩子button判断加减法按钮
    ...

    */
//所有按钮（加、减）
var btns = document.querySelectorAll(".shopContent button");
//所有“件数”盒子
var numArrayEle = document.querySelectorAll(".shopContent .num");
//“总件数”盒子
var totalNumEle = document.querySelector(".shopInfo .totalNum");
//所有“小计”盒子
var xjMoneyArrayEle = document.querySelectorAll(".shopContent .xjMoney");
//“总钱数”盒子
var totalMoneyEle = document.querySelector(".shopInfo .totalMoney");
//li列表
var lis = document.querySelectorAll(".shopContent li");
//“选中商品最贵单价”盒子
var specialItemPriceEle = document.querySelector(".shopInfo .specialItemPrice");

for (var i = 0; i < btns.length; i++) {
    //给按钮绑定点击事件
    btns[i].onclick = function () {
        //获取当前button的flag属性，用于判断是加法还是减法按钮
        var flag = this.getAttribute("flag");
        //console.log(flag);
        //当前button的父节点，通过父节点可以获取需要操作的子盒子
        var parentEle = this.parentNode;
        //console.log(parentEle);
        //单价
        var itemPrice = Number(parentEle.querySelector(".itemPrice").innerText);
        //console.log(itemPrice);
        //“小计”盒子
        var xjMoneyEle = parentEle.querySelector(".xjMoney");
        //console.log(xjMoneyEle);
        //“件数”盒子，点击加/减法按钮影响里面的件数，每次变动 1
        var numEle = parentEle.querySelector(".num");
        //console.log(numEle);
        //记录“件数”盒子中原始数值，用于计算
        var oldNum = Number(numEle.innerText);
        //console.log(oldNum);
        //存放加/减运算后的“新件数”
        var nowNum = 0;
        //总件数
        var totalNum = 0;
        //总钱数
        var totalMoney = 0;
        //件数大于0的商品单价数组
        var numAry = [];
        //选中商品中最贵的单价
        //var maxMoney=null;
        var maxMoney = 0;
        //加法按钮
        if (flag == 1) {
            nowNum = oldNum + 1;
        } else {
            //减法按钮
            if (oldNum - 1 < 0) {
                nowNum = 0;
                return;
            }
            nowNum = oldNum - 1;
            /* if(oldNum>0){
                    nowNum=oldNum-1;
                } */
        }
        //修改“件数”盒子中的值为 新件数
        numEle.innerText = nowNum;
        //修改“小计”盒子中的值为 新件数*单价
        xjMoneyEle.innerText = nowNum * itemPrice;
        //通过for循环计算总数（拿到每一个件数小盒子中的值进行求和）
        for (var i = 0; i < numArrayEle.length; i++) {
            //总件数
            totalNum += Number(numArrayEle[i].innerText);

            //总钱数
            totalMoney += Number(xjMoneyArrayEle[i].innerText);
        }
        //console.log(totalNum);
        //修改“总件数”盒子中的数值
        totalNumEle.innerText = totalNum;
        //通过for循环计算总数（拿到每一个小计盒子中的值进行求和）
        /* for(var i=0;i<xjMoneyArrayEle.length;i++){
                totalMoney+=Number(xjMoneyArrayEle[i].innerText);
            } */
        //修改“总钱数”盒子中的数值
        totalMoneyEle.innerText = totalMoney;

        //获取已选商品的单价数组
        for (var i = 0; i < lis.length; i++) {
            var item = lis[i];
            //选中的商品（件数大于0）
            if (item.querySelector(".num").innerText > 0) {
                //获取单价
                var value = item.querySelector(".itemPrice").innerText;
                numAry.push(value);
            }
        }
        //未选择商品
        if (numAry.length < 1) {
            maxMoney = "---";
        } else {
            //获取已选商品单价数组中的最大值
            maxMoney = numAry.sort(function (a, b) {
                return a - b;
            })[numAry.length - 1];
        }

        /* if(numAry.length>0){
                maxMoney=numAry.sort(function(a,b){return a-b})[numAry.length-1];
            }  */
        //修改“选中商品最贵单价”盒子中的值
        specialItemPriceEle.innerText = maxMoney;
    };
}
