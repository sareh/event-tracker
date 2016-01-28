var express        = require('express');
var mongoose       = require('mongoose');
var config         = require('./config/config');
var secret         = config.secret;
var methodOverride = require('method-override');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var morgan         = require('morgan');
var cors           = require('cors');
var path           = require('path');
var passport       = require('passport');
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var routes         = require('./config/routes');
var port           = process.env.PORT || 3000;
var app            = express();

mongoose.connect(config.database);
require('./config/passport')(passport);

app.use(methodOverride(function(req, res){
  if(req.body && typeof(req.body) === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(bodyParser(json()));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/',             methods: ['GET']},
      { url: '/api/register', methods: ['POST']},
      { url: '/api/login',    methods: ['POST']}
    ]
  }));

app.use(function(err, req, res, next){
  if(err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized Request.'});
  }
  next();
});

app.use('/api', routes);
app.use(express.static.public);
app.get('/', function(req, res){
  res.sendFile(__dirname + 'index.html');
});

server.listen(port);
console.log('App is running on port ' + port);