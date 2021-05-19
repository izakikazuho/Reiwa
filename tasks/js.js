const { src, dest } = require('gulp')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const paths = require('../paths')

const webpackConfig = require('../webpack.config')

const bundleJS = function() {
    return src(paths.js.src)
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(dest(paths.js.dist))
}

exports.bundleJS = bundleJS