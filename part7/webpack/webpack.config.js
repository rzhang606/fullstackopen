const path = require('path')

const config = {
  entry: ['@babel/polyfill', './src/index.js'], //polyfill required for async
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  module: {
      rules: [ //where loaders are defined
          { //3 parts to a loader
            test: /\.js$/, //files that end in .js
            loader: 'babel-loader', //use babel loader
            query: { //parameters
                presets: ['@babel/preset-react', '@babel/preset-env']
            }
          },
          {
              test: /\.css$/,
              loaders: ['style-loader', 'css-loader'],//css loader loads css files, style loader generates and injects style elements
          },
      ]
  },
  devServer: { //allows npm start to start dev-server at 3000, and refreshes automatically when changes are made
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000
  },
  devtool: 'source-map',
}
module.exports = config