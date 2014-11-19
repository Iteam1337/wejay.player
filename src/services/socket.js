angular.module('wejay.player').service('socket', function () {
  
  var socket = io('http://localhost:3000');

  socket.on('connect', function () {
    console.log('connected');
  });

  return socket;
});