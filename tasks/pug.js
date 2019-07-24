import {src, dest} from 'gulp';
import pug from 'gulp-pug';
import paths from '../paths';

export function compilePug() {
    return src(paths.pug.src)
        .pipe(pug({
            pretty: '\t',
        }))
        .pipe(dest(paths.pug.dist));
};
