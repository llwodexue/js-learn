var data = null;
var str = ``;
var lists = document.querySelector(".lists");
var links = document.querySelectorAll(".topBar a");
var lis;
// 创建 ajax 实例
var xhr = new XMLHttpRequest();
// 打开请求的地址 false 同步 true 异步
xhr.open("get", "data.json");
xhr.onreadystatechange = function () {
    // xhr.status 符合以2开头的三位数
    if (xhr.readyState == 4 && /^2\d{2}/.test(xhr.status)) {
        // xhr.responseText 获取到的是JSON字符串
        data = JSON.parse(xhr.responseText);
        bindHTML(data);
    }
};
// 发送请求
xhr.send();
// 绑定数据
function bindHTML(data) {
    data.forEach((item, index) => {
        str += `<li time="${item.time}" hot="${item.hot}" price="${item.price}">
        <img src="${item.img}" alt="">
        <p class="titile">${item.title}</p>
        <p class="time">${item.time}</p>
        <p class="numInfo">
            <span class="price">${item.price}</span>
            <span class="hot">${item.hot}</span>
        </p>
    </li>`;
    });
    lists.innerHTML = str;
    lis = [].slice.call(document.querySelectorAll("#main li"));
}

for (let i = 0; i < links.length; i++) {
    links[i].flag = -1;
    // 给每一个 a 标签绑定点击事件
    links[i].onclick = function () {
        for (var i = 0; i < links.length; i++) {
            if (links[i] != this) {
                links[i].flag = -1;
            }
        }
        // 文档碎片
        var frg = document.createDocumentFragment();
        var that = this;
        this.flag *= -1;
        var arrowArr = this.querySelectorAll("b");
        // 为了保证只选中一个，在添加之前，都先清除掉
        var arrs = document.querySelectorAll(".arrows .current");
        for (var i = 0; i < arrs.length; i++) {
            arrs[i].classList.remove("current");
        }
        if (this.flag == 1) {
            // 升序
            arrowArr[0].classList.add("current");
        } else {
            // 降序
            arrowArr[1].classList.add("current");
        }
        var sortFlag = this.getAttribute("sortFlag");
        if (sortFlag == "time") {
            // 事件排序
            // 回调函数的 this 是window，所以需要存储一下 this
            lis.sort(function (a, b) {
                // debugger
                return (
                    (a.getAttribute(sortFlag).replace(/-/g, "") -
                        b.getAttribute(sortFlag).replace(/-/g, "")) *
                    that.flag
                );
            });
        }
        // else if (sortFlag == "hot") {
        //     // 热度排序
        //     lis.sort(function (a, b) {
        //         return a.getAttribute("hot") - b.getAttribute("hot");
        //     });
        // } else {
        //     // 价钱排序
        //     lis.sort(function (a, b) {
        //         return a.getAttribute("price") - b.getAttribute("price");
        //     });
        // }
        else {
            lis.sort(function (a, b) {
                return (
                    (a.getAttribute(sortFlag) - b.getAttribute(sortFlag)) *
                    that.flag
                );
            });
        }
        for (let i = 0; i < lis.length; i++) {
            frg.appendChild(lis[i]);
        }
        lists.appendChild(frg);
    };
}
