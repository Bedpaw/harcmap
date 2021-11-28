const optimization = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /node_modules\/(?!(ol|@egjs|vue-ellipse-progress)).*/,
        name: 'vendors',
        chunks: 'all',
      },
      ol: {
        test: /node_modules\/ol/,
        name: 'ol',
        chunks: 'all',
      },
      components: {
        test: /src\/components\/(?!(pages|organisms\/guide\.vue)).*/,
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
