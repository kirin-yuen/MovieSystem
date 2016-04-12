var express = require('express');
var path = require('path');

var app = express();
app.set('view engine', 'jade');
// app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'bower_components')));

// process.env.PORT是当前环境变量配置的端口
var port = process.env.PORT || 1337;


// index
app.get('/', function (req, res) {
	res.render('pages/index', {
		title : '首页',
		movies : [{
				title:'太阳的后裔',
				_id: 1,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},{
				title:'太阳的后裔',
				_id: 2,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},{
				title:'太阳的后裔',
				_id: 3,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},{
				title:'太阳的后裔',
				_id: 4,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},{
				title:'太阳的后裔',
				_id: 5,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},{
				title:'太阳的后裔',
				_id: 6,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			}]
	})
});

// detail
app.get('/movie/:id', function (req, res) {
	res.render('pages/detail', {
		title : '详情页',
		movie:{
			_id:1,
			doctor:'javan',
			country:'china',
			title:'钢铁侠',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'chinese',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造'
		}
	})
});

// admin
app.get('/admin/movie', function (req, res) {
	res.render('pages/admin', {
		title : '管理页',
		movie:{
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

// list
app.get('/admin/list', function (req, res) {
	res.render('pages/list', {
		title: '列表页',
		movies:[{
			_id:1,
			doctor:'javan',
			country:'china',
			title:'钢铁侠',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'chinese',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造'
			},{
			_id:2,
			doctor:'javan',
			country:'china',
			title:'钢铁侠',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'chinese',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造'
		}]
	})
});

// 端口留空，则会随机分配一个端口
app.listen(1337);

console.log('server is running on %s', port);