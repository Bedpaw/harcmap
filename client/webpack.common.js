const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpackRules = require('./webpack/rules').rules;
const ESLintPlugin = require('eslint-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const dayjs = require('dayjs');

const webpackUtils = require('./webpack/utils');
const resolve = webpackUtils.resolve;

const AppName = 'HarcMap';
const AppVersion = webpackUtils.getAppVersionFromPackageJSON();
const publicPath = '../public';

console.clear();
process.stdout.write('\n');

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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  output: {
    // filename in dev and prod configs
    path: resolve(publicPath),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: webpackRules,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      src: resolve('src'),
      api: resolve('src/api'),
      map: resolve('src/map'),
      store: resolve('src/store'),
      utils: resolve('src/utils'),
      vendors: resolve('../vendors'),
      validateCodes: resolve('../lib/validateCodes.js'),
      config: resolve('src/config'),
      models: resolve('src/models'),

      atoms: resolve('src/components/atoms'),
      extends: resolve('src/components/extends'),
      mixins: resolve('src/components/mixins'),
      molecules: resolve('src/components/molecules'),
      organisms: resolve('src/components/organisms'),
      pages: resolve('src/components/pages'),
      templates: resolve('src/components/templates'),
    },
    extensions: ['.ts', '.js', '.vue', '.sass', '.css'],
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  build ' + chalk.bgGray(':bar') + ' ' + chalk.green.bold(':percent') + ' ',
      renderThrottle: 100,
      width: 30,
      complete: '█',
      incomplete: '-',
      stream: process.stdout,
      clear: false,
      callback: () => {
        const message = 'Done at ' + chalk.bold(dayjs().format('HH:mm:ss')) + '';
        process.stderr.write(chalk.green(message));
      },
    }),
    new ESLintPlugin({
      extensions: ['js', 'vue'],
      formatter: require.resolve('eslint-friendly-formatter'),
      eslintPath: require.resolve('eslint'),
      useEslintrc: true,
    }),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/img',
          to: 'img',
        },
      ],
    }),
    new webpack.DefinePlugin({
      'APP_NAME': JSON.stringify(AppName),
      'VERSION': JSON.stringify(AppVersion),
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    }),
  ],
};
