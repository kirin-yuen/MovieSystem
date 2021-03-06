var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

// 电影详情页
exports.detail = function (req, res) {

	var id = req.params['id'];

	// update pv, $inc 自增1
	Movie.update({_id : id} , {$inc : { pv : 1}}, function(err){
		if(err) console.error(err);
	});

	Movie.findById(id, function(err, movie){

		// 通过movie.id查询comment中对应的记录，并且将返回结果comments加入到视图中
		Comment
		.find({movie: id})
		// 通过populate来查询from字段中ref到User模式对应的name字段,填充到comments中
		.populate('from', 'name')
		// 通过populate来查询reply.from和reply.to字段中的ref到User模式对应的name字段,填充到comments中
		.populate('reply.from reply.to', 'name')
		.exec(function(err, comments){
						
			res.render('pages/detail', {
				title : movie.title + '详情页',
				movie : movie,
				comments : comments
			});
		});		
	});	
};

// 后台创建页
exports.create = function(req, res){

	Category.find({}, function(err, categories){
		res.render('pages/admin', {
			title : '后台管理页',
			categories : categories,
			movie : {}
		});
	});
};

// 后台列表页
exports.list = function(req, res){

	Movie.find({})
		.populate('category', 'name')
		.exec(function(err, movies){
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
			if(err) console.log(err);
			
			Category.find(function(err, categories){
				if(err) console.log(err);

				res.render('pages/admin', {
					title : '后台更新页',
					movie : movie,
					categories : categories
				});

			});

		});
	}
};

// 新增或更新数据：获取从后台录入页表单post过来的数据
exports.save = function(req, res){
	var id = req.body.movie._id;	

	// 使用body-parser后，将body后的内容转换成一个对象
	var moviePost = req.body.movie;
	var _movie;

	// 在savePoster中成功写入文件后挂载到req上的poster
	if(req.poster){
		moviePost.poster = req.poster;
	}

	// 判断从后台录入页post过来数据是新增的还是更新
	if(id){
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
		_movie = new Movie(moviePost);

		var categoryId = moviePost.category;
		var categoryName = moviePost.categoryName;

		_movie.save(function(err, movie){
			if(err) console.error(err);

			if(categoryId) {
				Category.findById(_movie.category, function(err, category){
					if(err) console.error(err);

					// category同时保存点电影的ID
					category.movies.push(_movie._id);

					category.save(function(err, category){
						if(err) console.error(err);


						// 保存成功后跳转到更新后详情页面
						res.redirect('/movie/' + movie._id);

					})
				});
			} else if(categoryName) {
				var category = new Category({
					name: categoryName,
					movies: [movie._id]
				});

				category.save(function(err, category){
					if(err) console.error(err);
					movie.category = category._id;
					movie.save(function(err, movie){
						// 保存成功后跳转到更新后详情页面
						res.redirect('/movie/' + movie._id);
					});

				});
			}

			

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


// 处理文件上传的中间件savePoster
exports.savePoster = function(req, res, next){
	// 通过files数组获取文件内容
	console.log(req.files)
	var posterData = req.files.uploadPoster;

	console.log(posterData);
	console.log('====dirname' + __dirname);
	console.log('====path' + path);

	var filePath = posterData.path;
	var originalFilename = posterData.originalFilename;

	if(originalFilename){

		fs.readFile(filePath, function(err, data){
			var timestamp = Date.now();
			var type = posterData.type.split('/')[1];
			// 新保存的文件名
			var posterNewName = timestamp + '.' + type;
			var newPath = path.join(__dirname, '../..', '/public/upload/' + posterNewName);

			fs.writeFile(newPath, data, function(err){
				if(err) console.error(err);
				
				req.poster = posterNewName;

				next();
			});
		})
	}
	else {
		next();
	}

};