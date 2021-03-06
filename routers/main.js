/**
 * Created by caozhihui on 2017/1/24.
 */

let express = require('express');
let markdown  = require('markdown').markdown;
let Content = require('../models/Content');
let Category = require('../models/Category');
let router = express.Router();

let data = {};

router.use(function(req,res,next){
    Category.find().then(function(categories){
        data.categories = categories;
        next();
    });
});

router.get('/',(req,res,next)=>{
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
          /*  if(contents.length > 0 ){
                contents.forEach((item,index)=>{
                    contents[index].description = markdown.toHTML(item.description);
                })
            }*/
            data.contents = contents;
            res.render('main/index.html',data);
        });
    });
});

/*
* 详情页
* */
router.get('/view',function(req,res,next){
    let id = req.query.contentId;
    Content.findOne({_id:id}).populate('user').then(function(content){
        content.views++;
        return content.save();

    }).then(function(content){
        content.content = markdown.toHTML(content.content);
        data.content = content;
        res.render('main/view.html',data);
    });
});

/*
 * admin 登录
 * */
router.get('/login',function(req,res,next){
    res.render('admin/login.html');
});



module.exports = router;
