/**
 * Created by caozhihui on 2017/1/24.
 */

let express = require('express');
let router = express.Router();
let User = require('../models/User');
let Category = require('../models/Category');
let Content = require('../models/Content');
//时间格式化
let moment = require('moment');
router.use(function(req,res,next){
   if(!req.userInfo.isAdmin){
       return res.send('您不是管理员');

   }
   next();
});

/*
* 管理首页
* */
router.get('/',(req,res,next)=>{
    res.render('admin/index.html',{
        userInfo : req.userInfo
    });
});


/*、
* 从数据库中拉取用户数据
* limit() ： 限制获取的数据
* */


router.get('/users',(req,res,next)=>{
    let page = Number(req.query.page || 1);
    let limit = 10;
    let pages = 0 ;
        User.count().then(function(count){

        let pages = Math.ceil(count / limit);
        //page 处理 最小不能小于1 最大不能 大过pages
            page = Math.min(page,pages);

            page = Math.max(1,page);


            let skip = (page - 1) * limit;

            limit = limit > count ? count : limit;


            //查询多少条  跳过多少条
        User.find().limit(limit).skip(skip).then(function(users){
            res.render('admin/users_index.html',{
                userInfo : req.userInfo,
                users : users,
                limit : limit,
                pages : pages,
                page : page,
                count : count
            });
        });
    });

});

/*、
* 栏目主页
* 升序 ： 1 从小到大
* 降序 ： -1 从大到小
* */

router.get('/category',(req,res,next)=>{
    let page = Number(req.query.page || 1);
    let limit = 10;
    let pages = 0 ;
    Category.count().then(function(count){

        let pages = Math.ceil(count / limit);
        //page 处理 最小不能小于1 最大不能 大过pages
        page = Math.min(page,pages);

        page = Math.max(1,page);


        let skip = (page - 1) * limit;

        limit = limit > count ? count : limit;


        //查询多少条  跳过多少条
        Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function(users){
            res.render('admin/category_index.html',{
                userInfo : req.userInfo,
                users : users,
                limit : limit,
                pages : pages,
                page : page,
                count : count
            });
        });
    });
});

/*、
* 添加栏目
* */

router.get('/category/add',(req,res,next)=>{
    res.render('admin/category_add.html',{
        userInfo : req.userInfo
    });
});

/*
* 添加栏目
* */
router.post('/category/add',(req,res,next)=>{
    let name = req.body.name;
    if(name == ''){
        return res.render('admin/error.html',{
            userInfo : req.userInfo,
            error : '输入的栏目名称不能为空~~'
        });
    }
    //检查 栏目名称是否存在
    Category.findOne({name : name}).then(function(result){
        if(result){
            res.render('admin/error.html',{
                userInfo : req.userInfo,
                error : '输入的栏目名称已存在~~'
            });
            return Promise.reject();
        }
        return new Category({
            name : name
        }).save();
    }).then(function(newName){
        res.render('admin/success.html',{
            userInfo : req.userInfo,
            success : '添加栏目成功~`',
            url : '/admin/category'
        });

    });


});


/*、
* 编辑栏目
* */

router.get('/category/edit',function(req,res,next){
    let id = req.query.id || '';
    Category.findOne({_id:id}).then(function(category){
        if(!category){
            return  res.render('admin/error.html',{
                userInfo : req.userInfo,
                error : '您修改的栏目不存在'
            });
        }
        res.render('admin/category_edit.html',{
            userInfo : req.userInfo,
            name : category.name
        });
    });

});

/*
* 提交修改栏目
*
* */
router.post('/category/edit',function(req,res,next){
    let name = req.body.name || '';
    let id = req.query.id || '';
    Category.findOne({_id : id}).then(function(category){
        if(!category){
            res.render('admin/error.html',{
                userInfo : req.userInfo,
                error : '您修改的栏目不存在'
            });
            return Promise.reject();
        }
        if(name == category.name ){
            res.render('admin/success.html',{
                userInfo : req.userInfo,
                success : '修改栏目成功~`',
                url : '/admin/category'
            });
            return Promise.reject();
        }
        Category.findOne({
            _id : { $ne : id},
            name : name
        }).then(function(sameCategory){
            if(sameCategory){
                res.render('admin/error.html',{
                    userInfo : req.userInfo,
                    error : '您要修改的栏目名称已存在'
                });
                return Promise.reject();
            }

            //更新需要 return 出去更新
            return Category.update({_id:id},{name : name});
        }).then(function(){
            res.render('admin/success.html',{
                userInfo : req.userInfo,
                success : '修改栏目成功~`',
                url : '/admin/category'
            });
        });
    });

});

