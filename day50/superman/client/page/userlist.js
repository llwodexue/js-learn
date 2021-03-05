let userListModule = (function () {
	let ss = null;
	// 第一件事先获取一些一会你要操作的元素
	let $deleteAll = $('.deleteAll'); // 获取批量删除按钮
	let $thead = $('thead');
	let $headTh = $thead.find('th'); // 获取表头里的所有th
	let $tbody = $('tbody'); // 获取存放列表内容的元素;

	// 先按照权限去显示页面的东西
	let power = decodeURIComponent(localStorage.getItem('power'));

	// 检验权限
	let checkPower = () => {
		if (!power.includes('userhandle')) {
			// 如果当前的if成立，说明当前用户没有操作的权限，那就把批量删除、全选、操作全部删了

			$deleteAll.remove(); // 删除批量按钮
			$headTh.first().remove(); // 删除表头的第一个
			$headTh.last().remove(); // 删除表头的最后一个
		}
	};

	// 请求下拉框的部门数据，然后渲染到select框中
	let bindSelect = () => {
		return axios.get('/department/list').then((res) => {
			let {
				code,
				data
			} = res;
			if (code == 0) {
				let str = `<option value="0">全部</option>`;
				// str默认包含一个全部的option，
				data.forEach(item => {
					let {
						id,
						name
					} = item;
					str += `<option value="${id}">${name}</option>`
				});

				$('.selectBox').html(str); // 把处理好的option渲染到select中
			}
			else {
				return Promise.reject()
			}

		});
	};

	// 发送用户列表的请求了
	let render = () => {

		// let departmentId = $('.selectBox').val();
		// if(departmentId === ss){
		// 	return;
		// }
		// ss = $('.selectBox').val(); // 0 1
		let search = $('.searchInp').val();
		// console.log(departmentId, search);
		axios.get('/user/list', {
			params: {
				departmentId,
				search
			}
		}).then((res) => {
			let {
				code,
				data
			} = res;
			if (code == 0) {
				let str = ``;
				data.forEach(item => {
					let {
						id,
						name,
						sex,
						job,
						department,
						email,
						phone,
						desc
					} = item;
					str += `
					<tr data-id='${id}' data-name='${name}'>
						${power.includes('userhandle') ? '<td class="w3"><input type="checkbox"></td>' : ''}
							<td class="w10">${name}</td>
							<td class="w5">${sex == 0 ? '女' : '男'}</td>
							<td class="w10">${department}</td>
							<td class="w10">${job}</td>
							<td class="w15">${email}</td>
							<td class="w15">${phone}</td>
							<td class="w20">${desc}</td>
							${power.includes('userhandle') ? `
							<td class="w12">
							<a href='useradd.html?userId=${id}'>编辑</a>
							<a href="javascript:;">删除</a>
							${power.includes('resetpassword') ? `	<a href="javascript:;">重置密码</a>` : ''}
						
						</td>`: ''}
				 </tr>
						`
				});
				$tbody.html(str);
			}
			else {
				// 如果当前的code不是0，说明后台没有你要检索的数据，这时候给tbody置位空就好了
				$tbody.html('');
			}

		}).then(() => {
			checkBox()
		})
	};

	let searchInfo = () => {
		$('.selectBox').on('change', function () {
			// let value = $(this).val();
			render();
		});
		$('.searchInp').on('keydown', function (e) {
			console.log(e.keyCode);
			let key = e.keyCode; // 获取当前用户按下的键码
			if (key == 13) {
				render();
			}
		})
	};

	let bindHandle = () => {
		// 进行每一个员工的删除和重置密码的操作
		$('tbody').click(function (e) {
			let target = e.target;
			let tarName = target.tagName; // 元素大写的名字
			let targetVal = target.innerText.trim();
			console.log(tarName, targetVal);
			// 先获取到当前点击的行的id和name
			let userId = $(target).parent().parent().attr('data-id');
			let userName = $(target).parent().parent().attr('data-name');

			// 先写重置的逻辑
			if (tarName === 'A' && targetVal == '重置密码') {

				alert(`您确定要把${userName}的密码重置吗`, {
					title: '您当前的操作很重要',
					confirm: true,
					handled: (msg) => {
						if (msg === 'CANCEL') return;
						axios.post('/user/resetpassword', {
							useId
						}).then((res) => {
							let {
								code
							} = res;
							if (code == 0) {
								alert('您当前密码重置成功')
							}
							else {
								alert('您当前密码重置失败')
							}
						});
					}
				});


			};
			if (tarName === 'A' && targetVal == '删除') {
				// 先获取到当前点击的行的id和name
				// let userId = $(target).parent().parent().attr('data-id');
				// let userName = $(target).parent().parent().attr('data-name');
				alert(`您确定要把${userName}删除吗`, {
					title: '您当前的操作很重要',
					confirm: true,
					handled: (msg) => {
						console.log(msg);
						if (msg != 'CONFIRM') return;
						axios.get('/user/delete', {
							params: {
								userId
							}
						}).then((res) => {
							let {
								code
							} = res;
							if (code == 0) {
								alert('删除成功', {
									handled: () => {
										render()
									}
								});

							}
							else {
								alert('删除失败')
							}
						});
					}
				});
			};
		})
	}

	let checkBox = () => {
		// 在这里存放的就是选框的逻辑
		let allCheck = $headTh.find('input');// 获取当前全选按钮
		let everyCheck = $('tbody').find('input');



		allCheck.click(function () {
			let flag = $(this).prop('checked');
			// 当前的全选框如果是选中的那就是true，如果没有选中就是false，
			everyCheck.prop('checked', flag);
			// 把当前的全选框的状态flag赋值给每一个tbody中的小框
			console.log(flag);
		});
		everyCheck.click(function () {
			// 循环everyCheck。看看每一个小框的状态，如果有一个是false，那就把全选框给为false，如果小框全是true，那就把全选框改为true
			let flag = true; // 当前flag代表全选框的状态
			// [1,2,3]
			everyCheck.each((index, item) => {
				let checked = $(item).prop('checked');
				if (!checked) {
					flag = false;
					return false; // 当前执行的回调函数如果return false就会结束当前的each循环
				}

			});
			allCheck.prop('checked', flag)

		})
	};

	let bindDeleteAll = function () {

		function deleteX(index, $checks) {
			// 假设$checks的个数是3个
			if (index >= $checks.length) {

				alert('当前删除已经完成', {
					handled() {
						render();
					}
				})
				return;

			}
			let $curCheck = $checks.eq(index);
			let userId = $curCheck.parent().parent().attr('data-id');
			axios.get('/user/delete', {
				params: {
					userId
				}
			}).then((res) => {
				let {
					code
				} = res;
				if (code == 0) {
					deleteX(index + 1, $checks)
				}
			})
		}
		$deleteAll.click(function () {
			let isChecked = $('tbody').find('input').filter((index, item) => {
				return $(item).prop('checked')
			});
			if (isChecked.length <= 0) {
				alert('请先选中您要删除的数据');
				return;
			}
			alert(`您确定要删除当前的${isChecked.length}条数据吗?`, {
				confirm: true,
				handled(msg) {
					if (msg != 'CONFIRM') return;
					console.log('用户正常进行删除的行为');
					// 这里应该写删除的接口了
					deleteX(0, isChecked); // 当前deleteX函数的作用就是不断的发送删除接口
				}
			})
		})
	}

	return {
		init() {
			checkPower();
			// 先把下拉框的数据请求成功以后绑定成功，然后在去发送user/list请求去，进行渲染
			bindSelect().then(() => {
				render()
			}).catch(() => {
				alert('当前页面渲染失败，请稍后重试')
			})
			searchInfo();
			bindHandle();
			bindDeleteAll();
		}
	}
}());

userListModule.init()


// attr prop


// 普通元素的值的获取 html()  innerText innerHTML   getAttribute(key)  setAttribute(key,value)

// 表单元素的值的获取 val()   value  value='xxx'
prop

