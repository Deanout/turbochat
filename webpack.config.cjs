const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  type: "module",
  devtool: "source-map",
  entry: {
    application: "./app/javascript/application.mjs",
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
