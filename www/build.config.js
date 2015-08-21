var path = require('path');

var paths = {
  js: {
    src: path.resolve(__dirname, './oldhawaii_metadata/apps/static/jsx'),
    src_files: path.resolve(__dirname, './oldhawaii_metadata/apps/static/jsx/app.js'),
    dst: path.resolve(__dirname, './oldhawaii_metadata/apps/static/js'),
    dst_filename: 'bundle.js'
  },
  styles: {
    src: path.resolve(__dirname, './oldhawaii_metadata/apps/static/sass'),
    src_files: path.resolve(__dirname, './oldhawaii_metadata/apps/static/sass/**/*.scss'),
    dst: path.resolve(__dirname, './oldhawaii_metadata/apps/static/css'),
    dst_filename: 'style.css'
  }
}

module.exports = paths;
