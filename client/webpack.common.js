const webpack = require('webpack');
const getAppVersion = require('./webpack/utils').getAppVersionFromPackageJSON;
const resolve = require('./webpack/utils').resolve;

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const AppConsoleFramePlugin = require('./webpack/plugins/app-console-frame');
const ProgressBarConfig = require('./webpack/plugins/progress-bar-config');
const ESLintConfig = require('./webpack/plugins/eslint-config');
const ImageConfig = require('./webpack/plugins/image-config');
const HtmlWebpackConfig = require('./webpack/plugins/html-webpack-config');

const optimization = require('./webpack/optimization');
const rules = require('./webpack/rules');
const alias = require('./webpack/alias');
const { TARGETS } = require('./webpack/enums');

// -------------------------------------- //

const appName = 'HarcMap';
const appVersion = getAppVersion();
const publicPath = '../public';

module.exports = (env) => ({
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
    new AppConsoleFramePlugin({ appName, appVersion, target: env.target }),
    new ProgressBarConfig(),
    new ESLintConfig(),
    new HtmlWebpackConfig({ capacitor: env.target === TARGETS.mobileApp }),
    new ImageConfig(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'APP_NAME': JSON.stringify(appName),
      'VERSION': JSON.stringify(appVersion),
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    }),
  ],
});
