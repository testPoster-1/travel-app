const path = require("path"); 
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: 'source-map', 
  entry: './src/client/index.js',  //custom entry point webpack 
  output: {
    clean: true
  },
  devServer: { 
    port: 1000 
  },
  module: {
    rules: [
      { test: '/.js$/', 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }, 
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
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
              loader: 'html-loader'
          }
      },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: {
            loader: "file-loader",
            options: {
              outputPath: "img/",
              publicPath: "img/",
              name: "[name][hash].[ext]"
            }
          }
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        { 
          test: /.css$/i, 
          use: ["style-loader", "css-loader"] 
        }, 
    ]
  },
  plugins: [
    new htmlWebpackPlugin({ 
      template: "./src/client/views/index.html", 
      filename: "./index.html" 
    }), 
    new WorkboxPlugin.GenerateSW() 
  ]
} 