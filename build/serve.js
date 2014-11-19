var connect = require('connect'),
  serveStatic = require('serve-static');

module.exports = function (cb) {
  var app = connect();
  app.use(serveStatic('src', {'index': ['index.html']}));
  app.use(serveStatic('./', {}));
  app.listen(3000, cb);
};