const path = require("path");
const webpack = require("webpack"); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require("html-webpack-plugin");



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
      }, 
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
            loader: 'html-loader'
        }
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
          test: /.css$/i, 
          use: ["style-loader", "css-loader"] 
        }, 
    ] 
  }, 
  plugins: [
    new CleanWebpackPlugin ({
      dry: true, 
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    }), 
      new htmlWebpackPlugin({ 
        template: "./src/client/views/index.html", 
        filename: "./index.html" 
      }) 
  ]
} 
