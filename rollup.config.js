import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

const plugins = [
  babel({
    presets: [
      ['es2015-rollup'],
      'stage-0'
    ],
    plugins: [
      'transform-object-assign'
    ]
  })
]

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'VuexClass',
      file: 'dist/vuex-class.js',
      format: 'umd'
    },
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      name: 'VuexClass',
      file: 'dist/vuex-class.min.js',
      format: 'umd'
    },
    plugins: [
      ...plugins,
      uglify()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vuex-class.esm.js',
      format: 'es'
    },
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vuex-class.common.js',
      format: 'cjs'
    },
    plugins
  }
]
