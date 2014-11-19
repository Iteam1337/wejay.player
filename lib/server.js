var spotify = require('./spotify').getInstance(),
  io = require('socket.io')(3000),
  util = require('util'),
  _ = require('lodash');

console.log('test');

io.on('connect', function (socket) {
  console.log('Houston, we have connection');

  socket.on('login', function (username, password, callback) {
    console.log('login', arguments);
    spotify.login(username, password)
      .then(callback.bind(null, null, 'Welcome'))
      .catch(callback.bind(null, 'Wrong username or password'));
  });

  socket.on('play', function (uri, callback) {
    spotify.player.play(uri);
  });
  socket.on('search', function (query, callback) {
    spotify.search(query)
      .then(function(searchResult) {
        callback.bind(null, null, 'searchResult');
      })
      .catch(function(err) {
        callback.bind(null, 'error occured', err);
      });
  });
  spotify.on('metadata', function () {
    socket.emit('update', util.inspect(spotify.app, { depth: 3 }));
  });
  spotify.player.on('play', function (track) { socket.emit('play', track); });
  spotify.player.on('progress', function (progress) { socket.emit('progress', progress); });
  spotify.player.on('pause', function () { socket.emit('pause'); });
  spotify.player.on('trackEnd', function () { socket.emit('trackEnd'); });
});

module.exports = io;