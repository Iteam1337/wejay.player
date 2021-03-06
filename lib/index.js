var dotenv = require('dotenv'),
  spotify = require('./spotify'),
  app = spotify.getInstance();

dotenv.load();

function log(msg) {
  return function () { console.log(msg); }
}
function error(msg) {
  return function () { console.error(msg); }
}

console.log('before login process.env.SPOTIFY_USERNAME', process.env.SPOTIFY_USERNAME);

app
  .login(process.env.SPOTIFY_USERNAME, process.env.SPOTIFY_PASSWORD)
  .then(function () {
    console.log('and then');
    /*app.on('playlists', function () {
      console.log(app.playlists.map(function (pl) { return pl.name; }));
    });

    return app
      .loadPlaylists()
      .then(log('playlists loaded'))
      .catch(error('error loading playlists'));*/
  })
  .catch(error('not logged in'));