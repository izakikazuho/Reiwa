import { src, dest } from 'gulp'
import paths from '../paths'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

const rollup = require('rollup');

export function bundleJS() {
  return rollup.rollup({
    input: paths.js.entry,
    plugins: [
      resolve(),
      babel({ babelHelpers: 'bundled' })
    ]
  }).then(bundle => {
    bundle.write({
      file: `${paths.js.dist}/bundle.js`,
      format: 'iife',
      sourcemap: true
    })
  });
}
