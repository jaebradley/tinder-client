import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import minify from 'rollup-plugin-babel-minify';
import uglify from 'rollup-plugin-uglify';

import pkg from './package.json';

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: pkg.name,
      globals: ['axios'],
    },
    {
      file: 'build/index.cjs.js',
      format: 'cjs',
      name: pkg.name,
      globals: ['axios'],
    },
    {
      file: 'build/index.esm.js',
      format: 'es',
      name: pkg.name,
      globals: ['axios'],
    },
  ],
  external: ['axios'],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    localResolve(),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      preferBuiltins: true,
      browser: true,
      modulesOnly: true,
    }),
    minify(),
    uglify(),
    commonjs(),
    filesize(),
  ],
};

export default config;
