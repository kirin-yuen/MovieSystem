// 与 Grunt 有关的主要有三块代码：任务配置、插件加载、任务注册
module.exports = function(grunt){
	// 【插件加载】
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	// 便于开发时，不会因为语法错误警告而中断grunt的服务
	grunt.option('force', true);

	// 【任务注册】在default上面注册了concurrent任务，default是别名，它是默认的task
	// 当你在项目目录执行 grunt 时，只需使用grunt，如果是其他任务名则需grunt [taskName]
	grunt.registerTask('default', ['concurrent']);

	// 【任务配置】配置Gruntfile.js,配置了3个任务
	grunt.initConfig({
		// 监听下方文件变化
		watch : {
			jade : {
				files : ['views/**'],
				options : {
					// 当文件改动时候，是否重启服务
					liverreload : true
				}
			},
			js : {
				files : ['public/js/**', 'models/**/**/*.js', 'schemas/**/*.js'],
				options : {
					liverreload : true
				}
			}
		},

		// 与watch相似
		nodemon : {
			dev : {
				options : {
					file : 'server.js',
					args : [],
					ignoredFiles : ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions : ['js'],
					watchedFolders : ['./'],
					debug : true,
					delayTime : 1,
					env : {
						PORT : 4000
					},
					cwd : __dirname
				}
			}
		},

		// 默认任务，通过tasks传入两个任务
		concurrent : {
			tasks : ['nodemon', 'watch'],
			options : {
				logConcurrentOutput : true
			}
		}
	});
}