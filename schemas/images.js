let mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    name : String,
    rename : String,
    postTime : {
        type : Date,
        default : new Date()
    },
    showTime : {
        type : String,
        default : new Date()
    }
});