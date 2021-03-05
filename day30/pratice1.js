let data = null;
let timer = null;
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
    $("img").eq(step).fadeIn()
}