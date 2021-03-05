let timer = null;
let url = "./banner.json";
let step = 0;
let lens = 0;
// 1.数据请求
$.ajax({
    url: url,
    async: false,
    success: (res) => {
        bindHtml(res);
        lens = res.length;
        timer = setInterval(autoMove, 2000);
    }
})
// 2.渲染图片
function bindHtml(data) {
    let imgs = "";
    let lis = "";
    $.each(data, (index, item) => {
        imgs += `<li><img src="${item.img}" alt=""></li>`;
        lis += "<li></li>";
    });
    imgs += `<li><img src="${data[0].img}" alt=""></li>`;
    $("#wrapper").html(imgs);
    $("#list").html(lis);
}
// 3.实现自动轮播，每隔1000ms执行一次
function autoMove(index) {
    step++;
    typeof index == "undefined" ? null : step = index;
    if (step >= 5) {
        step = 1;
        $("#wrapper").animate({
            left: "0px"
        }, 0)
    }
    $("#wrapper").animate({
        left: -$("#outer").width() * step + "px",
    }, 1000)
    changeFocus();
}
// 4.鼠标划上图片停止轮播 鼠标离开继续轮播
$("#outer").hover(() => {
    clearInterval(timer);
}, () => {
    timer = setInterval(autoMove, 2000);
})
// 5.实现焦点跟随，显示哪一张图片，就给对应的焦点li加上类名active
function changeFocus() {
    $("#list li").eq(step).addClass("active").siblings().removeClass("active");
    if (step == lens) {
        $("#list li").eq(0).addClass("active").siblings().removeClass("active");
    }
}
changeFocus();
// 6.点击焦点，实现切换对应图片
function bindClick() {
    $("#list li").click(function () {
        autoMove($(this).index());
    })
}
bindClick();
// 7.控制箭头
$("#right").click(function () {
    autoMove();
})
$("#left").click(function () {
    if (step == 0) {
        step = lens;
        $("#wrapper").animate({
            left: lens * -800 + "px"
        }, 0)
    }
    step--;
    autoMove(step);
})
