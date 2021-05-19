const paths = require("./paths")
const TerserPlugin = require('terser-webpack-plugin')
const env = process.env.NODE_ENV || 'development'

module.exports = {
    cache: true,
    mode: env,
    entry: {
        main: paths.js.entry,
    },
    output: {
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
        splitChunks: {
            name: 'vendor',
            chunks: 'all',
        },
    },
}
