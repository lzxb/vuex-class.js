import uglify from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'VuexClass',
      file: 'dist/vuex-class.js',
      format: 'umd'
    }
  },
  {
    input: 'src/index.js',
    output: {
      name: 'VuexClass',
      file: 'dist/vuex-class.min.js',
      format: 'umd'
    },
    plugins: [
      uglify()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vuex-class.esm.js',
      format: 'es'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vuex-class.common.js',
      format: 'cjs'
    }
  }
]
