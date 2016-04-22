var mongoose = require('mongoose');
// 引入模式所导出的模块
var CommentSchema = require('../schemas/comment');
// 编译生成Comment这个模型,自动将Comment转成小写comment
// 再转换为复数形式命名表名comments
var Comment = mongoose.model('Comment', CommentSchema);
// 导出这个构造函数
module.exports = Comment;