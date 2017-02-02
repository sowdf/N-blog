/**
 * Created by caozhihui on 2017/1/24.
 */

let express = require('express');
let router = express.Router();
let User = require('../models/User');
let Category = require('../models/Category');
let Content = require('../models/Content');
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
    let userInfo = req.userInfo._id;
    if(!userInfo){
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

module.exports = router;
