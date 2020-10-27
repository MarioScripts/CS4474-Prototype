module.exports = {
    entry: './src/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/react', '@babel/env' ]
                },
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
        extensions: [ '.js', '.jsx' ]
    },
    devServer: {
        port: 3000,
        contentBase: __dirname, // both src and output dirs
        watchContentBase: true,
        // inline: true,
        // hot: true,
        // disableHostCheck: true
    }
};
