const path = require("path"); 
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");



module.exports = {
  mode: "development",
  devtool: 'source-map', 
  devServer: { 
    port: 1000 
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ]
        }, 
        { 
          test: /.css$/i, 
          use: ["style-loader", "css-loader"] 
        }, 
    ]
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