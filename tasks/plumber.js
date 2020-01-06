import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

export function defaultPlumber() {
    return plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
    })
}
