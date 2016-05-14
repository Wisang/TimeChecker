var Express = require('express');

var app = new Express;

app.get('/', function(req, res) {
  console.log(req);
  res.send('Hello world');
});

app.listen(3000);
