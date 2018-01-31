const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: __dirname + '/src',
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html' },
    ]),
  ],
}
