const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    // port: 3000,
    contentBase: path.resolve(__dirname, 'dist'),
    // disableHostCheck: true,
    // host: '0.0.0.0'
  },
};


// const path = require('path')

// module.exports = {
//   plugins: [
//     new webpack.ProvidePlugin({
//       L: 'leaflet'
//     })
//   ],
//   devServer: {
//     port: 3000,
//     contentBase: path.resolve(__dirname, 'dist')
//   },
//   mode: "development"
// }
