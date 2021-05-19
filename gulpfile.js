const { series, parallel, watch } = require('gulp')
const paths = require('./paths')
const { compileSass }  = require('./tasks/sass')
const { optimizeImage } = require('./tasks/image')
const { startServer, reloadBrowser } = require('./tasks/server')
const { bundleJS } = require('./tasks/js')

/* =======================================
  WATCH
========================================== */
const watcher = function () {
    watch(paths.sass.src, compileSass)
    watch(paths.img.src, series(optimizeImage, reloadBrowser))
    watch(paths.js.src, series(bundleJS, reloadBrowser))
    watch(paths.template.dist, reloadBrowser)
    console.log(
        '\n' +
            '-------------------------------------------------\n' +
            "🧐  < OK, I'm watching now...\n" +
            '-------------------------------------------------\n'
    )
}

const start = series(
    startServer,
    watcher
)

const build = parallel(bundleJS, compileSass, optimizeImage)

exports.build = build
exports.start = start
exports.default = start