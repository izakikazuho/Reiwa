import gulp from 'gulp';

import gulpIf from 'gulp-if';

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

import sass from 'gulp-sass';
import postCss from 'gulp-postcss';
import cssnano from 'cssnano';
import mqPacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';
import packageImporter from 'node-sass-package-importer';

import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';

import pug from 'gulp-pug';

import browserSync from 'browser-sync';

import prompt from 'gulp-prompt';
import del from 'del';
import vinylPaths from 'vinyl-paths';

import paths from './paths';

/* =======================================
  環境変数を変数に代入
========================================== */
const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

/* =======================================
  エラーハンドリング
========================================== */
function defaultPlumber() {
  return plumber({
    errorHandler: notify.onError('Error: <%= error.message %>'),
  });
}

/* =======================================
  JSコンパイル Webpack4
========================================== */
gulp.task('js', () => {
  return gulp.src(paths.js.entry)
      .pipe(defaultPlumber())
      .pipe(webpackStream({
        mode: env,
        output: {
          filename: 'bundle.js',
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              use: 'babel-loader',
              exclude: '/node_modules/',
            },
          ],
        },
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {drop_console: true},
              },
            }),
          ],
        },
      }, webpack))
      .pipe(gulp.dest(paths.js.dist));
});

/* =======================================
  SASSコンパイル
========================================== */
gulp.task('sass', () => {
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

  return gulp.src(paths.sass.src, {sourcemaps: true})
      .pipe(defaultPlumber())
      .pipe(sass({
        importer: packageImporter({
          extensions: ['.scss', '.css'],
        }),
      }))
  // PostCSSでVP付加 -  MQまとめ
      .pipe(postCss(plugins))
      .pipe(gulpIf(!isProduction, gulp.dest(paths.sass.dist, {sourcemaps: './maps'})))
      .pipe(gulpIf(isProduction, gulp.dest(paths.sass.dist)))
      .pipe(browserSync.stream());
});

/* =======================================
  PUGコンパイル
========================================== */
gulp.task('pug', () => {
  return gulp.src(paths.pug.src)
      .pipe(pug({
        pretty: '\t',
      }))
      .pipe(gulp.dest(paths.pug.dist));
});

/* =======================================
  画像最適化
========================================== */
gulp.task('optimizeImage', () => {
  return gulp.src(paths.img.src)
      .pipe(defaultPlumber())
      .pipe(imagemin([
        imageminPngquant({
          quality: '65-80',
        }),
        imageminMozjpeg({
          quality: 80,
        }),
        imageminGifsicle(),
        imageminSvgo(),
      ]))
      .pipe(gulp.dest(paths.img.dist));
});

/* =======================================
  サーバー
========================================== */
gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: paths.dist,
    },
    open: false,
  });
});

/* =======================================
CLEAN
========================================== */
gulp.task('clean', () => {
  const targetDir = paths.dist;
  return gulp.src(targetDir, {allowEmpty: true})
      .pipe(defaultPlumber())
      .pipe(prompt.confirm(
          '\n'+
      '-------------------------------------------------\n'+
      `😱 <　I'll remove "${targetDir}". Are you sure?\n`+
      '-------------------------------------------------\n'))
      .pipe(vinylPaths(del));
});

/* =======================================
  WATCH
========================================== */
gulp.task('watch', () => {
  gulp.watch(paths.js.src, gulp.series('js', 'reload'));
  gulp.watch(paths.sass.src, gulp.series('sass', 'reload'));
  gulp.watch(paths.pug.src, gulp.series('pug', 'reload'));
  console.log(
      '\n'+
    '-------------------------------------------------\n'+
    '🧐  < OK, I\'m watching now...\n'+
    '-------------------------------------------------\n');
});

gulp.task('reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('default',
    gulp.series(
        gulp.parallel('js', 'sass', 'pug', 'optimizeImage'),
        gulp.parallel('server', 'watch')
    )
);

gulp.task('build',
    gulp.series(
        'clean',
        gulp.parallel('js', 'sass', 'pug', 'optimizeImage')
    )
);

