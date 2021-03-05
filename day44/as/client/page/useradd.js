let userAddModule = (function () {
	let $username = $('.username'),
		$spanusername = $('.spanusername'),
		$man = $('#man'),
		$woman = $('#woman'),
		$useremail = $('.useremail'),
		$spanuseremail = $('.spanuseremail'),
		$userphone = $('.userphone'),
		$spanuserphone = $('.spanuserphone'),
		$userdepartment = $('.userdepartment'),
		$userjob = $('.userjob'),
		$userdesc = $('.userdesc'),
		$submit = $('.submit');
	let userId = null;
	let isUpdate = true; // 默认就是修改

	// 首先发送部门列表和职务列表的接口
	let bindList = () => {
		let p1 = axios.get('/department/list');
		let p2 = axios.get('/job/list');
		return axios.all([p1, p2]).then((res) => {
			console.log(res);
			let [depart, job] = res;
			if (depart.code == 0) {
				let str = ``;
				depart.data.forEach((item) => {
					str += `<option value="${item.id}">${item.name}</option>`
				});
				$userdepartment.html(str);
			}
			else {
				return Promise.reject()
			};
			if (job.code == 0) {
				let str1 = ``;
				job.data.forEach((item) => {
					str1 += `<option value="${item.id}">${item.name}</option>`
				});
				$userjob.html(str1);
			}
			else {
				return Promise.reject()
			}

		})
	};

	let queryInfo = () => {
		axios.get('/user/info', {
			params: {
				userId
			}
		}).then((res) => {
			let {
				code,
				data: {
					name,
					email,
					phone,
					desc,
					departmentId,
					jobId,
					sex
				}
			} = res;
			if (code == 0) {
				$username.val(name);

				if (sex == 0) {
					$woman.prop('checked', true)
				};
				$useremail.val(email);
				$userphone.val(phone);
				$userdesc.val(desc);
				$userdepartment.val(departmentId);
				$userjob.val(jobId);

			}
		})
	}

	// 进行正则的校验

	// 校验名字
	let checkUserName = () => {
		let value = $username.val().trim();
		if (!value) {
			$spanusername.html('当前用户名不能为空');
			return false;
		}
		$spanusername.html('');
		return true;
	}

	// 校验邮箱
	let checkEmail = () => {
		let value = $useremail.val().trim();
		let reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

		if (!value) {
			$spanuseremail.html('当前邮箱不能为空');
			return false;
		}
		if (value.length > 17) {
			$spanuseremail.html('邮箱最长是17位');
			return false;
		}
		if (!reg.test(value)) {
			$spanuseremail.html('您当前的邮箱不符合规则');
			return false;
		}
		$spanuseremail.html('');
		return true;
	};

	// 验证手机号
	let checkPhone = () => {
		let value = $userphone.val().trim();
		let reg = /^1[3-9]\d{9}$/;
		if (!value) {
			$spanuserphone.html('当前手机号不能为空');
			return false;
		}
		if (value.length != 11) {
			$spanuserphone.html('当前手机号长度不符合规则');
			return false;
		}
		if (!reg.test(value)) {
			$spanuserphone.html('当前手机号不负责规则');
			return false;
		}
		$spanuserphone.html('');
		return true;
	}

	//给点击按钮绑定点击事件
	let bindSubmit = () => {
		$submit.click(function () {
			checkUserName();
			checkEmail();
			checkPhone();
			if (!checkUserName() || !checkEmail() || !checkPhone()) {
				alert('您当前不能提交，因为表单校验不通过')
				return;
			}
			// if(checkUserName() && checkEmail() && checkPhone()){

			// }
			let url = isUpdate ? '/user/update' : '/user/add';
			let sex = $man.prop('checked') ? 1 : 0;
			let obj = {
				name: $username.val().trim(),
				sex,
				email: $useremail.val().trim(),
				phone: $userphone.val().trim(),
				departmentId: $userdepartment.val(),
				jobId: $userjob.val().trim(),
				desc: $userdesc.val().trim()
			};
			if (isUpdate) {
				obj.userId = userId
			};
			console.log(obj);

			axios.post(url, obj).then((res) => {
				let {
					code
				} = res;
				let text = '新增';
				if(isUpdate){
					text = '编辑';
				}
				if (code == 0) {
					alert(`当前${text}成功，即将返回用户列表页`, {
						handled() {
							location.href = 'userlist.html'
						}
					})
				}
				else {
					return Promise.reject();
				}
			}).catch(() => {
				alert('当前操作失败，请重试!')
			});
		})
	}





	return {
		init() {
			// 先进行接收当前url中的userId参数
			console.log(location.href);
			userId = location.href.queryURLParams().userId || '';
			if (!userId) {
				isUpdate = false;
			};
			bindList().then(() => {
				if (isUpdate) {
					queryInfo();
				}
			}).catch(()=>{
				alert('当前的列表渲染失败，')
			})
			$username.on('blur', checkUserName);
			$useremail.on('blur', checkEmail);
			$userphone.on('blur', checkPhone);
			bindSubmit()
		}
	}
}());

userAddModule.init()