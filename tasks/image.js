const { src, dest, lastRun } = require('gulp')
const imagemin = require('gulp-imagemin')
const paths = require('../paths')
const { defaultPlumber } = require('./plumber')

const optimizeImage = function () {
    return src(paths.img.src, {
        since: lastRun(optimizeImage),
    })
        .pipe(defaultPlumber())
        .pipe(
            imagemin([
                imagemin.optipng({
                    quality: '80',
                }),
                imagemin.mozjpeg({
                    quality: 80,
                }),
                imagemin.gifsicle(),
                imagemin.svgo(),
            ])
        )
        .pipe(dest(paths.img.dist))
}

exports.optimizeImage = optimizeImage
