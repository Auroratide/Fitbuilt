const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = [ {
  name: 'client',
  mode: 'production',
  entry: path.join(__dirname, 'client', 'src', 'index.js'),
  output: {
    filename: 'client.js',
    path: path.join(__dirname, 'dist', 'public')
  },
  module: {
    rules: [ {
      test: /\.svelte$/,
      use: {
        loader: 'svelte-loader',
        options: {
          emitCss: true
        }
      }
    }, {
      test: /\.css$/,
      use: [ {
        loader: MiniCssExtractPlugin.loader
      }, 'css-loader' ]
    } ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new CopyPlugin([ {
      from: path.join(__dirname, 'client', 'public'),
      to: path.join(__dirname, 'dist', 'public')
    } ])
  ]
}, {
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
} ]
