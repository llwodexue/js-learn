/*
1.获取素有i标签，给他们绑定点击事件
*/
$(".list i").click(function () {
    // 获取当前元素在他的兄弟姐妹中的索引
    let index = $(this).index();
    // 获取em标签里的购买数量
    let count = parseFloat($(this).siblings("em").text());
    // 获取两个strong（单价和小计）
    let $strong = $(this).siblings("span").find("strong");
    // 获取单价
    let price = parseFloat($strong.eq(0).text());
    if (index == 0) {
        count--;
        count < 0 ? (count = 0) : null;
    } else {
        count++;
        count > 10 ? (count = 10) : null;
    }
    // 设置购买数量
    $(this).siblings("em").text(count);
    $strong.eq(1).text(price * count + "元");
    computed();
});
function computed() {
    // 计算商品总数量和商品总价格，和最贵的商品单价
    // 初始化一个数组，存放购买商品的单价
    let totalCount = 0;
    let totalPrice = 0;
    let ary = [0];
    // 获取list里的所有em数量，循环累加，最后设置到页面（info里的第一个em）
    $(".list em").each(function (index, item) {
        let count = parseFloat($(item).text());
        totalCount += count;
    });
    // $(".list strong:odd").each(function (index, item) {
    //     let price = parseFloat($(item).text());
    //     totalPrice += price;
    // });
    $(".list strong").each(function (index, item) {
        let indexs = $(item).index();
        if (indexs == 1) {
            let subtotal = parseFloat($(item).text());
            let price = parseFloat($(item).prev().text());
            totalPrice += subtotal;
            if (subtotal) {
                ary.push(price);
            }
        }
    });
    $(".info em").eq(0).text(totalCount);
    $(".info em").eq(1).text(totalPrice);
    $(".info em").eq(2).text(Math.max(...ary));
}
