/**
 * Created by caozhihui on 2017/1/24.
 */

let express = require('express');

let bodyParser = require('body-parser');

let mongoose = require('mongoose');

//设置COOKIES
let Cookies = require('cookies');

let path = require('path');

let app = express();

let ejs = require('ejs');

let User = require('./models/User');




//设置模板引擎
app.engine('html',ejs.renderFile);
//设置模板路径 第一个一定要是views
app.set('views','./views');
// 第一个参数必须是engine html 第二个参数是 设置模板引擎的方法名字 ；
app.set('engine html','html');

//设置bodyParser

app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
    req.cookies = new Cookies(req,res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            User.findById(req.userInfo._id).then(function(result){
                let isAdmin = Boolean(result.isAdmin);
                if(isAdmin){
                    req.userInfo.isAdmin = result.isAdmin;
                }
                next();
            });
        }catch (e){
            next();
        }
    }else {
        next();
    }
});

//静态文件的设置
app.use(express.static(path.join(__dirname,'public')));

let admin = require('./routers/admin');
let api = require('./routers/api');
let main = require('./routers/main');

app.use('/admin',admin);
app.use('/api',api);
app.use('/',main)

/*mongoose.connect('mongodb://root:a2153218@120.24.169.84:27017/blog',{auth: {authdb: "admin"}},(err)=>{
    console.log(err ? '数据库连接失败' : "数据库连接成功");
    if(!err){
        app.listen('8081');
    }

});*/
mongoose.connect('mongodb://localhost:27017/blog',(err)=>{
    console.log(err ? '数据库连接失败' : "数据库连接成功");
    if(!err){
        app.listen('8081');
    }

});
