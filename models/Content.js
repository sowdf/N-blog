/**
 * Created by caozhihui on 2017/1/30.
 */
let mongoose = require('mongoose');
let contentsSchames = require('../schemas/contents');

module.exports = mongoose.model('Content',contentsSchames);
