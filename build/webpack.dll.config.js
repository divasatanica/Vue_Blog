const path = require('path'),
      fs = require('fs'),
      webpack = require('webpack')

const vendors = ['axios', 'vue/dist/vue.esm.js', 'vue-router']

module.exports = {
  entry: {
    vendor: vendors
  },
  output: {
    path: path.join(__dirname, '../dll/'),
    filename: 'dll.js',
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "/", "manifest.json"),
      name: "[name]",
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  ]
}