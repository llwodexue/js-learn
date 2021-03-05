(function () {
    let data = null;
    let timer = null;
    let step = 0;
    // 1.获取数据
    let getData = () => {
        $.ajax({
            url: './banner.json',
            type: 'get',
            async: false,
            success: (res) => {
                data = res;
            }
        })
    };
    getData();
    // 2.数据渲染
    let bindHtml = () => {
        let imgs = '';
        let lis = '';
        $.each(data, function (index, item) {
            imgs += ` <img src="${item.img}" alt="">`;
            lis += `<li></li>`
        });
        $('#wrapper').html(imgs);
        $('#list').html(lis)
    }
    bindHtml();

    // 3.启动定时器，完成轮播
    let autoMove = () => {
        step++;
        if (step == 5) {
            step = 0;
        }
        changeFocus();
        $("img").eq(step).fadeIn().siblings().fadeOut()
    }
    timer = setInterval(autoMove, 1000);

    // 4.实现焦点跟随
    let changeFocus = () => {
        // eq通过索引扎到某一个li
        // eq：获取的事jq版的元素
        // get：获取原生版的元素
        // index：获取当前元素在自己兄弟姐妹中的索引（纯数字）
        $("#list li").eq(step).addClass("select").siblings().removeClass("select");
    }
    changeFocus();

    // 5. 鼠标划上停止动画
    $("#outer").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(autoMove, 1000);
    })

    // 6.划上li，显示对应的图片
    $("#list li").hover(function () {
        let index = $(this).index();
        step = index - 1;
        autoMove();
    })

    // 7.实现左右点击
    $("#right").click(function () {
        autoMove();
    })
    $("#left").click(function () {
        step -= 2;
        if (step == -2) {
            step = data.length - 2;
        }
        autoMove();
    })
})()