describe('/services/socket', function () {

  var socket;

  beforeEach(function () {
    module('wejay.player');
    inject(function (_socket_) {
      socket = _socket_;
    });
  });

  xit('should have tests', function () {
    //expect(socket.doSomething()).to.equal('something');
  });

});