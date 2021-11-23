const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpackUtils = require('./webpack/utils');
const webpackRules = require('./webpack/rules').rules;
const ESLintPlugin = require('eslint-webpack-plugin');
const resolve = webpackUtils.resolve;

const AppName = 'HarcMap';
const AppVersion = webpackUtils.getAppVersionFromPackageJSON();
const publicPath = '../public';

module.exports = {
  mode: 'development',
  entry: {
    main: 'src/index.js',
  },
  stats: {
    builtAt: true,
    assets: false,
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
      // chunks: 'all',
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
