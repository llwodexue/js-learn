[toc]

# 46\_笔记

## CRM

### userlist

```js
let userListModel = (function () {
    let $deleteAll = $(".deleteAll"); // 获取批量删除按钮
    let $thead = $("thead");
    let $headTH = $thead.find("th"); // 获取表头里所有th
    let $tbody = $("tbody");
    let lastDep = null;
    // 按照权限去显示页面
    let power = decodeURIComponent(localStorage.getItem("power"));
    // 校验权限
    let checkPower = () => {
        if (!power.includes("userhandle")) {
            // 如果当前if成立，说明当前用户没有操作的权限，那就把删除、全选、操作全部删除
            $deleteAll.remove();
            $headTH.first().remove();
            $headTH.last().remove();
        }
    };
    // 请求下拉框的部门数据，然后渲染到select框中
    let bindSelect = () => {
        return axios.get("/department/list").then((res) => {
            let { code, data } = res;
            if (code == 0) {
                // str默认包含一个全部的option
                let str = `<option value="0">全部</option>`;
                data.forEach((item) => {
                    let { id, name } = item;
                    str += `<option value="${id}">${name}</option>`;
                });
                $(".selectBox").html(str); // 把处理好的option渲染到select中
            }
        });
    };
    // 发送用户列表请求
    let render = () => {
        let departmentId = $(".selectBox").val();
        if (departmentId === lastDep) {
            return;
        }
        lastDep = $(".selectBox").val();
        let search = $(".searchInp").val();
        axios
            .get("/user/list", {
                params: {
                    departmentId,
                    search,
                },
            })
            .then((res) => {
                let { code, data } = res;
                if (code == 0) {
                    let str = ``;
                    data.forEach((item) => {
                        let {
                            id,
                            name,
                            sex,
                            job,
                            department,
                            email,
                            phone,
                            desc,
                        } = item;
                        str += `<tr data-id='${id}' data-name='${name}'>
                    ${
                        power.includes("userhandle")
                            ? `<td class="w3"><input type="checkbox"></td>`
                            : ""
                    }
                    <td class="w10">${name}</td>
                    <td class="w5">${sex == 0 ? "女" : "男"}</td>
                    <td class="w10">${department}</td>
                    <td class="w10">${job}</td>
                    <td class="w15">${email}</td>
                    <td class="w15">${phone}</td>
                    <td class="w20">${desc}</td>
                    ${
                        power.includes("userhandle")
                            ? `<td class="w12">
                    <a href="useradd.html?userId=${id}">编辑</a>
                    <a href="javascript:;">删除</a>
                    ${
                        power.includes("resetpassword")
                            ? `<a href="javascript:;">重置密码</a>`
                            : ""
                    }
                </td>`
                            : ""
                    }

                </tr>`;
                    });
                    $tbody.html(str);
                } else {
                    // 如果当前的code不是0，说明后台没有你要检索的数据，这时候给tbody置为空即可
                    $tbody.html("");
                }
            })
            .then((res) => {
                checkBox();
            });
    };

    let searchInfo = () => {
        $(".selectBox").on("change", function () {
            render();
        });
        $(".searchInp").on("keydown", function (e) {
            let k = e.keyCode; // 获取当前用户按下的键码
            if (k == 13) {
                render();
            }
        });
    };

    let bindHandle = () => {
        // 进行每一个员工的删除和重置密码操作
        $tbody.click(function (e) {
            let target = e.target;
            let tagName = target.tagName;
            let targetVal = target.innerText.trim();

            // 先获取当前点击的id和name
            let userId = $(target).parent().parent().attr("data-id");
            let userName = $(target).parent().parent().attr("data-name");
            // 重置密码
            if (tagName === "A" && targetVal == "重置密码") {
                alert(`您确定要把${userName}的密码重置吗`, {
                    title: "当前为风险操作",
                    confirm: true,
                    handled: (msg) => {
                        if (msg === "CANCEL") return;
                        axios
                            .post("/user/resetpassword", { userId })
                            .then((res) => {
                                let { code } = res;
                                if (code == 0) {
                                    alert("操作成功");
                                } else {
                                    alert("操作失败");
                                }
                            });
                    },
                });
            }
            // 删除
            if (tagName === "A" && targetVal == "删除") {
                alert(`您确定要删除${userName}吗`, {
                    title: "当前为风险操作",
                    confirm: true,
                    handled: (msg) => {
                        if (msg === "CANCEL") return;
                        axios
                            .get("/user/delete", { params: { userId } })
                            .then((res) => {
                                let { code } = res;
                                if (code == 0) {
                                    alert("操作成功", {
                                        handled: () => {
                                            render();
                                        },
                                    });
                                    render();
                                } else {
                                    alert("操作失败");
                                }
                            });
                    },
                });
            }
        });
    };

    let checkBox = () => {
        // 选框的逻辑
        let allCheck = $headTH.find("input"); // 获取当前全选按钮
        let everyCheck = $tbody.find("input");
        allCheck.click(function () {
            // 把当前全选框的状态flag赋值给每一个tbody的小框
            let flag = $(this).prop("checked");
            everyCheck.prop("checked", flag);
        });
        $.click(function () {
            // 循环everyCheck。看看每一个小框的状态，如果有一个是false，那就把全选框给false，如果小框全是true，那就把全选框改为true
            let flag = true; // 当前flag代表全选框状态
            everyCheck.each((index, item) => {
                let checked = $(item).prop("checked");
                if (!checked) {
                    flag = false;
                    return false; // 当前执行的回调函数如果return false，就会结束当前each循环
                }
            });
            allCheck.prop("checked", flag);
        });
    };

    function deleteX(index, $checks) {
        if (index >= $checks.length) {
            alert("当前删除已经完成", {
                handled() {
                    render();
                },
            });
            return;
        }
        let $curCheck = $checks.eq(index);
        let userId = $curCheck.parent().parent().attr("data-id");
        axios
            .get("/user/delete", {
                params: {
                    userId,
                },
            })
            .then((res) => {
                let { code } = res;
                if (code == 0) {
                    deleteX(index + 1, $checks);
                }
            });
    }

    let bindDelete = () => {
        $deleteAll.click(function () {
            let isCheck = $tbody.find("input").filter((index, item) => {
                return $(item).prop("checked");
            });
            if (isCheck.length <= 0) {
                alert("请先选中您要删除的数据");
                return;
            }
            alert(`您确定要删除当前的${isCheck.length}条数据吗？`, {
                confirm: true,
                handled(msg) {
                    if (msg != "CONFIRM") return;
                    console.log("用户进行正常的删除行为");
                    deleteX(0, isCheck); //当前deleteX函数作用就是不断发生删除接口
                },
            });
        });
    };

    return {
        init() {
            checkPower();
            // 先把下拉框的数据请求成功以后，再去发送用户请求
            bindSelect()
                .then(() => {
                    render();
                })
                .catch(() => {
                    alert("当前页面渲染失败，请稍候重试");
                });
            searchInfo();
            bindHandle();
            bindDelete();
        },
    };
})();

userListModel.init();
```

