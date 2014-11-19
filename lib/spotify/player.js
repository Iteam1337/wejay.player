var EventEmitter = require('events').EventEmitter;

function Player(spotify) {
  EventEmitter.call(this);

  this.spotify = spotify;
  this.playing = false;
}
Player.prototype = Object.create(EventEmitter.prototype);
Player.prototype.constructor = Player;

Player.prototype.play = function (uri) {
  if(uri) {
    this.currentTrack = this.spotify.createFromLink(uri);
  }
  this.spotify.player.play(this.currentTrack);
  this.playing = true;
  this.lastElapsed = -1;
  this.emit('play', this.currentTrack);
  this.checkProgress();
};

Player.prototype.checkProgress = function() {
  clearTimeout(this.progressTimeout);
  var elapsed = this.spotify.player.currentSecond;
  if(elapsed !== this.lastElapsed) {
    this.emit('progress', {
      elapsed: elapsed,
      duration: this.currentTrack.duration
    });
    this.lastElapsed = elapsed;
  }
  if(this.playing) {
    this.progressTimeout = setTimeout(this.checkProgress.bind(this), 100);
  }
};

module.exports = Player;