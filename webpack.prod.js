const path = require("path");
const webpack = require("webpack"); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/client/index.js",
  output: { 
    path: path.join(__dirname, 'dist'), 
    filename: 'main.js', 
    libraryTarget: 'var', 
    library: 'Client'
  },
  module: { 
    rules: [ 
      { test: '/.js$/', 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      } 
    ] 
  }, 
  plugins: [
    new CleanWebpackPlugin ({
      dry: true, 
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    })
  ]
} 
