const webpack = require('webpack');
const getAppVersion = require('./options/utils').getAppVersionFromPackageJSON;
const resolve = require('./options/utils').resolve;

const { VueLoaderPlugin } = require('vue-loader');
const AppConsoleFramePlugin = require('./plugins/app-console-frame');
const ProgressBarConfig = require('./plugins/progress-bar-config');
const ESLintConfig = require('./plugins/eslint-config');
const ImageConfig = require('./plugins/image-config');
const HtmlWebpackConfig = require('./plugins/html-webpack-config');

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
    // filename in dev and prod configs
    chunkFilename: '[name].[chunkhash].js',
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
