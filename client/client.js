var socket = io('http://localhost:3000');
socket.on('connect', function () {
  console.log('connected');
});

socket.on('update', function (data) {
  console.log(data);
});

function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  socket.emit('login', username, password, function (err, result) {
    if(err) { console.error(err); }
    else { console.log(result); }
  });

  return false;
}