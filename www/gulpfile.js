'use strict';

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlreplace = require('gulp-html-replace'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify');


function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}


gulp.task('transform', function () {
  return gulp.src('./oldhawaii_metadata/apps/static/jsx/**/*.js')
    .pipe(browserify({transform: ['reactify']}))
    .on('error', handleError)
    .pipe(gulp.dest('./oldhawaii_metadata/apps/static/js'))
    .pipe(size());
});

gulp.task('clean', function () {
  return gulp.src(['./oldhawaii_metadata/apps/static/js'], {read: false})
             .pipe(clean());
});


gulp.task('default', ['clean'], function () {
  gulp.start('transform');
  gulp.watch('./oldhawaii_metadata/apps/static/jsx/**/*.js', ['transform']);
});
