var User = require('../models/user');

// POST注册处理
exports.signup = function(req, res) {
	var reqUser = req.body.user;
			
	// 如果存在名字相同的，就跳去路由/
	User.find({ name : reqUser.name}, function(err, user){
		
		if(err) console.error(err);
		
		if(user.length != 0){
			return res.redirect('/signin');
		} else {
			var _user = new User(reqUser);

			_user.save(function(err, user){
				if (err) console.error(err);

				res.redirect('/');
			});
		}
	});
};

// POST登陆处理
exports.signin = function(req, res) {
	var reqUser = req.body.user;
		
	User.findOne({name : reqUser.name}, function(err, user){
		if(err) console.error(err);
		
		if(!user) {
			console.log('user is not exist');
			return res.redirect('/signup');
		} 

		// UserSchemas的实例方法，会在Schemas中定义
		user.comparePassword(reqUser.password, function(err, isMatch){
			if(err) console.error(err);

			if(isMatch){
				// 设置session
				req.session.user = user;
				console.log('is match!');
				res.redirect('/');
			} else{

				console.log('not match!');
				res.redirect('/signin');
			}
		});
		
	});
};

// 登出操作
exports.logout = function(req, res) {
	// 删除session和全局变量locals中的user
	delete req.session.user;
	// delete app.locals.user; // no need to delete?

	res.redirect('/');
};

// 用户列表页
exports.list = function(req, res) {
	User.fetch(function(err, users){
		if(err) console.log(err);

		res.render('pages/userlist', {
			title: '用户列表页',
			users: users
		});
	});	
};

// 显示注册页
exports.showSignup = function(req, res) {

	res.render('pages/signup', {
		title: '注册页'
	});
};

// 显示登陆页
exports.showSignin = function(req, res) {

	res.render('pages/signin', {
		title: '登陆页'
	});
};