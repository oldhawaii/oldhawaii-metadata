'use strict';

var gulp = require('gulp'),
    autoprefix = require('gulp-autoprefixer'),
    babel = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    del = require('del'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
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
  },
  styles: {
    src: './oldhawaii_metadata/apps/static/sass',
    src_files: './oldhawaii_metadata/apps/static/sass/**/*.scss',
    dst: './oldhawaii_metadata/apps/static/css',
    dst_filename: 'style.css'
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

function styles() {
  return gulp.src(paths.styles.src_files)
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: 'map',
        includePaths : [paths.styles.src]
    }))
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename(paths.styles.dst_filename))
    .pipe(gulp.dest(paths.styles.dst))
}

function watch_styles() {
  return gulp.watch(paths.styles.src_files, ['styles']);
}

gulp.task('build', function(cb) { return compile(); });
gulp.task('clean', function(cb) { return clean(cb); });
gulp.task('styles', function(cb) { return styles(); });
gulp.task('watch', function(cb) { return watch(); });
gulp.task('watch:styles', function(cb) { return watch_styles(); });
gulp.task('default', ['clean', 'watch:styles']);
