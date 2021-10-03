const resolve = require('./utils').resolve;

module.exports = {
  rules: [
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [
        resolve('src'),
      ],
      options: {
        formatter: require('eslint-friendly-formatter'),
      },
    },
    {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        'css-loader?' + JSON.stringify({ url: false }),
        'sass-loader',
      ],
    },
    {
      test: /\.(css)$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        'plugins': [
          ['babel-plugin-transform-builtin-extend', {
            globals: ['Error'],
          }],
        ],
      },
    },
    {
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
};
