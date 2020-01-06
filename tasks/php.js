import { src, dest } from 'gulp'
import paths from '../paths'

export function copyPHP() {
    return src(paths.php.src).pipe(dest(paths.php.dist))
}
