angular.module('wejay.player').controller('MainCtrl', function ($scope, $http, $sce) {
  var socket = io('http://localhost:3000');

  socket.on('connect', function () {
    console.log('connected');
  });

  $scope.login = function () {
    socket.emit('login', $scope.username, $scope.password, function (err, result) {
      if (err) {
        console.error(err);
      }
      else {
        console.log(result);
        $scope.isLoggedIn = true;
      }
    });
  };

  $scope.search = function () {
    var url = 'https://api.spotify.com/v1/search?type=track&q=' + $scope.query;

    $http
      .get(url)
      .success(function (data) {
        var tracks = {};

        data.tracks.items.map(function (track) {
          track.preview_url = $sce.trustAsResourceUrl(track.preview_url);

          tracks[track.id] = track;
        });

        $scope.tracks = tracks;
      });
  };

  $scope.play = function (track) {
    socket.emit('play', track.uri, function (err, result) {
      if(err) { console.error(err); }
      else { console.log(result); }
    });
  };

  $scope.preview = function (id) {
    var audio = document.getElementById('audio');
    if (audio) {
      audio.outerHTML = '';
    }

    var audio = document.createElement('audio');
    audio.setAttribute('id', 'audio');
    audio.src = $scope.tracks[id].preview_url;

    document.body.appendChild(audio);

    document.getElementById('audio').play();
  };

});