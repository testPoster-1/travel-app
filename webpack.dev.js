const path = require("path"); 
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  mode: "development",
  devtool: 'source-map', 
  devServer: { 
    port: 1000 
  },
  entry: './src/client/index.js',  //custom entry point webpack 
  output: {
    clean: true
  },
  plugins: [
    new htmlWebpackPlugin({ 
      template: "./src/client/views/index.html", 
      filename: "./index.html" 
    }) 
  ]
} 