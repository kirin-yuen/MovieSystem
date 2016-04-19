var mongoose = require('mongoose');

// 专门为密码存储设计的算法
var bcrypt = require('bcrypt');


// 创建一个Schema,定义文档结构和数据类型
var UserSchema = new mongoose.Schema({
	name : {
		type : String,
		unique : true,
	},
	// 密码字段:加盐后的密码通过HASH算法加密的值
	// 加盐就是在自定义密码的基础上加入其他成分
	password : {
		type : String,
		unique : true,	
	},
	// meta是录入数据时间的记录
	meta : {
		createAt : {
			type : Date,
			default : Date.now()
		},
		updateAt : {
			type : Date,
			default : Date.now()
		}
	},
	// 0: normal user; 1: verified user >10: admin ...
	role : {
		type : Number,
		default : 0
	}
});

// pre方法：每次save数据之前都会调用这个方法
UserSchema.pre('save', function(next){
	var user = this;

	// 判断数据是否新加的
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	}
	
	// 随机生成盐,第一个参数是计算强度,计算强度越大破解就越困难,默认10
	// 回调方法中能拿到生成的盐
	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err);

		// hash加密,回调函数的hash能获得加盐后hash的值
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);			

			user.password = hash;
			// 调用next()才会让存储流程走下去
			next();
		});
	});
});

// 静态方法不会直接与数据库交互，只有经过Model编译并实例化，才具有此方法
UserSchema.statics = {
	// fetch 取出目前数据库的所有数据
	fetch : function(cb) {
		// 按sort更新时间排序,然后执行回调方法
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById : function(id, cb) {
		// 查询单条数据
		return this.findOne({_id : id}).exec(cb);
	}
};

// 定义UserSchemas的实例方法
UserSchema.methods = {
	comparePassword : function(password, cb){
		bcrypt.compare(password, this.password, function(err, isMatch){
			if(err) return cb(err, null);
			
			cb(null, isMatch);
		})
	}
}

// 将模式导出
module.exports = UserSchema