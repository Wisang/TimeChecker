var env  = require('./constant');
var app  = require('express')();
var hbs  = require('express-handlebars');
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var webpack              = require('webpack');
var webpackConfig        = require('../webpack.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: '/dist'
}));
app.use(webpackHotMiddleware(compiler));

app.set('views', 'app/views');
app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: "app/views/layouts/"
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('home');
});

io.on('connection', function(socket) {
  console.log('a user connected', socket.id);
  socket.emit(env.TIMESTAMP, Date.now());

  socket.on(env.CHECK_IN, function(msg) {
    console.log(env.CHECK_IN, socket.id, msg);
    socket.emit(env.TIMESTAMP, Date.now());
  });

  socket.on(env.CHECK_OUT, function(msg) {
    console.log(env.CHECK_OUT, socket.id, msg);
    socket.emit(env.TIMESTAMP, Date.now());
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('Listening on port 3000.');
});
