const path = require('path');
const webpack = require('webpack');
// process.env.NODE_ENV = 'production' - 배포모드

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
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    // preset-env - 지원할 브라우저 선택할 수 있다!
                    ['@babel/preset-env', {
                        targets: {
                            // https://github.com/browserslist/browserslist
                            browsers: ['> 1% in KR'],
                        },
                        debug: true,
                    }], 
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
                ],
            }
        }]
    },
    // 추가적인 plugins..
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        // react-hot-loader && webpack-dev-server 적용을 위한 가상의 path 설정
        publicPath: '/dist',
    },
};
