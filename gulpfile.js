var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha'),
  plumber = require('gulp-plumber'),
  rimraf = require('gulp-rimraf'),
  runSequence = require('run-sequence');

gulp.task('generate', require('angular-generator').generate);
gulp.task('build', require('./build/build'));
gulp.task('test', require('./build/test'));
gulp.task('serve', require('./build/serve'));
gulp.task('watch', require('./build/watch'));

gulp.task('clean', function () {
  return gulp.src(['cache', 'settings'], { read: false })
    .pipe(rimraf());
});

gulp.task('default', ['test', 'watch']);