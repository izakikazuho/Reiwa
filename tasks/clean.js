import gulp from 'gulp'
import prompt from 'gulp-prompt'
import del from 'del'
import vinylPaths from 'vinyl-paths'
import paths from '../paths'

export function clean() {
    const targetDir = paths.dist
    return gulp
        .src(targetDir, { allowEmpty: true })
        .pipe(
            prompt.confirm(
                '\n' +
                    '-------------------------------------------------\n' +
                    `😱 <　I'll remove "${targetDir}". Are you sure?\n` +
                    '-------------------------------------------------\n'
            )
        )
        .pipe(vinylPaths(del))
}
