'use strict';

var gulp = require('gulp'),
    babel = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    del = require('del'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify');


var paths = {
  SRC: './oldhawaii_metadata/apps/static/jsx/app.js',
  DST: './oldhawaii_metadata/apps/static/js',
  DST_FILENAME: 'bundle.js'
}

function clean(cb) {
  console.log('-> cleaning...');
  del([paths.DST], cb);
}

function compile(watch) {
  var bundler = browserify(paths.SRC, { cache: {}, packageCache: {}, debug: true }).transform(babel);

  if (watch) {
    bundler = watchify(bundler);
  }

  function rebundle() {

    console.log('-> bundling...');

    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(paths.SRC))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(size())
      .pipe(rename(paths.DST_FILENAME))
      .pipe(gulp.dest(paths.DST));
  }

  if (watch) {
    bundler.on('update', function() {
      clean();
      rebundle();
    });
  }

  rebundle();
}

function watch() { return compile(true); };

gulp.task('build', function(cb) { return compile(); });
gulp.task('clean', function(cb) { return clean(cb); });
gulp.task('watch', function(cb) { return watch(); });
gulp.task('default', ['clean', 'watch']);
