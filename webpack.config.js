const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
               "template": "index.html",
               "filename": "./index.html"
              });

module.exports = { 
    entry: path.join(__dirname, 'index.js'),
    output: {
        path: path.join(__dirname, './'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: /node_moudles/
            },
            {
                test: /\.(css|scss)/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
               test: /\.ts$/,
               exclude: /node_modules/,
               use: ['ts-loader', 'babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        htmlWebpackPlugin
    ],
    devServer: {
        hot: true
    }

}                
