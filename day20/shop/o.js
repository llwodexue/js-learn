var data = null;
var lists = document.querySelector(".lists");
var links = document.querySelectorAll(".topBar a");
var lis;
var xhr = new XMLHttpRequest();
xhr.open("get", "data.json");
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d{2}/.test(xhr.status)) {
        data = JSON.parse(xhr.responseText);
        Init(data);
    }
};
xhr.send();

function Init(data) {
    var str = ``;
    for (let i = 0; i < data.length; i++) {
        var el = data[i];
        str += `<li time="${el.time}" hot="${el.hot}" price="${el.price}">
        <img src="${el.img}" alt="">
        <p class="titile">${el.title}</p>
        <p class="time">${el.time}</p>
        <p class="numInfo">
            <span class="price">${el.price}</span>
            <span class="hot">${el.hot}</span>
        </p>
    </li>`;
    }
    lists.innerHTML = str;
    lis = [].slice.call(lists.querySelectorAll(".lists li"));
}
for (let i = 0; i < links.length; i++) {
    links[i].flag = -1;
    links[i].onclick = function () {
        var that = this;
        for (let i = 0; i < links.length; i++) {
            if (links[i] != this) {
                links[i].flag = -1;
            }
        }
        this.flag *= -1;
        var sortFlag = this.getAttribute("sortFlag");
        var arrowArr = this.querySelectorAll("b");
        var arrs = document.querySelectorAll(".arrows .current");
        var frg = document.createDocumentFragment();
        // for (let i = 0; i < arrs.length; i++) {
        //     arrs[i].classList.remove("current");
        // }
        if (this.flag == 1) {
            arrowArr[0].classList.add("current");
        } else {
            arrowArr[1].classList.add("current");
        }
        if (sortFlag == "time") {
            lis.sort(function (a, b) {
                return (
                    (a.getAttribute(sortFlag).replace(/-/g, "") -
                        b.getAttribute(sortFlag).replace(/-/g, "")) *
                    that.flag
                );
            });
        } else {
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
