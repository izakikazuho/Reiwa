const browserSync = require('browser-sync')
const paths = require('../paths')

const startServer = function(done) {
    browserSync({
        server: {
            baseDir: paths.dist,
        },
        open: false,
    })
    done()
}

const reloadBrowser = function(done) {
    browserSync.reload()
    done()
}

exports.startServer = startServer
exports.reloadBrowser = reloadBrowser

