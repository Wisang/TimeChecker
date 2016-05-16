var env  = require('./constant');
var app  = require('express')();
var hbs  = require('express-handlebars');
var http = require('http').Server(app);
var io   = require('socket.io')(http);

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
  socket.emit(env.TIMESTAMP_EVENT, new Date());
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('Listening on port 3000.');
});