### useradd

```js
let userAddModule = (function () {
    let $username = $(".username"),
        $spanusername = $(".spanusername"),
        $man = $("#man"),
        $woman = $("#woman"),
        $useremail = $(".useremail"),
        $spanuseremail = $(".spanuseremail"),
        $userphone = $(".userphone"),
        $spanuserphone = $(".spanuserphone"),
        $userdepartment = $(".userdepartment"),
        $userjob = $(".userjob"),
        $userdesc = $(".userdesc"),
        $submit = $(".submit");
    let userId = null;
    let isUpdate = true; // 默认是修改

    // 发送部门列表和职务列表的接口
    function bindList() {
        let p1 = axios.get("/department/list");
        let p2 = axios.get("/job/list");
        return axios.all([p1, p2]).then((res) => {
            let [depart, job] = res;
            if (depart.code == 0) {
                let str = ``;
                depart.data.forEach((item) => {
                    str += `<option value="${item.id}">${item.name}</option>`;
                });
                $userdepartment.html(str);
            }
            if (job.code == 0) {
                let str = ``;
                job.data.forEach((item) => {
                    str += `<option value="${item.id}">${item.name}</option>`;
                });
                $userjob.html(str);
            }
        });
    }

    let queryInfo = () => {
        axios
            .get("/user/info", {
                params: {
                    userId,
                },
            })
            .then((res) => {
                let {
                    code,
                    data: {
                        name,
                        email,
                        phone,
                        desc,
                        departmentId,
                        jobId,
                        sex,
                    },
                } = res;
                if (code == 0) {
                    $username.val(name);
                    if (sex == 0) {
                        $woman.prop("checked", true);
                    }
                    $useremail.val(email);
                    $userphone.val(phone);
                    $userdesc.val(desc);
                    $userdepartment.val(departmentId);
                    $userjob.val(jobId);
                }
            });
    };

    // 校验名字
    let checkUserName = () => {
        let value = $username.val().trim();
        if (!value) {
            $spanusername.html("当前用户名不能为空");
            return false;
        }
        $spanusername.html("");
        return true;
    };
    // 校验邮箱
    let checkEmail = () => {
        let value = $useremail.val().trim();
        if (!value) {
            $spanuseremail.html("当前邮箱不能为空");
            return false;
        }
        if (value.length >= 17) {
            $spanuseremail.html("邮箱最长为17位");
            return false;
        }
        let reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!reg.test(value)) {
            $spanuseremail.html("邮箱不符合规则");
            return false;
        }
        $spanuseremail.html("");
        return true;
    };
    // 校验手机号
    let checkPhone = () => {
        let value = $userphone.val().trim();
        if (!value) {
            $spanuserphone.html("当前手机号不能为空");
            return false;
        }
        if (value.length !== 11) {
            $spanuserphone.html("手机号长度超过11位");
            return false;
        }
        let reg = /^1[3-9]\d{9}$/;
        if (!reg.test(value)) {
            $spanuserphone.html("手机号不符合规则");
            return false;
        }
        $spanuserphone.html("");
        return true;
    };

    // 给点击按钮绑定点击事件
    let bindSubmit = () => {
        $submit.click(function () {
            if (!(checkUserName() && checkEmail() && checkPhone())) {
                alert("请检查表单信息");
                return;
            }
            let url = isUpdate ? "/user/update" : "./user/add";
            let sex = $man.prop("checked") ? "1" : "0";
            let obj = {
                name: $username.val().trim(),
                sex: sex,
                email: $useremail.val().trim(),
                phone: $userphone.val().trim(),
                departmentId: $userdepartment.val().trim(),
                jobId: $userjob.val().trim(),
                desc: $userdesc.val().trim(),
            };
            if (isUpdate) {
                obj.userId = userId;
            }
            axios
                .post(url, obj)
                .then((res) => {
                    let { code } = res;
                    if (code == 0) {
                        alert("操作成功，即将返回用户列表页", {
                            handled() {
                                location.href = "index.html";
                            },
                        });
                    } else {
                        return Promise.reject();
                    }
                })
                .catch(() => {
                    alert("当前操作失败，请重试");
                });
        });
    };

    return {
        init() {
            // 先进行接收当前url中userId的参数
            userId = location.href.queryURLParams().userId || "";
            if (userId) {
                isUpdate = false;
            }
            bindList()
                .then(() => {
                    queryInfo();
                })
                .catch(() => {
                    alert("当前列表渲染失败");
                });
            $username.on("blur", checkUserName);
            $useremail.on("blur", checkEmail);
            $userphone.on("blur", checkPhone);
            bindSubmit();
        },
    };
})();

userAddModule.init();
```

