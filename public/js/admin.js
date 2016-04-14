// 删除当前movie
$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var row = $('.item-id-' + id);

		$.ajax({
			type : 'delete',
			url : '/admin/list?id=' + id
		}).done(function(result){ // 请求完成后获取响应的JSON数据result		
			// 进行判断返回状态，然后动态删除该行
			if(result.success){
				if (row.length > 0) {
					row.remove();
				}
			}
		});
	});
});