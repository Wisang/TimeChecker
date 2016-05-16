var env    = require('./constant');
var socket = require('socket.io-client')();

socket.on(env.TIMESTAMP_EVENT, function(msg) {
  console.log(msg);
  socket.emit('client hello', { msg: 'hello world '});
});
