const path = require('path')

module.exports = {
  name: 'server',
  target: 'node',
  mode: 'production',
  entry: path.join(__dirname, 'server', 'src', 'index.ts'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: [ '.js', '.ts' ]
  },
  module: {
    rules: [ {
      test: /\.ts$/,
      use: {
        loader: 'ts-loader'
      }
    } ]
  },
  node: {
    __dirname: false
  }
}