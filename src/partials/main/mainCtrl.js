angular.module('wejay.player').controller('MainCtrl', function ($scope, $http, $sce, socket) {
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

    var query = $scope.query;
    socket.emit('search', query, function (err, result) {
      if(err) { 
        console.log(err);
      }
      console.log('result ' + query, result);

      $scope.tracks = result.items.map(function (track) {
        track.preview_url = $sce.trustAsResourceUrl(track.link);

        return track;
      });

      $scope.$apply();
    });
  };

  $scope.play = function (track) {
    socket.emit('play', track, function (err, result) {
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