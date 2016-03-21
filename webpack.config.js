module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: __dirname + "/src/public/",
    filename: "bundle.js"
  },
  watch: false,
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
         presets: ['es2015', 'react', 'stage-0'],
         plugins: [__dirname + '/src/babelRelayPlugin.js']
        }
      }
    ]
  }
}
