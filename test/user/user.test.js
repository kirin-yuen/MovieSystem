var chai = require('chai');
var should = chai.should();

// 加密模块
var crypto = require('crypto');
var bcrypt = require('bcrypt');

// 引入其他模块
var app = require('../../server');
var mongoose = require('mongoose');
var User = require('../../app/models/user');

// 获取随机字符串，用来测试user时有名字
function getRandomString(len){
	// len没传值，默认=16
	if(!len) len = 16;
	
	// 生成长度为16的字符串
	return crypto.randomBytes(len);
}

var user;

// test
describe('Unit Test', function(){

	// 测试 Model
	describe('Model User:', function(){

		// 在本区块的所有测试用例之前执行
		// 预定义好变量
		before(function(done){
			user = {
				name : getRandomString(),
				password : 'password'
			};

			done();
		});

		// 测试保存之前
		describe('Before Method save:', function(){
			// 保存之前用户名是不应该存在于数据库中
			it('should begin without test user', function(done){
				User.find({name : user.name}, function(err, users){
					if(err) console.error(err);

					users.should.have.length(0);

					done();
				});
			});
		});

		// 测试User保存过程
		describe('User save:', function(){

			// 测试保存是否有问题
			it('should save without problems', function(done){
				var _user = new User(user);

				_user.save(function(err){
					// 保存成功的话err是不应该存在
					should.not.exist(err);

					// 清理测试数据
					_user.remove(function(err){
						should.not.exist(err);

						done();
					});
				})
			});

			// 测试密码是否加密成功
			it('should password be hashed correctly', function(done){
				var password = user.password;
				var _user = new User(user);

				_user.save(function(err){
					// 保存成功的话err是不应该存在
					should.not.exist(err);

					// 测试用户密码长度不应该为0
					_user.password.should.not.have.length(0);

					// 比对密码
					bcrypt.compare(password, _user.password, function(err, isMatch){
						should.not.exist(err);

						// 比对应该成功
						isMatch.should.equal(true);

						_user.remove(function(err){
							should.not.exist(err);

							done();
						});

					});
				});
			});

			// 权限的单元测试
			it('should have default role 0', function(done){
				var _user = new User(user);

				_user.save(function(err){
					should.not.exist(err);

					_user.role.should.equal(0);

					_user.remove(function(err){
						should.not.exist(err);

						done();
					});
				})
			});

			// 测试用户重名
			it('should fail to save an existing user', function(done){
				var _user1 = new User(user);

				_user1.save(function(err){					
					should.not.exist(err);

					var _user2 = new User(user);
					_user2.save(function(err){
						// 由于用户重名，所以err应该存在
						should.exist(err);

						_user1.remove(function(err){

							if(!err){
								_user2.remove(function(err){
									done();
								});
							}
							
						})
					});
					
				});

			});


		});

	});

})