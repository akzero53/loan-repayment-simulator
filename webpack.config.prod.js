const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new CopyWebpackPlugin([
      { from: 'googlefbddfaa4ac560452.html' },
    ]),
  ],
})
