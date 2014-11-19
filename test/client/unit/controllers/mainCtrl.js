var io;

describe('/partials/main/MainCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('wejay.player');

    io = sinon.stub().returns({
      on: sinon.spy(),
      emit: sinon.spy()
    });

    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {$scope: scope});
    });
  });

  describe("#login", function() {
    it("should be a function", function() {
      expect(scope.login).to.be.a('function');
    });

    it("should emit a login message to socket", function() {
      scope.login();

      console.log(io);

      expect(io.defaultBehavior.returnValue.emit).calledOnce.and.calledWith('login');
    });
  });

  describe("#search", function() {
    it("should be a function", function() {
      expect(scope.search).to.be.a('function');
    });
  });
});