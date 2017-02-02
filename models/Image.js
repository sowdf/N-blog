/**
 * Created by caozhihui on 2017/2/2.
 */
let mongoose = require('mongoose');
let imagesSchemas = require('../schemas/images');

module.exports = mongoose.model('Image',imagesSchemas);
