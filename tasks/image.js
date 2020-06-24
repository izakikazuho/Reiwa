import { src, dest, lastRun } from 'gulp'
import imagemin from 'gulp-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminGifsicle from 'imagemin-gifsicle'
import imageminSvgo from 'imagemin-svgo'
import paths from '../paths'
import plumber from 'gulp-plumber'

export function optimizeImage() {
    return src(paths.img.src, {
        since: lastRun(optimizeImage),
    })
        .pipe(plumber())
        .pipe(
            imagemin([
                imageminPngquant({
                    quality: '65-75',
                }),
                imageminMozjpeg({
                    quality: 75,
                }),
                imageminGifsicle(),
                imageminSvgo(),
            ])
        )
        .pipe(dest(paths.img.dist))
}
