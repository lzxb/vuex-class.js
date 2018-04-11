const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  on('file:preprocessor', webpackPreprocessor({
    webpackOptions: {
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
