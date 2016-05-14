var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.set('views', 'app/views');
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: "app/views/layouts/"
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('home');
});

app.listen(3000);
