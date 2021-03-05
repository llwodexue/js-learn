[toc]

# 45\_笔记

## CRM

### 主页面

```js
(function () {
    // 进到index.html页面后做的第一件事就是检验当前的用户名是否是非法进入
    axios
        .get("/user/login")
        .then((res) => {
            let { code } = res;
            if (code === 0) {
                // 说明当前请求已经成功，并且当前用户是正常进入的
                return axios.get("/user/info"); // 当前return这个promise实例会影响下一个then的回调函数执行
            } else {
                // 如果当前的code不是0，说明用户是非法进入网页，需要打回登录页
                alert("请登录", {
                    handled: function () {
                        location.href = "login.html";
                    },
                });
            }
        })
        .then((res) => {
            let name = res && res.data && res.data.name;
            $(".baseBox").find("span").html(`您好：${name}`);
        });
    // 当前两个请求是串行的，当第一个请求发送成功以后，并且已经校验是当前用户是正常登录时，再发送第二个请求
})();

(function () {
    let $headerBox = $(".headerBox");
    let $footerBox = $(".footerBox");
    let $container = $(".container");
    let $menuBox = $(".menuBox");
    function computed() {
        // 动态计算当前container元素的高度（等于屏幕的总高度-头部的高度-底部的高度）
        let winH = $(window).height(); // 获取屏幕的高度
        let headerH = $headerBox.outerHeight(); // 总高度包括padding+border
        let footH = $footerBox.outerHeight();
        $container.css("height", winH - headerH - footH);
    }
    computed();
    $(window).on("resize", computed); // 当调整浏览器窗口的大小时，发生resize事件
    let power = decodeURIComponent(localStorage.getItem("power"));
    // 动态处理左侧菜单按照权限进行不同的显示
    let arr = [
        {
            title: "员工管理",
            icon: "icon-yuangong",
            children: [
                {
                    subTitle: "员工列表",
                    href: "page/userlist.html",
                    flag: "",
                },
                {
                    subTitle: "新增员工",
                    href: "page/useradd.html",
                    flag: "userhandle",
                },
            ],
        },
        {
            title: "部门管理",
            icon: "icon-guanliyuan",
            children: [
                {
                    subTitle: "部门列表",
                    href: "page/departmentlist.html",
                    flag: "",
                },
                {
                    subTitle: "新增部门",
                    href: "page/departmentadd.html",
                    flag: "departhandle",
                },
            ],
        },
        {
            title: "职务管理",
            icon: "icon-zhiwuguanli",
            children: [
                {
                    subTitle: "职务列表",
                    href: "page/joblist.html",
                    flag: "",
                },
                {
                    subTitle: "新增职务",
                    href: "page/jobadd.html",
                    flag: "jobhandle",
                },
            ],
        },
        {
            title: "客户管理",
            icon: "icon-kehuguanli",
            children: [
                {
                    subTitle: "我的客户",
                    href: "page/customerlist.html?lx=my.html",
                    flag: "",
                },
                {
                    subTitle: "全部客户",
                    href: "page/customerlist.html?lx=all.html",
                    flag: "allcustomer",
                },
                {
                    subTitle: "新增客户",
                    href: "page/customeradd.html",
                    flag: "",
                },
            ],
        },
    ];
    let str = "";
    arr.forEach((item) => {
        let { title, icon, children } = item;
        str += `<div class="itemBox">
        <h3><i class="iconfont ${icon}"></i>${title}</h3>
        <nav class="item">
            ${children
                .map((item) => {
                    let { subTitle, href, flag } = item;
                    return power.includes(flag)
                        ? `<a href="${href}" target="_iframe">${subTitle}</a>`
                        : "";
                })
                .join("")}
        </nav>
        </div>`;
    });
    $menuBox.html(str);

    // 利用事件委托，实现左侧菜单的收起和展开动画
    // 
    $menuBox.click(function (e) {
        let target = e.target; // 获取当前点击的事件源
        let $target = $(target); // 把当前原生的元素变成jQ的实例
        let tagName = target.tagName; // 当前元素大写的标签名
        // 如果当前点击的是i标签，就将事件源改成h3标签
        if (tagName === "I") {
            $target = $target.parent();
            tagName = "H3";
        }
        if (tagName === "H3") {
            let $nav = $target.next();
            $nav.stop().slideToggle();
        }
    });
    // 利用冒泡
    /* $(".menuBox h3").click(function () {
        $(this).siblings().stop().slideToggle();
    }); */

    // 点击第一个按钮让前三组模块显示，点击第二个按钮让最后一组模块显示
    let $itemBox = $menuBox.find("div");
    let $organize = $itemBox.filter(":lt(3)"); // 第一大组模块
    let $customer = $itemBox.eq(3); // 第二大组模块

    let index = 0;
    function change(index) {
        $(".navBox a")
            .eq(index)
            .addClass("active")
            .siblings()
            .removeClass("active");
        // 给当前元素增加类型（兄弟移除类名）
        if (index == 0) {
            $organize.css("display", "block");
            $customer.css("display", "none");
            $("iframe").attr("src", "page/userlist.html");
        } else {
            $organize.css("display", "none");
            $customer.css("display", "block");
            $("iframe").attr("src", "page/customerlist.html");
        }
    }
    change(index);
    // 给按钮绑定点击事件
    $(".navBox a").click(function () {
        // 判断一下当前用户点击的元素索引是谁，如果是0，说明点击的是第一个按钮，就让第一大组模块显示，如果索引是1，那就说明点击的是第二个按钮，让第二个模块显示
        index = $(this).index();
        change(index);
    });
    // 当页面刷新的时候，刷新之前的哪个页面，刷新之后还应该是哪个页面（第一种用localStorage去做，第二种用hash值去做，因为他们刷新的时候值都不会变化）
    let initIndex = 0;
    // 通过hash的值，去改变initIndex的值，如果当前页面的hash是organize，initIndex对应的值是0，如果hash的值是customer，那initIndex对应的值是1
    let HASH = location.href.queryURLParams()["HASH"] || "organize";
    if (HASH === "customer") {
        initIndex = 1;
    }
    $(".baseBox a").click(function () {
        axios.get("/user/signout").then((res) => {
            let { code } = res;
            if (code == 0) {
                alert("退出成功，3秒后回到登录页面", {
                    handled() {
                        localStorage.removeItem("power");
                        location.href = "login.html";
                    },
                });
                return;
            }
            alert("操作失败");
        });
    });
})();
```

## 页面禁止滚动

```js
document.body.addEventListener('touchmove', function(e){
        e.preventDefault();
    }, { passive: false });  //passive 参数不能省略，用来兼容ios和android
```



## 参考

[js禁止页面滚动](https://www.cnblogs.com/wxcbg/p/10452985.html)

