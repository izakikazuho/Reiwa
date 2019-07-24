import {src, dest} from 'gulp'
import gulpIf from 'gulp-if';
import sass from 'gulp-sass';
import postCss from 'gulp-postcss';
import cssnano from 'cssnano';
import mqPacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';
import packageImporter from 'node-sass-package-importer';
import paths from '../paths';
import browserSync from 'browser-sync';
import {defaultPlumber} from './plumber'

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

export function compileSass() {
    let plugins = []; // postCSSのプラグインたち
    plugins = [
        autoprefixer(), //　対応ブラウザ指定はpackage.jsonにて
    ];
    if (isProduction) {
        plugins.push(
            mqPacker(),
            cssnano()
        );
    }
    return src(paths.sass.src, {
            sourcemaps: true,
        })
        .pipe(defaultPlumber())
        .pipe(sass({
            importer: packageImporter({
                extensions: ['.scss', '.css'],
            }),
        }))
        // PostCSSでVP付加 -  MQまとめ
        .pipe(postCss(plugins))
        .pipe(gulpIf(!isProduction, dest(paths.sass.dist, {
            sourcemaps: './maps'
        })))
        .pipe(gulpIf(isProduction, dest(paths.sass.dist)))
        .pipe(browserSync.stream());
}
