var path = require('path');

var paths = {
  js: {
    digital_asset_form: {
      src: path.resolve(__dirname, './oldhawaii_metadata/apps/static/jsx'),
      src_files: path.resolve(__dirname, './oldhawaii_metadata/apps/static/jsx/digital_asset_form.js'),
      dst: path.resolve(__dirname, './oldhawaii_metadata/apps/static/js'),
      dst_filename: 'digital_asset_form.js'
    },
    source_form: {
      src: path.resolve(__dirname, './oldhawaii_metadata/apps/static/jsx'),
      src_files: path.resolve(__dirname, './oldhawaii_metadata/apps/static/jsx/source_form.js'),
      dst: path.resolve(__dirname, './oldhawaii_metadata/apps/static/js'),
      dst_filename: 'source_form.js'
    }
  },
  styles: {
    src: path.resolve(__dirname, './oldhawaii_metadata/apps/static/sass'),
    src_files: path.resolve(__dirname, './oldhawaii_metadata/apps/static/sass/**/*.scss'),
    dst: path.resolve(__dirname, './oldhawaii_metadata/apps/static/css'),
    dst_filename: 'style.css'
  }
}

module.exports = paths;
