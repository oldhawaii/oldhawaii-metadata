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
  js: {
    src: './oldhawaii_metadata/apps/static/jsx/',
    src_files: './oldhawaii_metadata/apps/static/jsx/app.js',
    dst: './oldhawaii_metadata/apps/static/js',
    dst_filename: 'bundle.js'
  }

}

function clean(cb) {
  console.log('-> cleaning...');
  del([paths.js.dst], cb);
}

function compile(watch) {
  var bundler = browserify(paths.js.src_files, { cache: {}, packageCache: {}, debug: true }).transform(babel);

  if (watch) {
    bundler = watchify(bundler);
  }

  function rebundle() {

    console.log('-> bundling...');

    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(paths.js.src_files))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(size())
      .pipe(rename(paths.js.dst_filename))
      .pipe(gulp.dest(paths.js.dst));
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
