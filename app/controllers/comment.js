var Comment = require('../models/comment');


// 新增或更新数据：获取从后台录入页表单post过来的数据



exports.save = function(req, res){
	// 使用body-parser后，body后的内容将转换成一个对象
	var _comment = req.body.comment;
	var movieId = _comment.movie;
	
	// 如果用户提交过来的数据有commentId(通过点击头像，jquery才会动态插入cid）
	// 就是已经有一条comment,则代表需要是对某用户进行评论	
	if(_comment.cid){
		console.log('nest comment');
		Comment.findById(_comment.cid, function(err, comment){
			if(err) console.error(err);

			var reply = {
				from : _comment.from,
				to : _comment.tid,
				content: _comment.content
			};

			comment.reply.push(reply);

			comment.save(function(err, comment){
		
				if(err) console.error(err);

				// 保存成功后跳转到更新后详情页面
				res.redirect('/movie/' + movieId);
			});
		})
	} 
	// 否则就是对该电影进行评论
	else {
		
		var comment = new Comment(_comment);

		comment.save(function(err, comment){
			
			if(err) console.error(err);

			// 保存成功后跳转到更新后详情页面
			res.redirect('/movie/' + movieId);
		});		
	}

	
};