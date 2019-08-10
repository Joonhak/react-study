const path = require('path');

module.exports = {
  name: '',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {
    app: './client',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            // preset-env - 지원할 브라우저 선택할 수 있다!
            [
              '@babel/preset-env',
              {
                targets: {
                  // https://github.com/browserslist/browserslist
                  browsers: ['> 1% in KR'],
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['react-hot-loader/babel'],
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
    ],
  },
  // 추가적인 plugins..
  plugins: [],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: 'dist',
  },
};
