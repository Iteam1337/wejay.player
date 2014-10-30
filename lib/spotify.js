var spotify = require('node-spotify'),
  q = require('q'),
  EventEmitter = require('events').EventEmitter;

var instance;

function Spotify() {
  EventEmitter.call(this);
  require('lodash.bindall')(this);

  this.app = spotify({appkeyFile: process.cwd() + '/spotify_appkey.key'});
  this.app.on({
    ready: this._onReady,
    metadataUpdated: this._onMetadataupdated,
    logout: this._onLogout
  });

  this.loggedIn = false;
}
Spotify.prototype = Object.create(EventEmitter.prototype);
Spotify.prototype.constructor = Spotify;

Spotify.prototype.authenticate = function(username, password, remember, useRemembered) {
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

// app level listeners
Spotify.prototype._onReady = function() {
  if(this._loginPromise) {
    this.loggedIn = true;
    this._loginPromise.resolve();
    delete this._loginPromise;
  }
};

Spotify.prototype._onMetadataupdated = function() {
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