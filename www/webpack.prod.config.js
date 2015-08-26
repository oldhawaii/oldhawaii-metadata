var webpack = require('webpack'),
    webpackProd = require('./webpack.config.js');

var uglifyJsOptions = {mangle: false};

webpackProd.plugins.push(new webpack.optimize.UglifyJsPlugin(uglifyJsOptions));

module.exports = webpackProd;
