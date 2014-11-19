var spotify = require('node-spotify'),
  Player = require('./spotify/player'),
  q = require('q'),
  EventEmitter = require('events').EventEmitter,
  request = require('request'),
  _ = require('lodash');

var instance;

function Spotify() {
  EventEmitter.call(this);
  _.bindAll(this);

  this.app = spotify({appkeyFile: process.cwd() + '/spotify_appkey.key'});
  this.app.on({
    ready: this._onReady,
    metadataUpdated: this._onMetadataupdated,
    logout: this._onLogout
  });

  this.player = new Player(this.app);
  this.loggedIn = false;
}
Spotify.prototype = Object.create(EventEmitter.prototype);
Spotify.prototype.constructor = Spotify;

Spotify.prototype.login = function(username, password, remember, useRemembered) {
  if(this._loginPromise) {
    return this._loginPromise.promise;
  } else if(this.loggedIn) {
    return q();
  }

  remember = !!remember;
  useRemembered = !!useRemembered;

  this._loginPromise = q.defer();
  this.app.login(username, password, remember, useRemembered);

  return this._loginPromise.promise;
};

Spotify.prototype.search = function(query) {
  var deferred = q.defer();

  console.log('search q', query);

  request.get('https://api.spotify.com/v1/search?type=track&q=' + query, function (err, response, body) {
    if(err) { deferred.reject(err); }
    else { deferred.resolve(JSON.parse(body).tracks); }
  });

  return deferred.promise;
};

// app level listeners
Spotify.prototype._onReady = function() {
  if(this._loginPromise) {
    this.loggedIn = true;
    this._loginPromise.resolve();
    delete this._loginPromise;
  }
  this.emit('login');
};

Spotify.prototype._onMetadataupdated = function() {
  console.log('playlistContainer', this.app.playlistContainer.isLoaded);
  console.log('sessionUser', this.app.sessionUser.isLoaded);
  console.log('sessionUser.starredPlaylist', this.app.sessionUser.starredPlaylist.isLoaded);
  console.log('sessionUser.playlistContainer', this.app.sessionUser.playlistContainer.isLoaded);
  console.log('----');

  console.log(this.app.playlistContainer);

  this.emit('metadata');
};

Spotify.prototype._onLogout = function() {
  this.loggedIn = false;
  if(this._loginPromise) {
    this._loginPromise.reject();
    delete this._loginPromise;
  } else {
    this.emit('logout');
  }
};

module.exports = {
  Spotify: Spotify,
  getInstance: function () {
    if(!instance) { instance = new Spotify(); }
    return instance;
  }
};