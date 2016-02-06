const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3037',
    'webpack/hot/only-dev-server',
    './src/app.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'react-hot!babel',
      exclude: /node_modules/,
      include: __dirname
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]    
}
