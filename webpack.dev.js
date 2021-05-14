const path = require("path"); 
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  devServer: { 
    port: 3000 
  }, 
  plugins: [ 
    new htmlWebpackPlugin({ 
      template: "./src/client/views/index.html", 
      filename: "./index.html" 
    }) 
  ] 
} 