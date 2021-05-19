const { src, dest } = require('gulp')
const paths = require('../paths')
const gulpIf = require('gulp-if')
const dartSass = require('gulp-dart-sass')
const postCss = require('gulp-postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const packageImporter = require('node-sass-package-importer')
const browserSync = require('browser-sync')
const { defaultPlumber } = require('./plumber')

const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'

const compileSass = function() {
    let plugins = [] // postCSSのプラグインたち
    let noSourcemaps = false
    plugins = [
        autoprefixer({ grid: 'autoplace' }), //　対応ブラウザ指定はpackage.jsonにて
    ]
    if (isProduction) {
        plugins.push(cssnano())
        noSourcemaps = true
    }
    return (
        src(paths.sass.src)
            .pipe(defaultPlumber())
            .pipe(
                dartSass({
                    importer: packageImporter({
                        extensions: ['.scss', '.css'],
                    }),
                })
            )
            // PostCSSでVP付加 -  MQまとめ
            .pipe(postCss(plugins))
            .pipe(
                gulpIf(
                    !noSourcemaps,
                    dest(paths.sass.dist, {
                        sourcemaps: './maps',
                    })
                )
            )
            .pipe(gulpIf(isProduction, dest(paths.sass.dist)))
            .pipe(browserSync.stream())
    )
}


exports.compileSass = compileSass