const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    library: 'ReduxTsAnnotations',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
    filename: 'redux-ts-annotations.production.min.js',
  },
});
