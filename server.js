var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Movie = require('./models/movie');
var User = require('./models/user');
var _ = require('underscore');

var app = express();
// 设置模板引擎为jade
app.set('view engine', 'jade');

// 表单数据格式化
// express 4 弃用了express.bodyPareser()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// 将moment添加到locals中，让jade模板能直接使用
app.locals.moment = require('moment');

// 静态文件库入口
app.use(express.static(path.join(__dirname, 'public')));

// 连接本地数据库imooc
mongoose.connect('mongodb://localhost/imooc');

// process.env.PORT是当前环境变量配置的端口
// 可通过命令行PORT=4000配置端口,process.env.PORT这样的值就是4000
var port = process.env.PORT || 3000;

console.log('环境变量配置的端口:' + process.env.PORT);

// 首页
app.get('/', function (req, res) {

	// 获取schemas中exec前返回的结果，传递给movies
	Movie.fetch(function(err, movies){
		if(err) console.error(err);

		res.render('pages/index', {
			title : '首页',
			movies : movies
		})
	});

});

// 电影详情页
app.get('/movie/:id', function (req, res) {

	var id = req.params['id'];

	Movie.findById(id, function(err, movie){
		res.render('pages/detail', {
			title : movie.title + '详情页',
			movie : movie
		});
	});	
});

// 后台管理页
app.get('/admin/movie', function (req, res) {
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
	})
});

// 后台列表页
app.get('/admin/list', function (req, res) {

	Movie.fetch(function(err, movies){
		if(err) console.log(err);

		res.render('pages/list', {
			title: '列表页',
			movies: movies
		});
	});	
});

// 更新数据
app.get('/admin/update/:id', function(req, res){
	var id = req.params['id'];

	if(id){
		Movie.findById(id , function(err, movie){
			res.render('pages/admin', {
				title : '后台更新页',
				movie : movie
			})
		});
	}
});

// 新增或更新数据：获取从后台录入页表单post过来的数据
app.post('/admin/movie/new', function(req, res){
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
});


// 删除行记录的处理
app.delete('/admin/list', function(req, res){
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
});


// POST注册处理
app.post('/user/signup', function(req, res){
	var reqUser = req.body.user;
	
	// 如果存在名字相同的，就跳去路由/
	User.find({ name : reqUser.name}, function(err, user){
		
		if(err) console.error(err);
		
		if(user.length != 0){
			return res.redirect('/');
		} else {
			var _user = new User(reqUser);

			_user.save(function(err, user){
				if (err) console.error(err);

				res.redirect('/admin/userlist');
			});
		}
	});

	
});

// 用户列表页
app.get('/admin/userlist', function (req, res) {

	User.fetch(function(err, users){
		if(err) console.log(err);

		res.render('pages/userlist', {
			title: '用户列表页',
			users: users
		});
	});	
});

// 端口留空，则会随机分配一个端口
app.listen(port);

console.log('server is running on localhost:%s', port);