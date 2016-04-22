var mongoose = require('mongoose');
// 引入模式所导出的模块
var CategorySchema = require('../schemas/category');
// 编译生成Category这个模型,自动将Category转成小写category
// 再转换为复数形式命名表名Categorys
var Category = mongoose.model('Category', CategorySchema);
// 导出这个构造函数
module.exports = Category;