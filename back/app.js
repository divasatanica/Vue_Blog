const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const index = require('./routes/index');
const upload = require('./routes/upload');
const article = require('./routes/article');
const login = require('./routes/login');
const test = require('./routes/test');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

const whitelist = [undefined, 'http://localhost:8080', 'http://comacc.top', 'http://localhost:3000'];
const corsOptions = {
	origin: (origin, callback) => {
		 if (whitelist.indexOf(origin) !== -1) {
	      callback(null, true)
	    } else {
	    	console.log(origin);
	      callback(new Error('Not allowed by CORS'))
	    }
	},
	optionsSuccessStatus: 200,
	credentials: true
}
app.use(cors(corsOptions));
app.options('*', cors({
	origin: (origin, callback) => {
		 if (whitelist.indexOf(origin) !== -1) {
	      callback(null, true)
	    } else {
	    	console.log(origin);
	      callback(new Error('Not allowed by CORS'))
	    }
	},
	optionsSuccessStatus: 200,
	credentials: true
}));


app.use('/index', index);
app.use('/upload', upload);
app.use('/article', article);  
app.use('/login', login);
app.use('/ng', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.sendfile('public/ng.html');
})
app.get('/*', (req, res) => {
	res.sendfile("public/index.html");
})
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(err){
    throw err;
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
