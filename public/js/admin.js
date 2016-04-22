// 后台js脚本
$(function(){

	// 删除当前movie
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

	// 失去焦点获得豆瓣数据
	$('#inputDouban').blur(function(e){
		var $inputDouban = $(this);
		var dbId = $inputDouban.val();
		console.log(!dbId.match(/^\s*$/g))

		if(!dbId.match(/^\s*$/g)){
			$.ajax({
				type : 'get',
				url : 'https://api.douban.com/v2/movie/subject/' + dbId,
				dataType : 'jsonp',
				cache : true,
				jsonp : 'callback',
				crossDomain : true,
				success : function(data){
					// 将返回的数据设值
					$('#inputTitle').val(data.title);
					$('#inputDoctor').val(data.directors[0].name);
					$('#inputCountry').val(data.countries[0]);
					$('#inputPoster').val(data.images.large);
					$('#inputYear').val(data.year);
					$('#inputSummary').val(data.summary);
				}, error : function(xhr, errText, err){
					console.log(errText,err)
					$inputDouban.val(err);
				}
			});
		}
		
	});


});