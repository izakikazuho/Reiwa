import {series, parallel, watch} from 'gulp';

import gulpIf from 'gulp-if';

import paths from './paths';

import {clean} from './tasks/clean'
import {bundleJS} from './tasks/js'
import {compilePug} from './tasks/pug'
import {compileSass} from './tasks/sass'
import {optimizeImage} from './tasks/image'
import {startServer, reloadBrowser} from './tasks/server'

/* =======================================
  環境変数を変数に代入
========================================== */

/* =======================================
  WATCH
========================================== */
function watchTasks() {
    watch(paths.js.src, series(bundleJS, reloadBrowser));
    watch(paths.sass.src, series(compileSass));
    watch(paths.pug.src, series(compilePug, reloadBrowser));
    watch(paths.img.src, series(optimizeImage, reloadBrowser))
    console.log(
      '\n'+
    '-------------------------------------------------\n'+
    '🧐  < OK, I\'m watching now...\n'+
    '-------------------------------------------------\n');
};

export const start = series(
    parallel(bundleJS, compileSass, compilePug, optimizeImage),
    parallel(startServer, watchTasks)
)


export function build() {
    return series(
        clean,
        parallel(bundleJS, compileSass, compilePug, optimizeImage)
    )
}
