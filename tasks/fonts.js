import { src, dest } from 'gulp'
import paths from '../paths'

export function copyFonts() {
    return src(paths.fonts.src).pipe(dest(paths.fonts.dist))
}
