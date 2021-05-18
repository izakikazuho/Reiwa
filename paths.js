/* =======================================
* 各タスクのソース/吐き出し先を決めます。
========================================== */
// 開発用ディレクトリ
const src = './src'
// はき出し先ディレクトリ
const dist = './dist'

module.exports = {
    src: src,
    dist: dist,
    template: {
        src: `${src}/site`,
        dist: `${dist}`
    },
    js: {
        entry: `${src}/js/main.js`,
        src: `${src}/assets/js/**/*.js`,
        dist: `${dist}/assets/js`,
    },
    img: {
        src: `${src}/assets/images/**/*.+(jpg|jpeg|png|gif|ico|svg)`,
        dist: `${dist}/assets/images`,
    },
    sass: {
        src: `${src}/assets/scss/**/*.scss`,
        dist: `${dist}/assets/css`,
    },
}
