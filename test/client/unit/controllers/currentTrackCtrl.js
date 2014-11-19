describe('/partials/currenttrack/CurrentTrackCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('wejay.player');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('CurrentTrackCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});