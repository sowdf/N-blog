/**
 * Created by caozhihui on 2017/1/28.
 */
let mongoose = require('mongoose');
let categoriesSchemas = require('../schemas/categories');

module.exports = mongoose.model('Category',categoriesSchemas);
