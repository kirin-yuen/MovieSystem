var mongoose = require('mongoose');
// 引入模式所导出的模块
var UserSchema = require('../schemas/user');
// 编译生成Movie这个模型,自动将User转成小写user
// 再转换为复数形式命名表名users
var User = mongoose.model('User', UserSchema);
// 导出这个构造函数
module.exports = User;