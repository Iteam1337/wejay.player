(function () {

  var tracks = {};

  var socket = io('http://localhost:3000');
  socket.on('connect', function () {
    console.log('connected');
  });

  socket.on('update', function (data) {
    console.log(data);
  });

  $('.login').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();

    socket.emit('login', username, password, function (err, result) {
      if(err) { console.error(err); }
      else { console.log(result); }
    });

    return false;
  });

  $('button.search').click(function () {

    var q = encodeURI($('input.search').val().replace(' ', '+'));

    socket.emit('search', q, function (err, result) {
      console.log('search callback');
      if(err) { 
        console.log(err);
      }
      console.log('result', result);
      
    });

  //   $.get('https://api.spotify.com/v1/search?type=track&q=' + q)
  //     .then(function (result) {
  //       console.log(result);

  //       var html = result.tracks.items.map(function (track) {
  //         tracks[track.id] = track;
  //         return '<li><a href="#" class="track" data-id="' + track.id + '">' +
  //           track.name + ' (' + track.artists[0].name +
  //           ')</a></li>';
  //       });
  //       $('.searchresults').html(html);

  //       $('.track').click(function () {
  //         var track = tracks[$(this).data('id')];
  //         socket.emit('play', track);
  //       });
  //     });
  });

})();