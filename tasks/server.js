import browserSync from 'browser-sync';
import paths from '../paths';

export function startServer() {
  browserSync({
    proxy: 'https://calmatakumi.wp', // Local by Flywheelのドメイン
    open: false,
  });
}

export function reloadBrowser(done) {
  browserSync.reload();
  done();
}
