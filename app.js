var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
const registerApiRouter = require('./routes/api/register')
const verificationCode = require('./routes/api/verificationCode')
const authApiRouter = require('./routes/api/auth');
const publish = require('./routes/api/publish');
const need = require('./routes/api/need');
const supply = require('./routes/api/supply');
const follow = require('./routes/api/follow');
const userHomePage = require('./routes/api/userHomePage');
const letter = require('./routes/api/letter');
const comment = require('./routes/api/comment');
const shop = require('./routes/api/shop');
const pakages = require('./routes/api/pakages');
const rank = require('./routes/api/rank');
const exchange = require('./routes/api/exchange');
const myNeed = require('./routes/api/myNeed');
const mySupply = require('./routes/api/mySupply');
const myInformation = require('./routes/api/myInformation');

const hotSearch = require('./routes/api/hotSearch')



var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', authApiRouter);
app.use('/api', registerApiRouter);
app.use('/api', verificationCode);
app.use('/api', publish);
app.use('/api', need);
app.use('/api', supply);
app.use('/api', userHomePage);
app.use('/api', follow);
app.use('/api', letter);
app.use('/api', comment);
app.use('/api', shop);
app.use('/api', pakages);
app.use('/api', rank);
app.use('/api', exchange);
app.use('/api', myNeed);
app.use('/api', mySupply);
app.use('/api', myInformation);
app.use('/api', hotSearch);
const adminLogin = require('./routes/admin/auth');
const adminNeed = require('./routes/admin/need');
const adminSupply = require('./routes/admin/supply');
const adminShop = require('./routes/admin/shop');
const adminExchange = require('./routes/admin/exchange');

app.use('/admin', adminLogin);
app.use('/admin', adminNeed);
app.use('/admin', adminSupply);
app.use('/admin', adminShop);
app.use('/admin', adminExchange);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //响应 404 
  res.render('404');
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
