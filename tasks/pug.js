import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import rename from 'gulp-rename';
import pugPHPfilter from 'pug-php-filter';
import paths from '../paths';

export function compilePug() {
    return src(paths.pug.src)
        .pipe(
            pug({
                pretty: '\t',
                filters: {
                    php: pugPHPfilter,
                },
            })
        )
        .pipe(
            rename({
                extname: '.php',
            })
        )
        .pipe(dest(paths.pug.dist));
}
