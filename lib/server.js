var spotify = require('./spotify').getInstance(),
  io = require('socket.io')(3000),
  util = require('util'),
  _ = require('lodash');

console.log('test');

io.on('connect', function (socket) {
  console.log('Houston, we have connection');

  socket.on('login', function (username, password, callback) {
    spotify.login(username, password)
      .then(callback.bind(null, null, 'Welcome'))
      .catch(callback.bind(null, 'Wrong username or password'));
  });

  socket.on('play', function (uri, callback) {
    spotify.play(uri);
  });
  socket.on('search', function (query, callback) {
    spotify.search(query)
      .then(function(searchResult) {
        console.log('totalTracks', searchResult ? searchResult.totalTracks : 0);
        callback(null, searchResult);
      })
      .catch(function(err) {
        console.log('error occured in search');
        callback('error occured');
      });
  });
  spotify.on('metadata', function () {
    socket.emit('update', util.inspect(spotify.app, { depth: 3 }));
  });
});

module.exports = io;