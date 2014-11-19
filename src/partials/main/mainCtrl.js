angular.module('wejay.player').controller('MainCtrl', function ($scope, $http) {
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
        console.log(data);
      });
  };

});