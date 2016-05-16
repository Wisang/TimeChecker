var env    = require('./constant');
var socket = require('socket.io-client')();

socket.on(env.TIMESTAMP, function(date) {
  console.log(date);
  showCurrentTime(date);
});

var showCurrentTime = function() {
  const clock = document.getElementById("clock");
  var clockTimeoutId;
  return function(date) {
    var now = new Date(date);
    const currentTime = now.getFullYear() + " " + (now.getMonth()+1) + " " + now.getDate() + " " + now.getHours() + " " + now.getMinutes() + " " + now.getSeconds() + " ";

    clock.innerHTML = currentTime;

    const interval = 1000 - now.getMilliseconds();
    now.setMilliseconds(1000);
    clearTimeout(clockTimeoutId);
    clockTimeoutId = setTimeout(showCurrentTime.bind(null, now.getTime()), interval);
  };
}();

window.onload = function() {
  const checkInButton = document.getElementById("btn-check-in");
  checkInButton.onclick = checkIn;
  const checkOutButton = document.getElementById("btn-check-out");
  checkOutButton.onclick = checkOut;
}

function checkIn() {
  socket.emit(env.CHECK_IN, 'check-in');
  socket.once(env.TIMESTAMP, printCurrentTime.bind(null, 'check_in'));
}

function checkOut() {
  socket.emit(env.CHECK_OUT, 'check-out');
  socket.once(env.TIMESTAMP, printCurrentTime.bind(null, 'check_out'));
}

function printCurrentTime(element, date) {
  var now = new Date(date);
  var timeElement = document.getElementById(element);
  var currentTime = now.getFullYear() + " " + (now.getMonth()+1) + " " + now.getDate() + " " + now.getHours() + " " + now.getMinutes() + " " + now.getSeconds() + " ";

  timeElement.innerHTML = currentTime;
}
