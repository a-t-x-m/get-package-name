import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  nodeResolve({
    preferBuiltins: true
  }),
  typescript({
    allowSyntheticDefaultImports: true,
    lib: [
      'dom',
      'esnext'
    ],
    typeRoots: [
      './node_modules/@types',
      './types'
    ]
  })
];

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'lib',
      format: 'esm'
    },
    plugins
  }
];
