const path = require('path');

module.exports = {
  entry: './src/index.js',  // Path to your main entry file
  output: {
    path: path.resolve(__dirname, 'dist'),  // Output directory
    filename: 'bundle.js'  // Output bundle filename
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Apply loaders to JavaScript files
        exclude: /node_modules/,  // Exclude node_modules folder
        use: {
          loader: 'babel-loader'  // Use Babel loader for JavaScript files
        }
      }
    ]
  }
};
