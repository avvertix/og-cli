import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'index.js',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [nodeResolve(), commonjs(), json()]
};