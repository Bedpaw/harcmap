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
    },
  },
};

module.exports = optimization;
