var Movie = require('../models/movie');
var Category = require('../models/category');

exports.index = function(req, res) {	

	Category.find({})	
			.populate({path: 'movies', options: {limit : 6}})
			.exec(function(err, categories){
				if(err) console.error(err);

				res.render('pages/index', {
					title : '首页',
					categories : categories
				});
			});

};

// 分类页与查询功能
exports.search = function(req, res) {
	var catId = req.query.cat;
	var q = req.query.q;
	var page = parseInt(req.query.p) || 0;
	var count = 3;
	var index = page * count;

	if(catId){
		Category.find({_id: catId})	
				.populate({path: 'movies'})
				.exec(function(err, categories){
					if(err) console.error(err);

					var category = categories[0] || {};

					var movies = category.movies || [];
					var results = movies.slice(index, index + count);

					res.render('pages/results', {
						title : '结果列表页',
						keyword : category.name,
						currentPage: (page + 1),
						query: 'cat=' + catId,
						totalPage : Math.ceil(movies.length / count),
						movies : results
					});
				});		
	}

	if(q){
		// 加入正则表达式模拟模糊查询
		Movie.find({title : new RegExp(q + '.*')}, function(err, movies){
			if(err) console.error(err);


			var results = movies.slice(index, index + count);

			res.render('pages/results', {
				title : '结果列表页',
				keyword : q,
				currentPage: (page + 1),
				query: 'q=' + q,
				totalPage : Math.ceil(movies.length / count),
				movies : results
			});


		});

	}


};