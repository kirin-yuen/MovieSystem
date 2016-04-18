var mongoose = require('mongoose');
// 引入模式所导出的模块
var MovieSchema = require('../schemas/movie');
// 编译生成Movie这个模型,自动将Movie转成小写movie
// 再转换为复数形式命名表名movies
var Movie = mongoose.model('Movie', MovieSchema);
// 导出这个构造函数
module.exports = Movie;