let visitModule = (function(){
	let customerId = null;
	let $visitText = $('.visitText');
	let $visitTime = $('.visitTime');
	let $submit = $('.submit');
	let $tbody = $('tbody');

	let time = (new Date).toLocaleString().split(' ')[0].formatTime('{0}-{1}-{2}');
	console.log(time);
	$visitTime.val(time); // 给当前的时间加默认值

	let bindVisitList = ()=>{
			// 渲染访问列表
		return	axios.get('/visit/list',{
				params:{
					customerId
				}
			}).then((res)=>{
				let {
					code,
					data
				} = res;
				if(code == 0){
					let str = ``;
					data.forEach(item=>{
						let {
							id,
							visitTime,
							visitText
						} = item
						str+=`
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
				}
				else {
					$tbody.html('');
					// return Promise.reject()
				}
			})
	};

	let bindDelete = ()=>{
		$tbody.click(function(e){
			let target = e.target;
			let tarName = target.tagName; // 大写的标签名
			let targetVal = target.innerText.trim();
			if(tarName === 'A' && targetVal === '删除'){
					let visitId = $(target).parent().parent().attr('data-id');
					alert('您确定要删除吗',{
						confirm:true,
						handled(msg){
							if(msg !='CONFIRM') return;
							axios.get('/visit/delete',{
								params:{
									visitId
								}
							}).then((res)=>{
								let {
									code
								} = res;
								if(code == 0){
									bindVisitList();
								}
								else {
									return Promise.reject();
								}
							}).catch(()=>{
									alert('删除失败');
							})
						}
					})
			}
		})
	};

	let bindSubmit = ()=>{
		$submit.click(()=>{
			axios.post('/visit/add',{
				customerId,
				visitTime:$visitTime.val(),
				visitText:$visitText.val().trim()
			}).then((res)=>{
				let {
					code
				} = res;
				if(code == 0){
					alert('新增成功',{
						handled(){
							bindVisitList();
							$visitText.val('');
							
						}
					})
				}
			})
		})
	};

	return {
		init(){
			customerId = location.href.queryURLParams().customerId || '';
			// console.log(customerId);
			bindVisitList().catch(()=>{
				alert('当前列表渲染失败')
			});
			bindDelete();
			bindSubmit();
		}
	}
}());
visitModule.init();