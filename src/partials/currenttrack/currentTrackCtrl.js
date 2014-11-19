angular.module('wejay.player').controller('CurrentTrackCtrl', function ($scope, socket) {
  $scope.playing = false;

  socket.on('play', function (track) {
    $scope.playing = true;
    track.artist = track.artists.map(function (artist) { return artist.name; }).join(', ');
    track.image = track.album.images[1].url;
    $scope.track = track;
    $scope.safeApply();
  });

  socket.on('progress', function (progress) {
    $scope.progress = progress;
    $scope.safeApply();
  });

  socket.on('pause', function () {
    $scope.playing = false;
  });

  this.play = function () {
    socket.emit('play');
  };
  this.pause = function () {
    socket.emit('pause');
  };
});