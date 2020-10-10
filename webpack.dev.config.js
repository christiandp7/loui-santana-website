const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  mode: "development",
  devServer: {
    //contentBase: path.resolve(__dirname, "dist"),
    open: true,
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.woff|eot|ttf|svg$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: 'assets/fonts',
          },
        }
      },
      {
        test: /\.jpg|jpeg|png|gif$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: 'assets/img',
          },
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss|css$/,
        use: [
          "style-loader", 
          "css-loader", 
          "sass-loader"
        ],
      },
    ],
  },
  //resolve: [".js", ".scss", ".html"],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: path.resolve(__dirname, 'src/about.html')
    })
  ],
};
