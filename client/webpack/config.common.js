const webpack = require('webpack');
const getAppVersion = require('./options/utils').getAppVersionFromPackageJSON;
const resolve = require('./options/utils').resolve;

const { VueLoaderPlugin } = require('vue-loader');
const { appConsoleFramePlugin } = require('@dbetka/wdk/lib/webpack/app-console-frame');
const ESLintConfig = require('./configs/eslint-config');
const ImageConfig = require('./configs/image-config');
const HtmlWebpackConfig = require('./configs/html-webpack-config');

const optimization = require('./options/optimization');
const rules = require('./options/rules');
const alias = require('./options/alias');
const { TARGETS } = require('./options/enums');

// -------------------------------------- //

const appName = 'HarcMap';
const appVersion = getAppVersion();
const publicPath = '../../public';

module.exports = (env) => ({
  mode: 'development',
  entry: {
    main: resolve('../src/index.js'),
  },
  stats: {
    all: false,
    errors: true,
    warnings: true,
  },
  performance: {
    maxAssetSize: 250000,
  },
  optimization,
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: resolve(publicPath),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules,
    parser: {
      javascript: {
        commonjsMagicComments: true,
      },
    },
  },
  resolve: {
    alias,
    extensions: ['.ts', '.js', '.vue', '.sass', '.css'],
  },
  plugins: [
    ...appConsoleFramePlugin({
      appName,
      appVersion,
      target: env.target,
    }),
    new ESLintConfig(),
    new HtmlWebpackConfig({ capacitor: env.target === TARGETS.mobileApp }),
    new ImageConfig(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      '__APP_NAME__': JSON.stringify(appName),
      '__APP_VERSION__': JSON.stringify(appVersion),
      '__APP_BASE_URL__': JSON.stringify(process.env.BASE_URL),
      '__DEVICE_TARGET__': JSON.stringify(env.target),
    }),
  ],
});
