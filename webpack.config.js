const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "production",

  // Entry point
  entry: "./src/js/main.js",

  // Output folder
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        // Match html files
        test: /\.html$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "html-loader",
          },
        
        ],
      },
      { 
        // Only match image files inside the `assets/img/webpack/` directory
        test: /src\/assets\/img\/webpack\/[A-Za-z0-9- (){}@#%$^&*+-/\\|\[\]~`!'":;<>,.?]*\.(png|jpe?g|gif|svg)$/i,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    // Generates `index.html` in the output folder
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),

    // Generates `speaker-details.html` in the output folder
    new HtmlWebpackPlugin({
      filename: "speaker-details.html",
      template: "./src/speaker-details.html",
    }),
    new MiniCssExtractPlugin(),
  ],

};
