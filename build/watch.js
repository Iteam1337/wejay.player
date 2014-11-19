var gulp = require('gulp'),
  livereload = require('gulp-livereload');

module.exports = function () {
  livereload.listen();

  gulp.watch(['src/**/*.js', 'test/client/**/*.js', '!src/templates.js'], ['test:client']).on('change', livereload.changed);
  gulp.watch(['test/**/*.html'], ['test']).on('change', livereload.changed);
  gulp.watch(['src/**/*.html', 'src/css/main.css', 'src/templates.js', 'src/images/**/']).on('change', livereload.changed);
  gulp.watch(['src/**/*.less'], ['less']);


  gulp.watch(['lib/**/*.js', 'test/server/**/*.js'], ['test:server']);
};