var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://stanley:stanley@ds029426.mlab.com:29426/portfolio');
module.exports = {mongoose};
