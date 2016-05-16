var env    = require('./constant');
var socket = require('socket.io-client')();

socket.on(env.TIMESTAMP_EVENT, function(msg) {
  console.log(msg);
  socket.emit('client hello', { msg: 'hello world '});
});

function showCurrentTime() {
  var clock = document.getElementById("clock");
  var now = new Date();//
  var currentTime = now.getFullYear() + " " + (now.getMonth()+1) + " " + now.getDate() + " " + now.getHours() + " " + now.getMinutes() + " " + now.getSeconds() + " ";

  clock.innerHTML = currentTime;
  setTimeout(showCurrentTime,1000);
}

window.onload = function() {
  showCurrentTime();
  const checkInButton = document.getElementById("btn-check-in");
  checkInButton.onclick = printCurrentTime.bind(null, 'check_in');
  const checkOutButton = document.getElementById("btn-check-out");
  checkOutButton.onclick = printCurrentTime.bind(null, 'check_out');
}

function printCurrentTime(element) {
  var now = new Date();
  var timeElement = document.getElementById(element);
  var currentTime = now.getFullYear() + " " + (now.getMonth()+1) + " " + now.getDate() + " " + now.getHours() + " " + now.getMinutes() + " " + now.getSeconds() + " ";

  timeElement.innerHTML = currentTime;
}
