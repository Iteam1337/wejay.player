var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  proxyquire = require('proxyquire');

chai.use(require('sinon-chai'));

describe('spotify/player', function () {
  var Player, player, spotify, track, clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
    track = {
      duration: 300
    };
    spotify = {
      createFromLink: sinon.stub().returns(track),
      player: {
        play: sinon.stub(),
        currentSecond: 0
      }
    };
    Player = proxyquire(process.cwd() + '/lib/spotify/player', {
    });
    player = new Player(spotify);
  });
  afterEach(function () {
    clock.restore();
  });

  describe('play', function () {
    it('calls spotify.createFromLink with the passed in uri', function () {
      player.play('foo');
      expect(spotify.createFromLink).calledOnce.calledWith('foo');
    });
    it('calls spotify.play with track', function () {
      player.play('foo');
      expect(spotify.player.play).calledOnce.calledWith(track);
    });
    it('sets playing to true', function () {
      player.play('foo');
      expect(player.playing).to.be.true;
    });
    it('plays currentTrack if it exists and no uri is passed in', function () {
      player.currentTrack = track;
      player.play();
      expect(spotify.createFromLink).not.called;
      expect(spotify.player.play).calledOnce.calledWith(track);
    });
    it('emits play event with the current track', function () {
      var listener = sinon.spy();
      player.on('play', listener);
      player.play('foo');
      expect(listener).calledOnce.calledWith(track);
    });
    it('emits progress events', function () {
      var listener = sinon.spy();
      player.on('progress', listener);
      player.play('foo');
      expect(listener).calledOnce.calledWith({elapsed:0, duration: 300});
      spotify.player.currentSecond = 0;
      clock.tick(100);
      expect(listener).calledOnce;
      spotify.player.currentSecond = 1;
      clock.tick(100);
      expect(listener).calledTwice.calledWith({elapsed:1, duration: 300});
    });
  });
});