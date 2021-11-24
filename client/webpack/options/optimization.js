const optimization = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /node_modules\/(?!ol).*/,
        name: 'vendors',
        chunks: 'all',
      },
      ol: {
        test: /node_modules\/ol/,
        name: 'ol',
        chunks: 'all',
      },
      components: {
        test: /src\/components\/(atoms|molecules|organisms|templates|mixins|extends)/,
        name: 'components',
        chunks: 'all',
      },
      pages: {
        test: /src\/components\/pages/,
        name: 'pages',
        chunks: 'all',
      },
      utils: {
        test: /src\/(utils|map)/,
        name: 'utils',
        chunks: 'all',
      },
    },
  },
};

module.exports = optimization;
