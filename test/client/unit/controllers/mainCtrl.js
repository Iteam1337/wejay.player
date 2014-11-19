var io;

describe('/partials/main/MainCtrl', function () {

  var scope, ctrl, httpBackend;

  beforeEach(function () {
    module('wejay.player');

    io = sinon.stub().returns({
      on: sinon.spy(),
      emit: sinon.spy()
    });

    inject(function ($rootScope, $controller, $httpBackend) {
      scope = $rootScope.$new();

      httpBackend = $httpBackend;

      ctrl = $controller('MainCtrl', {$scope: scope});
    });
  });

  describe('#login', function() {
    it('should be a function', function() {
      expect(scope.login).to.be.a('function');
    });

    it('should emit a login message to socket', function() {
      scope.login();

      console.log(io);

      expect(io.defaultBehavior.returnValue.emit).calledOnce.and.calledWith('login');
    });
  });

  describe('#search', function() {
    it('should be a function', function() {
      expect(scope.search).to.be.a('function');
    });

    it.skip('should get the results of the given query', function() {
      scope.query = 'metallica';

      scope.search();

      var tracks = { tracks: { items: [ { preview_url: 'http://test.hej' } ] } };

      httpBackend
        .expectGET('https://api.spotify.com/v1/search?type=track&q=metallica')
        .respond(200, tracks);

      httpBackend.flush();

      expect(scope.tracks).to.be.an('object');
    });
  });
});