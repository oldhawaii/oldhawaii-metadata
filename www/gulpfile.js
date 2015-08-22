'use strict';

var gulp = require('gulp'),
    autoprefix = require('gulp-autoprefixer'),
    del = require('del'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('webpack-stream'),
    paths = require('./build.config');


function clean(cb) {
  console.log('-> cleaning...');

  for (var key in paths.js) {
    del([paths.js[key].dst]);
  }
}

function compile(watch) {

  function rebundle() {

    console.log('-> bundling...');

    var config = require('./webpack.config.js');
    config['watch'] = watch;

    for (var key in paths.js) {
      gulp.src(paths.js[key].src_files)
          .pipe(webpack(config))
          .on('error', function(err) { console.error(err); this.emit('end'); })
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(sourcemaps.write('./'))
          .pipe(size())
          .pipe(gulp.dest(paths.js[key].dst));
    }
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
    .pipe(size())
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
gulp.task('default', ['clean', 'watch', 'watch:styles']);
