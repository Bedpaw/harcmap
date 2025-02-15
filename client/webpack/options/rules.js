const rules = [
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
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
    },
    exclude: /node_modules/,
  },
];

module.exports = rules;
