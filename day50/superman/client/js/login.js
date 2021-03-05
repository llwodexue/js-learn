(function () {
	let $account = $('.userName');
	let $password = $('.userPass');
	let $submit = $('.submit');

	// 给当前的登录按钮绑定点击事件
	$submit.click(async function () {
		// 1.获取用户名和密码的内容(把获取的内容去空格)
		let account = $account.val().trim();
		let password = $password.val().trim();
		// console.log(account,password);

		// 2.对用户名和密码进行格式的校验
		// 每个公司对校验的格式都有所不同(咱们只对非空做校验)
		if (!account || !password) {
			alert('当前的用户名或者密码不能为空', {
				handled: function () { // 当前的回调函数会在alert框消失之后或者用户点击X号的时候执行
					// console.log(1111);
				}
			});
			return;// 阻止代码继续往下运行
		}

		// 3.对密码进行MD5加密
		password = md5(password);
		// console.log(password);

		// 4.发送登录的请求
		// axios.post('/user/login', {
		// 	account,
		// 	password
		// }).then(res => {
		// 	let {
		// 		code,
		// 		codeText,
		// 		power
		// 	} = res;
		// 	if (code === 0) {
		// 		alert('恭喜您，登录成功', {
		// 			handled: function () {
		// 				// 当登录成功以后，先把power存储到localStorage中，
		// 				localStorage.setItem('power', encodeURIComponent(power));

		// 				// 然后在跳转到index.html主页面
		// 				location.href = 'index.html';
		// 			}
		// 		});

		// 	}
		// 	else {
		// 		alert('您当前的用户名和密码不匹配');
		// 		$account.val('');
		// 		$password.val('');
		// 	}
		// }).catch(() => { })

		// 可以使用async和await配合进行数据的请求，这样就不用写then了，这样会让异步的代码以同步的方式更加简洁的显示出来
		let res = await axios.post('/user/login', {
			account,
			password
		});

		let {
			code,
			codeText,
			power
		} = res;
		if (code == 0) {
			alert('恭喜您，登录成功', {
				handled: function () {
					// 当登录成功以后，先把power存储到localStorage中，
					localStorage.setItem('power', encodeURIComponent(power));
					// 然后在跳转到index.html主页面
					location.href = 'index.html';
				}
			});

		}
		else {
			alert('您当前的用户名和密码不匹配');
			$account.val('');
			$password.val('');
		}
	});

}())

