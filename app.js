var createError = require('http-errors');
var history = require('connect-history-api-fallback');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var logger = require('morgan');
var stylus = require('stylus');
var multer = require('multer');

var indexRouter = require('./routes/index');
var communityRouter = require('./routes/community');
var discoverRouter = require('./routes/discover');
var mineRouter = require('./routes/mine');

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization,Content-Type,X-Requested-With");
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(history());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(multer({dest:'./upload/images'}).any()); // 文件上传
app.use(passport.initialize());//初始化n
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('upload'));

app.use('/', indexRouter); //sport运动
app.use('/community',communityRouter); //社区
app.use('/discover',discoverRouter); //发现
app.use('/mine',mineRouter); //我的

//passport --
require('./config/passport')(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
