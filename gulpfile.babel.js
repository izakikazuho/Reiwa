import { series, parallel, watch } from 'gulp'
import paths from './paths'
import { clean } from './tasks/clean'
import { bundleJS } from './tasks/js'
import { compilePug } from './tasks/pug'
import { compileSass } from './tasks/sass'
import { copyFonts } from './tasks/fonts'
import { optimizeImage } from './tasks/image'
import { startServer, reloadBrowser } from './tasks/server'

/* =======================================
  WATCH
========================================== */
function watchTasks() {
    watch(paths.js.src, series(bundleJS, reloadBrowser))
    watch(paths.sass.src, series(compileSass))
    watch(paths.pug.src[0], series(compilePug, reloadBrowser))
    watch(paths.img.src, series(optimizeImage, reloadBrowser))
    console.log(
        '\n' +
            '-------------------------------------------------\n' +
            "🧐  < OK, I'm watching now...\n" +
            '-------------------------------------------------\n'
    )
}

export const start = series(
    parallel(bundleJS, compilePug, compileSass, optimizeImage, copyFonts),
    parallel(startServer, watchTasks)
)

export const build = series(
    clean,
    parallel(bundleJS, compilePug, compileSass, optimizeImage, copyFonts)
)
