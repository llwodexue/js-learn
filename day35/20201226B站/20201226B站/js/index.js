// 得到元素到页面顶部的距离
function getTop(ele) {
    let top = ele.offsetTop,
        left = ele.offsetLeft,
        parent = ele.offsetParent;
    while(parent) {
        top += parent.offsetTop;
        left += parent.offsetLeft;
        parent = parent.offsetParent;
    }
    return {
        top,
        left
    }
}
let mapList = [{
    id: 'guochuang',
    text: '国创',
    top: 0,
    active: false
}, {
    id: 'yinyue',
    text: '音乐',
    top: 0,
    active: false
}, {
    id: 'fanju',
    text: '番剧',
    top: 0,
    active: false
}, {
    id: 'manhua',
    text: '漫画',
    top: 0,
    active: false
}, {
    id: 'wudao',
    text: '舞蹈',
    top: 0,
    active: false
}, {
    id: 'donghua',
    text: '动画',
    top: 0,
    active: false
}, {
    id: 'zixun',
    text: '资讯',
    top: 0,
    active: false
}];
let navigation = document.querySelector('.navigation'),
    list = navigation.querySelector('.list'),
    isEdit = false
// 获取页面板块到顶部的距离
function computedTop () {
    console.log(mapList)
    mapList = mapList.map(item => {
        let ele = document.getElementById(item.id);
        item.top = getTop(ele).top;
        console.log(item)
        return item;
    })
}
computedTop()

// 把数组渲染到DOM上
function renderList () {
    let text = '';
    mapList.forEach(item => {
        text += `<li class="${item.active ? 'active' : ''}" data-id="${item.id}">${item.text}</li>`
    })
    list.innerHTML = text;
}
renderList();

// 改变导航板块active
function changeActive () {
    let scrollTop = document.documentElement.scrollTop;
    mapList.forEach(item => {
        item.active = false;
    })
    if (scrollTop < mapList[0].top) {
    } else if (scrollTop>mapList[mapList.length-1].top) {
        mapList[mapList.length-1].active = true;
    } else {
        for (let i = 0; i<mapList.length;i++) {
            if (scrollTop > mapList[i].top && scrollTop<mapList[i+1].top) {
                mapList[i].active = true;
            }
        }
    }
}
window.addEventListener('scroll', function(e) {
    // console.log(e)
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 432) {
        navigation.style.position = 'fixed';
        navigation.style.top = '100px';
    } else{
        navigation.style.position = 'absolute';
        navigation.style.top = '250px';
    }
    changeActive();
    renderList();
})
let navigationModal = document.querySelector('.navigation-modal'),
    markBox = document.querySelector('.mark-box')
navigation.addEventListener('click', function (e) {
    console.log(e)
    let target = e.target,
        targetTagName = target.tagName,
        targetClass = target.className;
    // 把A/I合并为外层A 统一判断处理
    if (targetTagName == 'I') {
        target = target.parentNode;
        targetTagName = target.tagName;
        targetClass = target.className;
    }
    // 点击导航的某板块，页面滚动到对应板块 LI
    if (targetTagName == 'LI') {
        let id = target.getAttribute('data-id');
        let item = mapList.find(item => id === item.id);
        item.active = true;
        document.documentElement.scrollTop = item.top;
    }
    // 点击导航向上箭头  回到顶部 I/A => A.top-btn
    if (targetTagName == 'A' && targetClass.indexOf('top-btn') > -1) {
        document.documentElement.scrollTop = 0;
    }
    // 点击导航编辑按钮，改变编辑态 I/A => A.sort-btn
    if (targetTagName == 'A' && targetClass.indexOf('sort-btn') > -1) {
        if (isEdit) {
            isEdit = false;
            changeActive();
            target.classList.remove('active');
            navigationModal.style.display = 'none';
            markBox.style.display = 'none';
            renderList();
            return;
        }
        isEdit = true;
        mapList.forEach(item => {
            item.active = false;
        })
        renderList();
        target.className = targetClass + ' active';
        navigationModal.style.display = 'block';
        markBox.style.display = 'block';
    }
})
window.onload = function () {
    computedTop()
}
navigationModal.onclick = function() {
    if (isEdit) {
        console.log(mapList)
        isEdit = false;
        changeActive();
        target.classList.remove('active');
        navigationModal.style.display = 'none';
        markBox.style.display = 'none';
        renderList();
    }
}
let max = list.offsetHeight - 28;
let liDom = list.getElementsByTagName('li');
function renderDom() {
    let frag = document.createDocumentFragment();
    mapList.forEach(item => {
        let dom = document.getElementById(item.id);
        frag.appendChild(dom);
    })
    let container = document.querySelector('.container');
    container.appendChild(frag);
}
function moving (e) {
    let curY = e.pageY - this.startY + this.position;
    curY = curY<0?0:(curY>max?max:curY);
    this.style.top = curY + 'px';

    let n = Math.round(curY/28);
    if (n === this.index) return;
    this.old_index = this.index;//初始位置0  2
    this.index = n;//新位置2  0
    // console.log(this.old_index,this.index)

    // 判断上移下移
    if(e.pageY > this.oldY) {
        // 鼠标下移
        for(let i=0;i<liDom.length;i++) {
            // console.log(liDom[i])
            if ( liDom[i].index>= this.old_index && liDom[i].index<=this.index && liDom[i].getAttribute('data-id') !== this.getAttribute('data-id')) {
                liDom[i].index--;
                liDom[i].style.top = `${liDom[i].index*28}px`;
            }
        }
    }else {
        // 鼠标上移
        for(let i=0;i<liDom.length;i++) {
            if (liDom[i].index>=this.index && liDom[i].index<=this.old_index && liDom[i].getAttribute('data-id') !== this.getAttribute('data-id')) {
                console.log(liDom[i].index)
                liDom[i].index++;
                liDom[i].style.top = `${liDom[i].index*28}px`;
            }
        }
    }
    this.oldY = e.pageY;
}
function moveEnd (e) {
    this.classList.remove('active');
    this.style.top = `${this.index*28}px`;
    let arr = []
    // 拖拽操作的是元素  index是位置  data-id=>mapList.id
    for(let i=0;i<liDom.length;i++) {
        let dom = liDom[i];
        arr[dom.index] = mapList.find(item => item.id === dom.getAttribute('data-id'));
    }
    // console.log(mapList)
    mapList = arr;
    renderList();
    renderDom();
    computedTop();
    console.log(mapList)
    document.onmousemove = null;
    document.onmousedown = null;
    console.log(11,mapList)

}
list.addEventListener('mousedown', function(e) {
    if (!isEdit || e.target.tagName !== 'LI') return
    let target = e.target;
    // let liDom = Array.from(list.querySelectorAll('li'));
    // let liDom = [].slice.call(list.querySelectorAll('li'));
    target.className.indexOf('active')> -1?null:target.className += ' active';
    // console.log(liDom);
    for (let i=0;i<liDom.length;i++) {
        liDom[i].classList.remove('active');
        liDom[i].style.position = 'absolute';
        liDom[i].style.top = `${i*28}px`;
        liDom[i].index = i;
        liDom[i].style.zIndex = 0;
        // console.dir(liDom[i])

    }
    target.style.zIndex = 6;
    target.position = parseFloat(target.style.top);
    target.startY = e.pageY;
    target.oldY = e.pageY;
    document.onmousemove = moving.bind(target);
    document.onmouseup = moveEnd.bind(target);

})
// list.onmousedown = function(e) {
// }