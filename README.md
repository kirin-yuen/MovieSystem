# 电影网站
根据《node+mongodb 建站攻略》教程完成

### 该项目使用如下技术：

* 后端服务器NodeJS，借助Web应用框架Express
* 前端样式使用Bootstrap，视图模板引擎使用Jade
* 数据库使用Mongoose工具进行建模


###目前已完成第一和第二版

* 第一版：伪数据版本
* 第二版：使用Mongoose工具加入数据库操作
* 第三版：即将继续该教程的第二期进行功能完善
    * 开发用户的注册登录功能 (已完成)
    * 开发评论功能 (已完成)
        * 叠楼评论
    * 实现电影的分类功能 (已完成)
        * 分页功能
        * 增加搜索功能
        * jsonp同步豆瓣数据api
    * 增强后台功能 (已完成)
        * 增加海报上传
        * 详情页访问统计功能


### 页面构成

路由如下，功能尚未完善，因此有需要手动输入下方路由

**后台页面**

* 电影数据录入页 /admin/movie  
* 电影数据列表页 /admin/movie/list
* 用户列表页 /admin/user/list

后台管理页由于新增权限控制，前台注册页面无提供role字段的写入操作，因此请使用mongo进行用户权限修改，命令如下：
```javascript
    mongo // 进入mongo命令行
    use imooc
    db.users.update({name: your_signup_name}, {$set: {role: 20}}) // your_signup_name代表你注册的用户名

```

**前台页面**

* 首页入口 /
* 注册页 /signup
* 登陆页 /signin




### 安装
---
```javascript
    npm install 
    bower install
```


### 运行
---
安装完成后可输入如下命令启动服务器
```javascript
    node server    
```

可使用grunt工具启动服务器
```javascript
    grunt
```


### 数据
---
关于数据录入部分已经可以使用`豆瓣同步`的输入框填写豆瓣电影的ID作为自动填充数据的依据  
数据录入入口：/admin/movie

#### 例子
https://movie.douban.com/subject/2138838/ `豆瓣的ID就是2138838`  
豆瓣未能填充的字段请自行补全，下方提供3条视频源地址的数据


```
    http://player.youku.com/player.php/sid/XMTUyMzk0MDU3Mg==/v.swf    
    
    http://player.youku.com/player.php/sid/XMTM5MDIyMzYxMg==/v.swf
    
    http://player.youku.com/player.php/sid/XODEzODYzMDQ4/v.swf
```