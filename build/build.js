var gulp = require('gulp'),
  templateCache = require('gulp-angular-templatecache'),
  cheerio = require('gulp-cheerio'),
  ngAnnotate = require('gulp-ng-annotate'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  file = require('gulp-file'),
  runSequence = require('run-sequence'),
  minify = require('html-minifier').minify,
  q = require('q');

gulp.task('templates', function () {
  return gulp.src(['src/partials/**/*.html', 'src/directives/**/*.html'])
    .pipe(templateCache({
      module: 'wejay.player',
      base: process.cwd() + '/src'
    }))
    .pipe(gulp.dest('src'));
});

function removeScripts($) {
  return q($('script[data-build="exclude"]').remove());
}

function concatjs($) {
  var scripts = $('script')
    .map(function (ix, script) { return $(script).attr('src'); })
    .get()
    .concat(['temp/templates.js']);
  return gulp.src(scripts)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
}

gulp.task('less', function () {
  return gulp.src('src/css/main.less')
    .pipe(sourcemaps.init())
    .pipe(less({compress:true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'));
  });

function cleanhtml($) {
  $('script').remove();
  $('link[rel="stylesheet/less"]').remove();
  $('head').children().append('<link rel="stylesheet" href="main.css" />');
  $('body').children().append('<script src="app.js"></script>');

  var minifyOptions = {
    removeComments: true,
    collapseWhitespace: true
  }

  return file('index.html', minify($.html(), minifyOptions)).pipe(gulp.dest('dist'));
}

gulp.task('parseAssets', function () {
  return gulp.src('src/index.html')
    .pipe(cheerio(function ($, done) {
      removeScripts($)
      concatjs($)
        .then(q(cleanhtml($)))
        .then(function () { done(); })
        .catch(done);
    }));
});

module.exports = function (cb) {
  runSequence('templates', 'parseAssets', cb);
};