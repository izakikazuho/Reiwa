/* =======================================
* 各タスクのソース/吐き出し先を決めます。
========================================== */
// 開発用ディレクトリ
const src = './src'
// はき出し先ディレクトリ
const dist = './public_html'

module.exports = {
    src: src,
    dist: dist,

    html: {
        src: [`${src}/**/*.html`, `!${src}/node_modules/**/*`],
        dist: `${dist}`,
    },
    pug: {
        src: [`${src}/pug/**/*.pug`, `!${src}/pug/**/_*.pug`],
        dist: `${dist}/`,
    },
    fonts: {
        src: `${src}/fonts/**/*`,
        dist: `${dist}/fonts`,
    },
    js: {
        entry: `${src}/js/main.js`,
        src: `${src}/js/**/*.js`,
        dist: `${dist}/js`,
    },
    img: {
        src: `${src}/images/**/*.+(jpg|jpeg|png|gif|ico|svg)`,
        dist: `${dist}/images`,
    },
    data: {
        src: `${src}/dl/**/*`,
        dist: `${dist}/dl`,
    },
    sass: {
        src: `${src}/scss/**/*.scss`,
        dist: `${dist}/css`,
    },
}