### customerlist

```js
let customerListModule = (function () {
    let $tbody = $("tbody"); // 一会往里渲染客户的列表
    let $selectBox = $(".selectBox"); // 客户类型
    let $search = $(".searchInp");
    let $pageBox = $(".pageBox");
    let lx = "";
    let limit = 10; // 以后发送数据请求的时候每一页请求的数据的条数
    let page = 1; // 代表当前请求的页码

    let render = () => {
        let type = $selectBox.val();
        let search = $search.val().trim();
        axios
            .get("/customer/list", {
                params: {
                    type,
                    search,
                    page,
                    limit,
                    lx,
                },
            })
            .then((res) => {
                let { code, total, totalPage, data } = res;
                if (code == 0) {
                    $pageBox.css("display", "block");
                    let str = ``;
                    data.forEach((item) => {
                        let {
                            name,
                            id,
                            sex,
                            email,
                            phone,
                            weixin,
                            QQ,
                            type,
                            userName,
                            address,
                        } = item;
                        str += `<tr data-id="${id}" data-name="${name}">
					<td class="w8">${name}</td>
					<td class="w5">${parseInt(sex) == 1 ? "女" : "男"}</td>
					<td class="w10">${email}</td>
					<td class="w10">${phone}</td>
					<td class="w10">${weixin}</td>
					<td class="w10">${QQ}</td>
					<td class="w5">${type}</td>
					<td class="w8">${userName}</td>
					<td class="w20">${address}</td>
					<td class="w14">
						<a href="customeradd.html?customerId=${id}">编辑</a>
						<a href="javascript:;">删除</a>
						<a href="visit.html?customerId=${id}">回访记录</a>
					</td>
				</tr>`;
                    });
                    $tbody.html(str);
                    let ary = [];
                    for (let index = 0; index < totalPage; index++) {
                        ary.push(index + 1);
                    }
                    let str1 = `
				${page > 1 ? '<a href="javascript:;">上一页</a>' : ""}
					<ul class="pageNum">
						${ary
                            .map((item, index) => {
                                return `<li class="${
                                    item == page ? "active" : ""
                                }">${item}</li>`;
                            })
                            .join("")}
					</ul>
					${page == totalPage ? "" : '<a href="javascript:;">下一页</a>'}
				`;
                    $pageBox.html(str1);
                } else {
                    $tbody.html("");
                    $pageBox.css("display", "none");
                }
            });
    };

    let bindSelect = () => {
        $selectBox.on("change", render);
        $search.on("keydown", function (e) {
            if (e.keyCode === 13) {
                render();
            }
        });
    };

    let pageSelect = () => {
        $pageBox.click(function (e) {
            let target = e.target;
            let tarName = target.tagName;
            let targetVal = target.innerHTML;
            if (tarName == "A") {
                if (targetVal == "上一页") {
                    page--;
                    render();
                }
                if (targetVal == "下一页") {
                    page++;
                    render();
                }
            }
            if (tarName == "LI") {
                let curPage = parseFloat(targetVal);
                page = curPage;
                render();
            }
        });
    };

    return {
        init() {
            lx = location.href.queryURLParams().lx || "my";
            render();
            bindSelect();
            pageSelect();
        },
    };
})();
customerListModule.init();
```

