(function () {
	// 1.进到index.html页面之后做的第一件事就是校验当前的用户是否是非法进入的
	axios.get('/user/login').then((res) => {
		let {
			code
		} = res;
		if (code == 0) {
			// 不需要做啥
			// 说明当前的请求已经成功了，并且当前的用户就是正常进入的
			return axios.get('/user/info');// 当前return的这个promise的实例会影响下一个then的回调函数的执行
		}
		else {
			// 如果当前的code不是0，说明用户是非法进入的主页，咱们主要给他打回登录页
			alert('您当前是非法进入，请登录', {
				handled: function () {
					location.href = 'login.html'
				}
			})
		}
	}).then((res) => { // {}
		console.log(res);
		let name = res && res.data && res.data.name;
		// 把当前的登录者的名字渲染到对应的元素里
		$('.baseBox').find('span').html(`您好：${name}`)
	});

	// 当前的两个请求时串行的，当第一个请求发送成功以后，并且已经校验是当前用户是正常的登录时，在发送第二个请求(请求当前登录者的信息)

	// 
}());

(function () {
	let $headerBox = $('.headerBox');
	let $footerBox = $('.footerBox');
	let $container = $('.container');
	// jq使用的时候元素可以不提前获取

	function computed() {
		// 动态的计算当前container元素的高度(等于屏幕的总高度- 头部的高度 - 底部的高度)
		let winH = $(window).height();// 获取屏幕的高度
		let headerH = $headerBox.outerHeight();
		let footH = $footerBox.outerHeight();
		$container.css('height', winH - headerH - footH);
	}
	computed();
	$(window).on('resize', computed); // 当前的屏幕的尺寸一旦发生变化，resize事件对应的方法就会被触发


	// 获取power
	let power = decodeURIComponent(localStorage.getItem('power')) || '';
	// 动态的处理左侧的菜单按照权限进行不同的显示
	let ary = [
		{
			title: '员工管理',
			icon: 'icon-yuangong',
			children: [
				{
					subTitle: '员工列表',
					href: 'page/userlist.html',
					flag: ''
				},
				{
					subTitle: '新增员工',
					href: 'page/useradd.html',
					flag: 'userhandle'
				}
			]
		},
		{
			title: '部门管理',
			icon: 'icon-guanliyuan',
			children: [
				{
					subTitle: '部门列表',
					href: 'page/departmentlist.html',
					flag: ''
				},
				{
					subTitle: '新增部门',
					href: 'page/departmentadd.html',
					flag: 'departhandle'
				}
			]
		},
		{
			title: '职务列表',
			icon: 'icon-zhiwuguanli',
			children: [
				{
					subTitle: '职务列表',
					href: 'page/joblist.html',
					flag: ''
				},
				{
					subTitle: '新增职务',
					href: 'page/jobadd.html',
					flag: 'jobhandle'
				}
			]
		},
		{
			title: '客户管理',
			icon: 'icon-kehuguanli',
			children: [
				{
					subTitle: '我的客户',
					href: 'page/customerlist.html?lx=my',
					flag: ''
				},
				{
					subTitle: '全部客户',
					href: 'page/customerlist.html?lx=all',
					flag: 'allcustomer'
				},
				{
					subTitle: '新增客户',
					href: 'page/customeradd.html',
					flag: ''
				}
			]
		}
	]

	let str = ``;
	ary.forEach(item => {
		let { title, icon, children } = item
		str += `
			<div class="itemBox">
			<h3>
				<i class="iconfont ${icon}"></i>
				${title}
			</h3>
			<nav class="item">	
					${children.map(item => {
			let { subTitle, href, flag } = item;
			// return `<a href="${href}" target="_iframe">${subTitle}</a>`;
			return power.includes(flag) ? `<a href="${href}" target="_iframe">${subTitle}</a>` : ''
		}).join('')}
			</nav>
		</div>
			`

	});
	// "power": "userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword"

	//['userhandle','departhandle']
	// console.log(str);
	$('.menuBox').html(str);

	// ['<a>1</a>','<a>2</a>'].join('');
	// '<a>1</a><a>2</a>'

	// 实现左侧菜单的收起和展开的动画
	// $('.menuBox').click(function (e) {
	// 	let target = e.target; // 获取当前点击的事件源(当前的元素)
	// 	let $target = $(target); // 把当前原生的元素变成jq的实例
	// 	let tagName = target.tagName; // 当前元素的大写的标签名

	// 	if (tagName === 'I') {
	// 		// 如果当前用户点击的是i标签的话，那咱们就把当前的事件源换成他的父亲h3，
	// 		$target = $target.parent(); // $target就是H3了
	// 		tagName = 'H3'; // 把当前的tagName也变成H3
	// 	}
	// 	if (tagName === 'H3') {
	// 		let $nav = $target.next();
	// 		$nav.stop().slideToggle()
	// 	}


	// });

	// $('.itemBox h3').on('click', function () {
	// 	console.log(this);
	// 	$(this).siblings().stop().slideToggle("fast");
	// });


	// 下边咱们就处理头部的两个按钮
	// 点击第一个按钮让前三组模块显示，点击第二个按钮让最后一组模块显示
	let $menuBox = $('.menuBox'); //这是四个模块的父级
	let $itemBox = $menuBox.find('div');
	let $organize = $itemBox.filter(':lt(3)'); // 第一大组
	let $customer = $itemBox.eq(3); // 第二大组

	// 当页面刷新的时候，刷新之前是哪个页面，刷新之后还应该是哪个页面(第一种用localStorage去做，第二种用hash值去做，因为他们刷新的时候值都不会变化)
	let initIndex = 0;

	// 通过hash的值，去改变initIndex的值，如果当前页面的hash是organize，把initIndex对应的值是0，
	// 如果hash的值是customer，那initIndex对应的值是1
	let HASH = location.href.queryURLParams()['HASH'] || 'organize';
	console.log(HASH);
	if(HASH === 'customer'){
		// 如果当前页面的hash的值是customer，那就说明，刷新之前用户点击的是第二个按钮，，这时候把initIndex改为1就好
		initIndex = 1;
	};




	function change(index){
		$('.navBox a').eq(index).addClass('active').siblings().removeClass('active');
		// 给当前点击的元素增加类型(然后在兄弟移除类名)
		if(index == 0){
			$organize.css('display','block');
			$customer.css('display','none');
			$('iframe').attr('src','page/userlist.html');
		}
		else {
			$organize.css('display','none');
			$customer.css('display','block');
			$('iframe').attr('src','page/customerlist.html?lx=my');
		}
	}
	change(initIndex); // 让页面初次渲染的时候让change执行一下，传递实参0，代表默认显示第一大组(organize)

	// 给按钮绑定点击事件
	$('.navBox a').click(function(){
		// 判断一下当前用户点击的元素的索引是谁，如果是0，那就说明点击的是第一个按钮，就让第一大组模块显示，如果索引是1，那就说明点击的是第二个按钮。这时候让第二大组模块显示
		let index = $(this).index();
		console.log(index);
		change(index);
	});


	// 点击退出，退出登录并返回到登录页
	$('.baseBox a').click(function(){
		axios.get('/user/signout').then((res)=>{
			let {
				code
			} = res;
			if(code == 0){
				alert('您当前退出成功，3秒后回到登录页面',{
					handled(){
						localStorage.removeItem('power');
						location.href = 'login.html'
					}
				})
			}
		})
	});
}());

