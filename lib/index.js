var http = require('http'),
  connect = require('connect'),
  serveStatic = require('serve-static'),
  spotify = require('./spotify').getInstance(),
  socketIo = require('socket.io'),
  util = require('util'),
  _ = require('lodash');

module.exports = function (cb) {
  var app = connect();
  var server = http.createServer(app);
  var io = socketIo(server);

  app.use(serveStatic('src', {'index': ['index.html']}));
  app.use(serveStatic('./', {}));

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
  
  server.listen(3000, cb);
};