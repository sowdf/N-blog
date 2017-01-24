/**
 * Created by caozhihui on 2017/1/24.
 */

let express = require('express');

let path = require('path');

let app = express();

let ejs = require('ejs');


//设置模板引擎
app.engine('html',ejs.renderFile);
//设置模板路径 第一个一定要是views
app.set('views','./views');
// 第一个参数必须是engine html 第二个参数是 设置模板引擎的方法名字 ；
app.set('engine html','html');

//静态文件的设置
app.use(express.static(path.join(__dirname,'public')));

let admin = require('./routers/admin');
let api = require('./routers/api');
let main = require('./routers/main');

app.use('/admin',admin);
app.use('/api',api);
app.use('/',main)



app.listen('8081');
