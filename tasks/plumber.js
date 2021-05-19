const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

const defaultPlumber = function() {
    return plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
    })
}

exports.defaultPlumber = defaultPlumber