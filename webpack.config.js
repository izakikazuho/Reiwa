import TerserPlugin from 'terser-webpack-plugin';
const env = process.env.NODE_ENV || 'development';

module.exports = {
    cache: true,
    mode: env,
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules/',
        }, ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true
                    },
                },
            }),
        ],
    },
}
