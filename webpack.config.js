const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJsPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    //publicPath: "/",
  },
  mode: "production",
  optimization: {
    minimizer: [
      new TerserJsPlugin(), new OptimizeCssAssetsPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.woff|eot|ttf|svg$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: 'assets/fonts',
            esModule: false
          },
        }
      },
      {
        test: /\.jpg|jpeg|png|gif$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: 'assets/img',
            esModule: false
          },
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            },
          },
          "css-loader", // entiende que puede importarse codigo css en javascript
          /*{
            loader: "resolve-url-loader",
            options: {
              //keepQuery: true
              //absolute: true
              //root: 'css/'
            }
          },*/
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ],
      },
      
    ]
  },
  resolve: {
    extensions: ['.js', '.scss']
  },    
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/img/loui-santana-og-image.jpg', to: 'assets/img' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/index.[hash].css",
      chunkFilename: 'css/chunk.[id].css', // Esta linea es nueva no se ha probado aun
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: path.resolve(__dirname, 'src/about.html')
    })
  ]
}