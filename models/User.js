let mongoose = require('mongoose');
let usersSchemas = require('../schemas/users');

module.exports = mongoose.model('User',usersSchemas);