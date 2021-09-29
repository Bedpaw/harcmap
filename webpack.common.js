const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpackUtils = require('./webpack/utils');
const webpackRules = require('./webpack/rules').rules;
const resolve = webpackUtils.resolve;

const AppName = 'HarcMap';
const AppVersion = webpackUtils.getAppVersionFromPackageJSON();

module.exports = {
  mode: 'development',
  entry: {
    main: 'src/index.js',
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
    path: resolve('public'),
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
      assets: resolve('src/assets'),
      vendors: resolve('vendors'),

      atoms: resolve('src/components/atoms'),
      extends: resolve('src/components/extends'),
      mixins: resolve('src/components/mixins'),
      molecules: resolve('src/components/molecules'),
      organisms: resolve('src/components/organisms'),
      pages: resolve('src/components/pages'),
      templates: resolve('src/components/templates'),
    },
    extensions: ['.vue', '.sass', '.js', '.css'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets',
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
