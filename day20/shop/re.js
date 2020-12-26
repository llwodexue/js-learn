var lists = document.querySelector(".lists");
var links = document.querySelectorAll(".topBar .shortBtn");
var data = null;
var lis;
var xhr = new XMLHttpRequest();
xhr.open("get", "data.json");
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d{2}/.test(xhr.status)) {
        data = xhr.responseText;
        Init(data);
    }
};
xhr.send();
function Init(data) {
    var str = ``;
    for (let i = 0; i < data.length; i++) {
        var el = data[i];
        str += `<li>
        <img src="${el.img}" alt="">
        <p class="titile">${el.title}</p>
        <p class="time">${el.time}</p>
        <p class="numInfo">
            <span class="price">${el.price}</span>
            <span class="hot">${el.hot}</span>
        </p>
    </li>`;
    }
    links.innerHTML = str;
    lis = [].slice.call(lists.querySelectorAll("li"));
}
for (let i = 0; i < links.length; i++) {
    links[i].onclick = function(){
        
    }
}