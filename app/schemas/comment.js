var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId

// 创建一个Schema
var CommentSchema = new Schema({
	movie : {
		type: ObjectId, // 字段类型ObjectID
		ref : 'Movie' // 指向数据模型Movie
	}, 
	from : {
		type: ObjectId,
		ref : 'User'
	},
	// reply里放主评论下有关联的子评论
	reply : [{
		from : {
			type: ObjectId,
			ref : 'User'
		},
		to : {
			type: ObjectId,
			ref : 'User'
		},
		content : String
	}],
	content: String,
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
	}
});

// pre方法：每次save数据之前都会调用这个方法
CommentSchema.pre('save', function(next){
	
	// 判断数据是否新加的
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	}
	// 调用next()才会让存储流程走下去
	next();
});

// 静态方法不会直接与数据库交互，只有经过Model编译并实例化，才具有此方法
CommentSchema.statics = {
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

// 将模式导出
module.exports = CommentSchema