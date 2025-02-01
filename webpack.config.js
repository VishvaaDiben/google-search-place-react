const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // CSS handling
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // For React and ES6+
      },
    ],
  },
  devServer: {
    static: './dist',
    hot: true,
  },
};
