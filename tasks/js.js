import { src, dest } from 'gulp'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import paths from '../paths'
import { defaultPlumber } from './plumber'

const webpackConfig = require('../webpack.config')

export function bundleJS() {
    return defaultPlumber()
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(dest(paths.js.dist))
}
