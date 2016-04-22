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


exports.search = function(req, res) {	
	var catId = req.query.cat;
	var page = parseInt(req.query.p);
	var count = 3;
	var index = page * count;

	Category.find({_id: catId})	
			.populate({path: 'movies'})
			.exec(function(err, categories){
				if(err) console.error(err);

				var category = categories[0] || {};

				var movies = category.movies || [];
				var results = movies.slice(index, index + count);
				console.log('==========movies')
				console.log(movies.length);
				console.log('==========results')
				console.log(results.length);

				res.render('pages/results', {
					title : '结果列表页',
					keyword : category.name,
					currentPage: (page + 1),
					query: 'cat=' + catId,
					totalPage : Math.ceil(movies.length / count),
					movies : results
				});
			});

};