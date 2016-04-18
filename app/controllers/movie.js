var Movie = require('../models/movie');
var _ = require('underscore');

// 电影详情页
exports.detail = function (req, res) {

	var id = req.params['id'];

	Movie.findById(id, function(err, movie){
		res.render('pages/detail', {
			title : movie.title + '详情页',
			movie : movie
		});
	});	
};

// 后台创建页
exports.create = function(req, res){
	res.render('pages/admin', {
		title : '后台管理页',
		movie : {
			_id:'',
			doctor:'',
			country:'',
			title:'',
			year:'',
			poster:'',
			language:'',
			flash:'',
			summary:''
		}
	});
};

// 后台列表页
exports.list = function(req, res){
	Movie.fetch(function(err, movies){
		if(err) console.log(err);

		res.render('pages/list', {
			title: '列表页',
			movies: movies
		});
	});	
};

// 更新数据
exports.update = function(req, res){
	var id = req.params['id'];

	if(id){
		Movie.findById(id , function(err, movie){
			res.render('pages/admin', {
				title : '后台更新页',
				movie : movie
			})
		});
	}
};

// 新增或更新数据：获取从后台录入页表单post过来的数据
exports.save = function(req, res){
	var id = req.body.movie._id;	

	// 使用body-parser后，将body后的内容转换成一个对象
	var moviePost = req.body.movie;
	var _movie;
	// 判断从后台录入页post过来数据是新增的还是更新
	if(id !== ''){
		// 更新：如果已经在数据库中存储过
		Movie.findById(id , function(err, movie){
			if(err) console.error(err);

			// 用post过来的数据替换原来的数据
			// underscore模块中有一个
			// extend(查询到的结果, 表单发过来的数据)的方法
			_movie = _.extend(movie, moviePost);			

			_movie.save(function(err, movie){
				if(err) console.error(err);

				// 更新后跳转到更新后详情页面,movie是更新后返回的内容
				res.redirect('/movie/' + movie._id);
			});
		});
	} else {
		// 新增：如果Post过来的id不存在，则新建数据
		_movie = new Movie({
			doctor : moviePost.doctor,
			title : moviePost.title,
			country : moviePost.country,
			language : moviePost.language,
			year : moviePost.year,
			poster : moviePost.poster,
			summary : moviePost.summary,
			flash : moviePost.flash,
		});

		_movie.save(function(err, movie){
			console.log(movie)
				if(err) console.error(err);
				// 保存成功后跳转到更新后详情页面
				res.redirect('/movie/' + movie._id);
		});
	}
};

// 删除行记录的处理
exports.delete = function(req, res){
	var id = req.query.id;
		if(id){
			Movie.remove({_id : id}, function(err, movie){
				if(err) console.error(err);
				// 如果删除成功，给客户端返回json数据，并切属性success为true，用于客户端判断是否成功删除
				res.json({
					success : true
				})
			})
		}
};