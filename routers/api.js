/**
 * Created by caozhihui on 2017/1/24.
 */

let express = require('express');
let router = express.Router();
let User = require('../models/User');
let Category = require('../models/Category');
let Content = require('../models/Content');
let Image = require('../models/Image');
let markdown = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});
let md5 = require('md5');
let multer = require('multer');

let moment = require('moment');

let responseData = {};



//初始化返回信息

router.use(function(req,res,next){
    responseData = {
        code : 0,
        message : ''
    };
    next();
});


let storage = multer.diskStorage({
    destination: function (req, file, cb){
        if(!file.originalname){
            return false;
        }
        cb(null, './public/articalImage')
    },
    filename: function (req, file, cb){
        if(!file.originalname){
            return false;
        }
        let fileName = file.originalname;
        let arr =fileName.split('.');
        let md5Rename = md5(file);

        new Image({
            name : file.originalname,
            rename : md5Rename + '.' + arr[arr.length - 1]
        }).save().then(function(newImage){
        });
        file.originalname = md5Rename + '.' + arr[arr.length - 1];
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage: storage
});

/*
* 用户注册
*
*   注册逻辑
*       1.用户名不能为空
*       2.密码不能为空
*       3.两次密码是否一致
*       4.用户名是否被注册
* */
router.post('/user/register',(req,res,next)=>{

    let {username,password,repassword} = req.body;
    //用户名不能为空
    if(username == ''){
        responseData.code = 1 ;
        responseData.message = '用户名不能为空';
        return res.json(responseData);
    }
    //密码不能为空
    if(password == '' ||repassword == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        return res.json(responseData);
    }
    //两次输入密码必须一致
    if(password != repassword){
        responseData.code = 3;
        responseData.message = '两次输入密码不能为空';
        return res.json(responseData);
    }

    User.findOne({
        username : username
    }).then(function(userInfo){
        if(userInfo){
            responseData.code = 4;
            responseData.message = '该用户名以被注册！';
            return res.json(responseData);
        }
        let user = new User({
            username : username,
            password : password
        });
        return user.save();
    }).then(function(newInfo){
        responseData.message = '注册成功';
        res.json(responseData);
    });



});


/*
* 登录接口
* */
router.post('/user/login',(req,res,next)=>{
    let {username,password} = req.body;
    //校验账号密码不能为空
    if(username == '' || password== ''){
        responseData.code = 1;
        responseData.message = '账号和密码不能为空';
        return res.json(responseData);
    }

    //去数据库查询 username password  如果存在 标示登录成功

    User.findOne({
        username : username,
        password : password
    }).then((userInfo)=>{
        if(!userInfo){
            responseData.code = 2;
            responseData.message = '账号或者密码有误！';
            return res.json(responseData);
        }
        responseData.message = '登录成功';
        responseData.result = {
            username : userInfo.username,
            _id : userInfo._id
        };
        req.cookies.set('userInfo',JSON.stringify(responseData.result));
        return res.json(responseData);
    });

});

/* 获取userinfo
* */

router.get('/user/userInfo',(req,res,next)=>{
    let userInfo = req.userInfo;
    if(!userInfo._id){
        responseData.code = 2;
        responseData.message = '您还没有登录！';
        return res.json(responseData);
    }
    responseData.result = userInfo;
    res.json(responseData);

});

/*
* 退出登录
* */
router.get('/user/logout',(req,res,next)=>{
    req.cookies.set('userInfo',null);
    responseData.code = 0;
    responseData.message = '退出成功';
    return res.json(responseData);
});

/*
* 获取栏目接口
*
* */

router.get('/category',function(req,res,next){
    Category.find().then(function(categories){
        responseData.result = categories;
        res.json(responseData);
    });
});


/*
* 评论接口
* */
router.post('/comment/post',function (req,res,next) {
    if(!req.userInfo._id){
        responseData.code = 1;
        responseData.message = '您尚未登录~~';
        return res.json(responseData);
    }
    let contentId = req.body.contentId || '';
    let comment = req.body.comment || '';
    let commentDate = {
        content : comment,
        postTime : new Date(),
        showTime : moment(new Date()).format("YYYY年MM月DD日, HH:mm:ss"),
        username : req.userInfo.username
    };
    Content.findOne({_id:contentId}).then(function(content){
        content.comment.push(commentDate);
        return content.save();
    }).then(function(newContent){
        responseData.result = newContent;
        responseData.message = '留言成功~~';
        res.json(responseData);
    });

});


/*
* 获取评论接口
* */

router.get('/comment',function(req,res,next){
    let contentId = req.query.contentId;
    Content.findOne({_id : contentId}).then(function(content){
        responseData.message = '获取评论成功！';
        responseData.result = content;
        res.json(responseData);
    });
});

router.post('/upload/post',upload.single('file'), function (req, res) {
    if(!req.file){
        responseData.code = 1;
        responseData.message = '请选择文件~！';
        return res.json(responseData);
    }
    responseData.url = 'http://'+req.headers.host+'/articalImage/' + req.file.originalname;
    responseData.message = '上传成功~';
    res.json(responseData);
});


/* 获取文章列表 */

let data = {};
router.get('/article-list',(req,res,next)=>{
    data.category = req.query.category || '';
    data.contents = [];
    data.page =  Number(req.query.page || 1);
    data.datapages = 0;
    data.limit = 5;
    data.count = 0;

    let where = {};

    if(data.category){
        where.category = data.category;
    }


    Content.where(where).count().then(function(count){
        data.count = count;
        data.pages = Math.ceil(count / data.limit);
        //page 处理 最小不能小于1 最大不能 大过pages
        data.page = Math.min(data.page,data.pages);

        data.page = Math.max(1,data.page);


        let skip = (data.page - 1) * data.limit;

        data.limit = data.limit > count ? count : data.limit;

        //查询多少条  跳过多少条
        Content.where(where).find().sort({_id:-1}).limit(data.limit).skip(skip).populate(['category','user']).then(function(contents){
            if(contents.length > 0 ){
                contents.forEach((item,index)=>{
                    contents[index].description = markdown.render(item.description || '');
                })
            }
            data.contents = contents;
            responseData.code = 100;
            responseData.result = data;
            responseData.message = '查询成功';
            res.json(data);
        });
    });
});

/*
 * 详情页
 * */
router.get('/article-view',function(req,res,next){
    let id = req.query.actId;
    Content.findOne({_id:id}).populate('user').then(function(content){
        content.views++;
        return content.save();

    }).then(function(content){
        content.content = markdown.render(content.content);
        data.content = content;
        responseData.code = 100;
        responseData.result = data;
        responseData.message = '查询成功';
        res.json(data);
    });
});


module.exports = router;
