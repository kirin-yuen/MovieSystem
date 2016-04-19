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
    * 开发评论功能
    * 实现电影的分类功能
    * 增强后台功能


### 页面构成

路由如下，功能尚未完善因此，因此有需要手动输入下方路由

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

* 首页 /
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
提供三条所需录入的测试数据，使用端口3000，可先使用路由/admin/movie进入进行数据录入
```
    美国队长3

    安东尼·罗素 / 乔·罗素

    美国

    英语

    http://moviepic.manmankan.com/yybpic/juzhao/201504/2126_40193.jpg

    http://player.youku.com/player.php/sid/XMTUyMzk0MDU3Mg==/v.swf

    2016-05-06

    故事聚焦奥创事件之后，美国队长组建了一支新的超级英雄队伍，继续维护世界和平。因为世界各国都想插手管理一系列事情导致复仇者之间的内部矛盾，政治压力攀升，一系列问责机制和管理机构相继诞生。超级英雄们一边要解决新状况带来的团队裂痕，一边还要对付邪恶的新对手……
```

```
    猎神：冬日之战
    
    塞德里克·萨科
    
    美国
    
    英语
    
    http://upload.taihainet.com/2016/0224/1456304364392.jpg
    
    http://player.youku.com/player.php/sid/XMTM5MDIyMzYxMg==/v.swf
    
    2016-04-22
    
    《猎神：冬日之战》的故事发生在两位女王统治下的冰雪王国。“猎神”与萨拉的相爱，违反了冰雪女王的禁令，为了终结这个王国的邪恶统治，他们与两位女王展开了对抗。随着对抗的升级，双方阵营都出现了微妙变化。而最终“猎人”与女勇士..
```

```
    复仇者联盟3：无限战争
    
    安东尼·罗素、乔·罗素
    
    美国
    
    英语
    
    http://img1.gamersky.com/image2015/05/20150508xjn_4/gamersky_02small_04_20155819303C4.jpg
    
    http://player.youku.com/player.php/sid/XODEzODYzMDQ4/v.swf
    
    2018-05-04
    
    一股突如其来的强大邪恶势力对地球造成致命威胁，没有任何一个超级英雄能够单独抵挡。长期致力于保护全球安危的神盾局(SHIELD)感到措手不及，其指挥官“独眼侠”尼克-法瑞(塞缪尔·杰克逊 Samuel L. Jackson 饰)意识到他必须创建一个“史上最强”的联盟组织，云集各方超级英雄一起发威，才能拯救世界于水深火热，抵御黑暗势力的侵袭。
```