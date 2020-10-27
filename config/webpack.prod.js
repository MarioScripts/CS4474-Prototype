const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: false
                    }
                }
            ],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/static/favicon.ico',
            minify: {
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        new webpack.DefinePlugin({
            BUILD_VERSION: JSON.stringify(`${process.env.npm_package_version}-${process.env.CI_PIPELINE_ID}`)
        }),
        new MiniCssExtractPlugin(),
    ]
});
