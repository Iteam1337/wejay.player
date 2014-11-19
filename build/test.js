var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mochaPhantom = require('gulp-mocha-phantomjs'),
  mocha = require('gulp-mocha'),
  plumber = require('gulp-plumber'),
  runSequence = require('run-sequence');

gulp.task('jshint:server', function () {
  return gulp.src(['gulpfile.js', 'build/**/*.js', 'lib/**/*.js', 'test/server/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jshint:client', function () {
  return gulp.src(['src/**/*.js', 'test/client/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha:server', function () {
  return gulp.src('./test/server/unit/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('mocha:client', function () {
  return gulp.src('test/**/*.html')
    .pipe(plumber())
    .pipe(mochaPhantom({reporter: 'spec'}));
});

gulp.task('test:server', function () {
  return runSequence('jshint:server', 'mocha:server');
});

gulp.task('test:client', function () {
  return runSequence('jshint:client', 'mocha:client');
});

module.exports = function (cb) {
  return runSequence('jshint:server', 'mocha:server', 'jshint:client', 'mocha:client');
};