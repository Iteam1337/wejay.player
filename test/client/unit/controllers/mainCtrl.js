describe('/partials/main/MainCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('wejay.player');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});