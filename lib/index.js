var dotenv = require('dotenv'),
  spotify = require('./spotify'),
  app = spotify.getInstance();

dotenv.load();

app
  .authenticate(process.env.SPOTIFY_USERNAME, process.env.SPOTIFY_PASSWORD)
  .then(function () { console.log('logged in'); })
  .catch(function () { console.log('not logged in'); });