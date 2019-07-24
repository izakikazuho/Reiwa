import browserSync from 'browser-sync';
import paths from '../paths'

export function startServer() {
    browserSync({
      server: {
        baseDir: paths.dist,
      },
      open: false,
    });
}

export function reloadBrowser() {
    return browserSync.reload();
}