### visit

```js
let visitModule = (function () {
    let customerId = null;
    let $visitText = $(".visitText");
    let $visitTime = $(".visitTime");
    let $submit = $(".submit");
    let $tbody = $("tbody");
    let time = new Date()
        .toLocaleString()
        .split(" ")[0]
        .formatTime("{0}-{1}-{2}");
    $visitTime.val(time);

    let bindVisitList = () => {
        // 渲染访问列表
        return axios
            .get("/visit/list", {
                params: {
                    customerId,
                },
            })
            .then((res) => {
                let { code, data } = res;
                console.log(res);
                if (code == 0) {
                    let str = ``;
                    data.forEach((item) => {
                        let { id, visitTime, visitText } = item;
                        str += `
						<tr data-id='${id}'>
								<td class="w5">${id}</td>
								<td class="w15">${visitTime}</td>
								<td class="w70 wrap">${visitText}</td>
								<td class="w10">
									<a href="javascript:;">删除</a>
								</td>
						</tr>
						`;
                    });
                    $tbody.html(str);
                } else {
                    return Promise.reject();
                }
            });
    };

    let bindDelete = () => {
        $tbody.click(function (e) {
            let target = e.target;
            let tarName = target.tagName; // 大写的标签名
            let targetVal = target.innerText.trim();
            if (tarName === "A" && targetVal === "删除") {
                let visitId = $(target).parent().parent().attr("data-id");
                alert("您确定要删除吗", {
                    confirm: true,
                    handled(msg) {
                        if (msg != "CONFIRM") return;
                        axios
                            .get("/visit/delete", {
                                params: {
                                    visitId,
                                },
                            })
                            .then((res) => {
                                let { code } = res;
                                if (code == 0) {
                                    bindVisitList();
                                } else {
                                    return Promise.reject();
                                }
                            })
                            .catch(() => {
                                alert("删除失败");
                            });
                    },
                });
            }
        });
    };

    let bindSubmit = () => {
        $submit.click(() => {
            if ($visitText.val().trim() == "") {
                alert("请输入内容");
                return;
            }
            axios
                .post("/visit/add", {
                    customerId,
                    visitTime: $visitTime.val(),
                    visitText: $visitText.val().trim(),
                })
                .then((res) => {
                    let { code } = res;
                    if (code == 0) {
                        alert("新增成功", {
                            handled() {
                                bindVisitList();
                                $visitText.val("");
                            },
                        });
                    } else {
                        alert("新增失败");
                    }
                });
        });
    };

    return {
        init() {
            customerId = location.href.queryURLParams().customerId || "";
            bindVisitList().catch(() => {});
            bindDelete();
            bindSubmit();
        },
    };
})();
visitModule.init();
```

