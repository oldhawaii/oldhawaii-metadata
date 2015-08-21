var webpack = require('webpack'),
       path = require('path'),
      paths = require('./build.config');

module.exports = {
  entry: {
    app: [paths.js.src_files],
  },
  output: {
    path: path.resolve(__dirname, paths.js.dst),
    filename: "[name].bundle.js",
    chunkFilename: "[name]-[id].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx|\.js$/, loaders: ["babel-loader"], exclude: path.resolve(__dirname, "node_modules") },
      {test: /\.js$/, loader: "eslint-loader", exclude: path.resolve(__dirname, "node_modules") },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
