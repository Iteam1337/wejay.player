var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha'),
  plumber = require('gulp-plumber'),
  rimraf = require('gulp-rimraf'),
  runSequence = require('run-sequence');

gulp.task('jshint', function () {
  return gulp.src(['./**/*.js', '!./node_modules/**/*', '!./bower_components/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function () {
  return gulp.src('./test/unit/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('test', function () {
  return runSequence('jshint', 'mocha');
});

gulp.task('clean', function () {
  return gulp.src(['cache', 'settings'], { read: false })
    .pipe(rimraf());
});

gulp.task('watch', function () {
  gulp.watch(['./**/*.js', '!./node_modules/**/*'], ['test']);
});

gulp.task('default', ['test', 'watch']);