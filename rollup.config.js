import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import minify from 'rollup-plugin-babel-minify';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const config = {
  external: ['axios'],
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      globals: {
        axios: 'axios',
      },
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: pkg.name,
      globals: {
        axios: 'axios',
      },
    },
    {
      file: pkg.module,
      format: 'es',
      name: pkg.name,
      globals: {
        axios: 'axios',
      },
    },
  ],
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
    terser(),
    commonjs(),
    filesize(),
  ],
};

export default config;
