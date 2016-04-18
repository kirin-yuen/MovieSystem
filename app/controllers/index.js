var Movie = require('../models/movie');

exports.index = function(req, res) {		
	
	// 获取schemas中exec前返回的结果，传递给movies
	Movie.fetch(function(err, movies){
		if(err) console.error(err);

		res.render('pages/index', {
			title : '首页',
			movies : movies
		})
	});

};