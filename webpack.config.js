const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  mode: 'development',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|sass)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    liveReload: true,
    open: true
  }
}