/*
* 删除栏目
*
* */
router.get('/category/delete',function(req,res,next){
   let id = req.query.id ;
   Category.findOne({_id:id}).then(function(category){
       if(!category){
           res.render('admin/error.html',{
               userInfo : req.userInfo,
               error : '您要删除的栏目不存在'
           });
           return Promise.reject();
       }
       Category.remove({_id : id}).then(function(){
           res.render('admin/success.html',{
               userInfo : req.userInfo,
               success : '删除栏目成功~`',
               url : '/admin/category'
           });
       });
   });
});
/*
* 内容主页
* */
router.get('/content',function(req,res,next){
    let page = Number(req.query.page || 1);
    let limit = 10;
    let pages = 0 ;
    Content.count().then(function(count){

        let pages = Math.ceil(count / limit);
        //page 处理 最小不能小于1 最大不能 大过pages
        page = Math.min(page,pages);

        page = Math.max(1,page);


        let skip = (page - 1) * limit;

        limit = limit > count ? count : limit;


        //查询多少条  跳过多少条
        Content.find().sort({_id:-1}).limit(limit).skip(skip).populate(['category','user']).then(function(contents){
            res.render('admin/content_index.html',{
                userInfo : req.userInfo,
                contents : contents,
                limit : limit,
                pages : pages,
                page : page,
                count : count
            });
        });
    });
});

/*
* 内容添加
* */
router.get('/content/add',function(req,res,next){
    Category.find().sort({_id:-1}).then(function(categories){
        res.render('admin/markdown_add.html',{
            userInfo : req.userInfo,
            categories : categories
        });
    });

});

/*
* 内容添加
* */

router.post('/content/add',function(req,res,next){
    let {category,title,description,content,html,guideMap} = req.body;

    if(category == ''){
        return res.render('admin/error.html',{
            userInfo : req.userInfo,
            error : '请选择栏目'
        });
    }
    if(title == ''){
        return res.render('admin/error.html',{
            userInfo : req.userInfo,
            error : '先填写文章标题'
        });
    }

    if(!description){
        description = content.slice(0,200);
    }
    new Content({
        category : category,
        title : title,
        description : description,
        content : content,
        user : req.userInfo._id,
        html : html,
        guideMap : guideMap,
        showTime : moment(new Date()).format("YYYY年MM月DD日, HH:mm:ss")
    }).save().then(function(data){
        return res.render('admin/success.html',{
            userInfo : req.userInfo,
            success : '文章添加成功',
            url : '/admin/content'
        });
    });
});


/*
* 内容编辑
* */
router.get('/content/edit',function(req,res){
    let id = req.query.id || '';
    let categories = [];
    Category.find().then(function(result){
        categories = result;
        return Content.findOne({_id : id}).populate('category');
    }).then(function(content){
        res.render('admin/markdown_edit.html',{
            categories : categories,
            userInfo : req.userInfo,
            content : content
        });
    });

});

/*
* 内容编辑提交
* */
router.post('/content/edit',function(req,res,next){
    let id = req.query.id;
    let {category,title,description,content,html,guideMap} = req.body;

    if(category == ''){
        return res.render('admin/error.html',{
            userInfo : req.userInfo,
            error : '请选择栏目'
        });
    }
    if(title == ''){
        return res.render('admin/error.html',{
            userInfo : req.userInfo,
            error : '先填写文章标题'
        });
    }

    if(!description){
        description = content.slice(0,200);
    }

    Content.update({_id : id},{
        category : category,
        title : title,
        guideMap : guideMap,
        description : description,
        html : html,
        content : content
    }).then(function(data){
        return res.render('admin/success.html',{
            userInfo : req.userInfo,
            success : '文章修改成功',
            url : '/admin/content/edit?id=' + id
        });
    });
});

/*
* 内容删除
* */

router.get('/content/delete',function(req,res,next){
    let id = req.query.id;
    Content.remove({_id : id}).then(function () {
        return res.render('admin/success.html',{
            userInfo : req.userInfo,
            success : '文章删除成功',
            url : '/admin/content'
        });
    });
});

/*
 * markdown 编辑页面
 * */

router.get('/markdown/edit',function(req,res,next){
        return res.render('admin/markdown.html');
});



module.exports = router;
