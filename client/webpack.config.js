const path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?presets[]=react,presets[]=es2015'],
      exclude: /node_modules/,
      include: __dirname
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },  
}

