let uls = document.getElementsByTagName("ul");
uls = [].slice.call(uls);
let winH = utils.win("clientHeight");
let winT = utils.win("scrollTop");
getData();
function getData() {
    let data = null;
    let xhr = new XMLHttpRequest();
    xhr.open("get", "data.txt", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            data = JSON.parse(xhr.responseText);
            renderHtml(data);
        }
    };
    xhr.send();
}
function renderHtml(data) {
    for (let i = 0; i < 20; i++) {
        let index = Math.round(Math.random() * 9);
        let dataInx = data[index];
        let li = document.createElement("li");
        let p = document.createElement("p");
        let img = document.createElement("img");
        p.innerText = dataInx.title;
        img.setAttribute("true-src", dataInx.src);
        img.classList.add("bg");
        img.style.height = Math.round(Math.random() * 100 + 260) + "px";
        li.appendChild(img);
        li.appendChild(p);
        uls.sort(function (a, b) {
            return a.scrollHeight - b.scrollHeight;
        });
        uls[0].appendChild(li);
    }
}
let imgs = document.getElementsByClassName("bg");
delayImg(imgs, winT);
function delayImg(imgs, winT) {
    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        let imgH = img.scrollHeight;
        let imgT = utils.offset(img).top;
        if (winT + winH >= imgH + imgT) {
            let newImg = new Image();
            let trueSrc = img.getAttribute("true-src");
            newImg.src = trueSrc;
            newImg.onload = function () {
                img.src = trueSrc;
                img.classList.remove("bg");
                fadeIn(img);
            };
        }
    }
}
function isLoad(winT) {
    let bodyT = utils.win("scrollHeight");
    if (winT + winH >= bodyT) {
        getData();
    }
}
function backShow(winT) {
    if (winT >= winH) {
        utils.css(back, "display", "block");
    } else {
        utils.css(back, "display", "none");
    }
}
back.onclick = function () {
    let winT = utils.win("scrollTop");
    let part = winT / 50;
    let timer = setInterval(function () {
        winT -= part;
        utils.win("scrollTop", winT);
        if (winT <= 0) {
            clearInterval(timer);
            timer = null;
        }
    }, 20);
};
function fadeIn(img) {
    utils.css(img, "opacity", 0.05);
    let opacity = utils.css(img, "opacity");
    let timer = setInterval(function () {
        opacity += 0.05;
        utils.css(img, "opacity", opacity);
        if (opacity >= 1) {
            clearInterval(timer);
            timer = null;
        }
    }, 20);
}
window.onscroll = function () {
    winT = utils.win("scrollTop");
    delayImg(imgs, winT);
    isLoad(winT);
    backShow(winT);
};
