var Movie = require('../app/controllers/movie.js');
var Index = require('../app/controllers/index.js');
var User = require('../app/controllers/user.js');


module.exports = function(app){

	app.use(function(req, res, next){		

		var user = req.session.user;
		// 将user放在app.locals中，让所有模板都能使用该变量
		app.locals.user = user;

		next();
	});

	// 首页
	app.get('/', Index.index);


	// 电影
	app.get('/movie/:id', Movie.detail);
	app.get('/admin/movie', Movie.create);
	app.get('/admin/list', Movie.list);
	app.get('/admin/update/:id', Movie.update);
	app.post('/admin/movie/new', Movie.save);
	app.delete('/admin/list', Movie.delete);


	// 用户	
	app.post('/user/signup', User.signup);
	app.post('/user/signin', User.signin);
	app.get('/user/logout', User.logout);
	app.get('/signup', User.showSignup);
	app.get('/signin', User.showSignin);	

}