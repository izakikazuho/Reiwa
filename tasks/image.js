import { src, dest, lastRun } from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import paths from '../paths';
import { defaultPlumber } from './plumber';

export function optimizeImage() {
    return src(paths.img.src, {
        since: lastRun(optimizeImage),
    })
        .pipe(defaultPlumber())
        .pipe(
            imagemin([
                imageminPngquant({
                    quality: '65-80',
                }),
                imageminMozjpeg({
                    quality: 80,
                }),
                imageminGifsicle(),
                imageminSvgo(),
            ])
        )
        .pipe(dest(paths.img.dist));
}
