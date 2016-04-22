var Movie = require('../app/controllers/movie.js');
var Index = require('../app/controllers/index.js');
var User = require('../app/controllers/user.js');
var Comment = require('../app/controllers/comment.js');
var Category = require('../app/controllers/category.js');


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
	app.get('/admin/movie', User.signinRequired, User.adminRoleRequired, Movie.create);
	// 加入中间件User.signinRequired, User.adminRoleRequired,，路由方法会按顺序跑每一个中间件
	app.get('/admin/movie/list', User.signinRequired, User.adminRoleRequired, Movie.list);
	app.get('/admin/movie/update/:id', User.signinRequired, User.adminRoleRequired, Movie.update);
	app.post('/admin/movie/new', User.signinRequired, User.adminRoleRequired, Movie.save);
	app.delete('/admin/movie/list', Movie.delete);


	// 用户	
	app.post('/user/signup', User.signup);
	app.post('/user/signin', User.signin);
	app.get('/user/logout', User.logout);
	app.get('/admin/user/list', User.signinRequired, User.adminRoleRequired, User.list);
	app.get('/signup', User.showSignup);
	app.get('/signin', User.showSignin);	


	// 评论
	app.post('/user/comment', User.signinRequired, Comment.save);

	// 分类
	app.get('/admin/category/new', User.signinRequired, User.adminRoleRequired, Category.new);
	app.post('/admin/category', User.signinRequired, User.adminRoleRequired, Category.save);
	app.get('/admin/category/list', User.signinRequired, User.adminRoleRequired, Category.list);

	// 分页查询
	app.get('/results', Index.search)
};
