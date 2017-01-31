/**
 * Created by caozhihui on 2017/1/30.
 */
let mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    title : String,
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    content : {
        type : String,
        default : ''
    },
    description : {
        type : String,
        default : ''
    },
    views : {
        type : Number,
        default : 0
    },
    addTime : {
        type : Date,
        default : new Date()
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    showTime : {
        type : String,
        default : new Date()
    },
    comment : {
        type : Array,
        default : []
    }
});
