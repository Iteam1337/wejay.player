var gulp = require('gulp'),
  livereload = require('gulp-livereload');

module.exports = function () {
  livereload.listen();

  gulp.watch(['src/**/*.js', 'test/client/**/*.js', 'bower_components/**/*.js'], ['test:client']).on('change', livereload.changed);
  gulp.watch(['test/**/*.html'], ['mocha']).on('change', livereload.changed);
  gulp.watch(['src/**/*.html', 'src/**/*.less', 'src/images/**/']).on('change', livereload.changed);

  gulp.watch(['lib/**/*.js', 'test/server/**/*.js', 'node_modules/**/*.js'], ['test:server']);
};