var spotify = require('./spotify').getInstance(),
  io = require('socket.io')(3000),
  util = require('util'),
  _ = require('lodash');

io.on('connect', function (socket) {
  console.log('Houston, we have connection');

  socket.on('login', function (username, password, callback) {
    console.log('login', arguments);
    spotify.login(username, password)
      .then(callback.bind(null, null, 'Welcome'))
      .catch(callback.bind(null, 'Wrong username or password'));
  });

  socket.on('play', function (track) {
    console.log('play');
    spotify.play(track);
  });

  spotify.on('metadata', function () {
    socket.emit('update', util.inspect(spotify.app, { depth: 3 }));
  });
});

module.exports = io;