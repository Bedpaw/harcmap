const resolve = require('./utils').resolve;

const alias = {
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
};

module.exports = alias;
