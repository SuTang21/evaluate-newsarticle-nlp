const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/client/index.js",
    serviceWorker: "./dist/service-worker.js",
  },
  output: {
    libraryTarget: "var",
    library: "Client",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
    }),
  ],
};
