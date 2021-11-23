const webpack = require('webpack');
const getAppVersion = require('./webpack/utils').getAppVersionFromPackageJSON;
const resolve = require('./webpack/utils').resolve;

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const AppConsoleFramePlugin = require('./webpack/plugins/app-console-frame');
const ProgressBarConfig = require('./webpack/plugins/progress-bar-config');
const ESLintConfig = require('./webpack/plugins/eslint-config');
const ImageConfig = require('./webpack/plugins/image-config');

const optimization = require('./webpack/optimization');
const rules = require('./webpack/rules');
const alias = require('./webpack/alias');

// -------------------------------------- //

const AppName = 'HarcMap';
const AppVersion = getAppVersion();
const publicPath = '../public';

module.exports = {
  mode: 'development',
  entry: {
    main: 'src/index.js',
  },
  stats: {
    all: false,
    errors: true,
    warnings: true,
  },
  optimization,
  output: {
    // filename in dev and prod configs
    path: resolve(publicPath),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules,
  },
  resolve: {
    alias,
    extensions: ['.ts', '.js', '.vue', '.sass', '.css'],
  },
  plugins: [
    new AppConsoleFramePlugin({ AppName, AppVersion }),
    new ProgressBarConfig(),
    new ESLintConfig(),
    new ImageConfig(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'APP_NAME': JSON.stringify(AppName),
      'VERSION': JSON.stringify(AppVersion),
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    }),
  ],
};
