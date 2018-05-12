const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const path = require('path')

module.exports = (on, config) => {
  on('file:preprocessor', webpackPreprocessor({
    webpackOptions: {
      resolve: {
        alias: {
          'vuex-class.js': path.resolve(__dirname, '../../src/index.js')
        }
      },
      module: {
        rules: [
          {
            test: /\.js/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            },
            enforce: 'post',
            exclude: /node_modules|cypress/
          }
        ]
      }
    }
  }))
}
