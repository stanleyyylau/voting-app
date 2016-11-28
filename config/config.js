var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}else{
  process.env.MONGODB_URI = 'mongodb://stanley:stanley@ds029426.mlab.com:29426/portfolio';
  process.env.JWT_SECRET = 'pojiaj234oi234oij234oij4';

}
