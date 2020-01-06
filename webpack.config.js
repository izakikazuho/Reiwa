import TerserPlugin from 'terser-webpack-plugin'
const env = process.env.NODE_ENV || 'development'

module.exports = {
    cache: true,
    mode: env,
    entry: {
        main: './src/js/main.js',
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
        namedChunks: true,
    },
}
