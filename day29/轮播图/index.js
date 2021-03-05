let outer = document.getElementById("outer");
let wrapper = document.getElementById("wrapper");
let list = document.getElementById("list");
let lis = list.getElementsByTagName("li");
let data = null;
let timer = null;
let step = 0;

// 1.数据请求
function getData(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", url, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            renderHtml(data);
        }
    };
    xhr.send();
}
getData("./banner.json");

// 2.渲染图片
function renderHtml(data) {
    let imgs = "";
    let lis = "";
    data.forEach((item, index) => {
        imgs += `<li><img src="${item.img}" alt=""></li>`;
        lis += "<li></li>";
    });
    imgs += `<li><img src="${data[0].img}" alt=""></li>`;
    wrapper.innerHTML = imgs;
    list.innerHTML = lis;
}

// 3.实现自动轮播，每隔2000ms执行一次
function autoMove(index) {
    step++;
    // 如果当前函数执行时index没有值，那就什么都不做，如果index有值，就把index赋值给step即可
    typeof index == "undefined" ? null : step = index;
    // 如果当前的step>=5说明已经运动到最后一张图片了，这时候需要马上把wrapper的left值改为0
    // 这时step改为1，正常显示第二张
    if (step >= 5) {
        wrapper.style.left = 0;
        step = 1;
    }
    utils.animate(wrapper, {
        left: -800 * step
    }, 500);
    changeFocus();
}
timer = setInterval(autoMove, 2000);

// 4.鼠标划上图片停止轮播 鼠标离开继续轮播
outer.onmouseover = function () {
    clearInterval(timer);
}
outer.onmouseout = function () {
    clearInterval(timer);
    timer = setInterval(autoMove, 2000);
}

// 5.实现焦点跟随，显示哪一张图片，就给对应的焦点li加上类名active
function changeFocus() {
    // 循环所有的焦点，判断一下当前的step和哪个焦点的索引相等，和谁相等就给谁加上active类名，其余的清除active类名
    // 如果当前的step是4，说明当前页面显示的是最后一张图片，它和第一张图公用一个焦点，这时让第一个焦点高亮即可
    for (let i = 0; i < lis.length; i++) {
        if (i == step) {
            lis[i].classList.add("active");
        } else {
            lis[i].classList.remove("active");
        }
    }
    if (step == data.length) {
        lis[0].classList.add("active");
    }
}
changeFocus();

// 6.点击焦点，实现切换对应图片
function bindClick() {
    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            // step = i -1 // 因为autoMove内部有step++，所以在这里要减1，这样就会跟autoMove内部的step++相互抵消
            // autoMove()
            autoMove(i);
        }
    }
}
bindClick();

// 7.控制箭头
right.onclick = function () {
    autoMove();
}
left.onclick = function () {
    if (step == 0) {
        step = data.length;
        wrapper.style.left = (data.length) * -800 + 'px';
    }
    step--;
    // step -= 2;
    // if (step == -2) {
    //     wrapper.style.left = (data.length) * -800 + 'px';
    //     step = data.length - 2;
    // }
    // autoMove()
    autoMove(step)
}