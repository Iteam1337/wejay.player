var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonPromise = require('sinon-promise'),
  proxyquire = require('proxyquire');

chai.use(require('sinon-chai'));

describe('/spotify', function () {

  var spotify, nodeSpotify, nodeSpotifyApp;

  beforeEach(function () {
    nodeSpotifyApp = {
      on: sinon.stub(),
      login: sinon.stub()
    };
    nodeSpotify = sinon.stub().returns(nodeSpotifyApp);

    spotify = proxyquire(process.cwd() + '/lib/spotify', {
      'node-spotify': nodeSpotify,
      'q': sinonPromise.Q
    });
  });

  describe('.Spotify', function () {
    it('returns a funciton reference', function () {
      expect(spotify.Spotify).to.be.a('function');
    });
    it('calls node-spotify with a reference to the app key', function () {
      var app = new spotify.Spotify();
      expect(app).to.be.instanceof(spotify.Spotify);
      expect(nodeSpotify).calledWith({appkeyFile:process.cwd() + '/spotify_appkey.key'});
    });
  });
  describe('.getInstance', function () {
    it('returns the same instance every time', function () {
      var sp1 = spotify.getInstance();
      var sp2 = spotify.getInstance();
      expect(nodeSpotify).calledOnce;
      expect(sp1).to.equal(sp2);
    });
  });
  describe('authenticate', function () {
    var app, listeners, success, fail;
    beforeEach(function () {
      app = new spotify.Spotify();
      listeners = nodeSpotifyApp.on.firstCall.args[0];

      success = sinon.spy();
      fail = sinon.spy();
      app.authenticate('foo', 'bar').then(success).catch(fail);
    });
    it('calls nodeSpotifyApp.login with username and password', function () {
      expect(nodeSpotifyApp.login).calledOnce.calledWith('foo', 'bar');
    });
    it('resolves the promise onReady', function () {
      listeners.ready();
      expect(success, 'success').calledOnce;
      expect(fail, 'fail').not.called;
    });
    it('rejects the promise onLogout', function () {
      listeners.logout();
      expect(success, 'success').not.called;
      expect(fail, 'fail').calledOnce;
    });
    it('returns the same promise if several logins before answer', function () {
      var success2 = sinon.spy();
      var fail2 = sinon.spy();
      app.authenticate('foo', 'bar').then(success2).catch(fail2);
      expect(nodeSpotifyApp.login).calledOnce;
      listeners.ready();
      expect(success).calledOnce;
      expect(success2).calledOnce;
      expect(fail).not.called;
      expect(fail2).not.called;
    });
    it('returns a fulfilling promise if login is done', function (done) {
      listeners.ready();
      expect(success).calledOnce;
      var success2 = sinon.spy();
      var fail2 = sinon.spy();
      app.authenticate('foo', 'bar').then(success2).catch(fail2);
      setTimeout(function () {
        expect(success2).calledOnce;
        expect(fail2).not.called;
        done();
      }, 0);
    });
    it('does not reject the promise on logout if login is finished', function () {
      listeners.ready();
      expect(success).calledOnce;
      listeners.logout();
      expect(fail).not.called;
    });
    it('emits a logout event if logout is called after login is finished', function () {
      var listener = sinon.spy();
      app.on('logout', listener);
      listeners.ready();
      listeners.logout();
      expect(listener).calledOnce;
    });
  });
});