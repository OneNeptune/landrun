var path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/landrun.js',
  output: {
    filename: 'landrun_bundle.js',
    path: path.resolve(__dirname, 'lib')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
