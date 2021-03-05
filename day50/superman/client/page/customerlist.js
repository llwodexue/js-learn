let customerListModule = (function () {
	let $tbody = $('tbody'); // 一会往里渲染客户的列表
	let $selectBox = $('.selectBox'); // 客户类型
	let $search = $('.searchInp');
	let $pageBox = $('.pageBox');
	let lx = '';
	let limit = 10; // 以后发送数据请求的时候每一页请求的数据的条数
	let page = 1; // 代表当前请求的页码

	let render = () => {
		let type = $selectBox.val();
		let search = $search.val().trim();
		axios.get('/customer/list', {
			params: {
				type,
				search,
				page,
				limit,
				lx
			}
		}).then((res) => {
			let {
				code,
				total,
				totalPage,
				data
			} = res;
			if (code == 0) {
				$pageBox.css('display','block');
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
						address
					} = item;
					str += `<tr data-id="${id}" data-name="${name}">
					<td class="w8">${name}</td>
					<td class="w5">${parseInt(sex) == 1 ? '女' : '男'}</td>
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
						ary.push(index+1)
				}
				console.log(ary); // [1,2]
				let str1 = `
				${page == 1 ? '<a href="javascript:;">上一页</a>':''}
					<ul class="pageNum">
						
						${ary.map((item,index)=>{
							return `<li class="${item == page?"active":""}">${item}</li>`
						}).join('')}
					</ul>
					${page == totalPage ? '' :'<a href="javascript:;">下一页</a>'}
			
				`;
				$pageBox.html(str1)
			}
			else {
				$tbody.html('');
				$pageBox.css('display','none');
			}
		})

	};

	let bindSelect = ()=>{
		$selectBox.on('change',function(){
			page = 1;
			render()
		});
		$search.on('keydown',function(e){
			if(e.keyCode === 13){
				page = 1;
				render()
			}
		});
	}

	let pageSelect = ()=>{
		$pageBox.click(function(e){
			let target = e.target;
			let tarName = target.tagName;
			let targetVal = target.innerHTML;
		
			console.log(tarName,targetVal);
			if(tarName == 'A'){
				if(targetVal=='上一页'){
					page--;
					render();
				}
				if(targetVal=='下一页'){
					page++;
					render();
				}
			}
			if(tarName == 'LI'){
				let curPage = parseFloat(targetVal);
				page = curPage;
				render();
			}
		})
	}


	return {
		init() {
			console.log(location.href.queryURLParams());
			lx = location.href.queryURLParams().lx || 'my';
			render();
			bindSelect();
			pageSelect();
		}
	}
}());
customerListModule.init();