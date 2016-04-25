var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session');

// 初始化store对象
var MongoStore = require('connect-mongo')(session);

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var logger = require('morgan');

var dbUrl = 'mongodb://localhost/imooc';

var app = express();
// 设置模板引擎为jade
app.set('view engine', 'jade');
app.set('views', './app/views')

// 表单数据格式化
// express 4 弃用了express.bodyPareser()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// 引入cookieParser,session才能正常运作
app.use(cookieParser());
// 利用 mongodb 做会话的持久化
app.use(session({
	secret : 'immoc',
	store : new MongoStore({
		url : dbUrl,
		collection : 'sessions'
	})
}));

// express4弃用app.use(express.multipart);
app.use(require('connect-multiparty')());

// 将moment添加到locals中，让jade模板能直接使用
app.locals.moment = require('moment');

// 静态文件库入口
app.use(express.static(path.join(__dirname, 'public')));

// 连接本地数据库imooc
mongoose.connect(dbUrl);

// process.env.PORT是当前环境变量配置的端口
// 可通过命令行PORT=4000配置端口,process.env.PORT这样的值就是4000
var port = process.env.PORT || 3000;

console.log('环境变量配置的端口:' + process.env.PORT);

// 配置开发环境中服务器提示信息
if('development' == app.get('env')){

	// 显示错误信息
	app.set('showStackError', true);
	// 查看请求方法 地址 状态
	app.use(logger(':method :url :status'));
	// 格式化查看源文件中的源码格式
	app.locals.pretty = true;
	// 数据库的debug模式打开
	mongoose.set('debug', true);
}

// 将路由代码同意放到routes.js
require('./config/routes')(app);


// 端口留空，则会随机分配一个端口
app.listen(port);

console.log('server is running on localhost:%s', port);