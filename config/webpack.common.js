const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader',
                exclude: /node_modules /
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"]
            }
        ]
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.scss' ]
    },
    devServer: {
        port: 3000,
        // contentBase: path.join(__dirname, '../src'), // both src and output dirs
        // hot: true,
    }
};
