const {
  SRC,
  ROOT,
} = require('./enums');
const resolve = require('./utils').resolve;
const resolveSRC = (path = '') => require('./utils').resolve(SRC + '/' + path);

const alias = {
  vue: 'vue/dist/vue.esm.js',
  src: resolve(SRC),
  api: resolveSRC('api'),
  map: resolveSRC('map'),
  store: resolveSRC('store'),
  utils: resolveSRC('utils'),
  vendors: resolve(ROOT + '../vendors'),
  validateCodes: resolve(ROOT + '../lib/validateCodes.js'),
  config: resolveSRC('config'),
  models: resolveSRC('models'),

  atoms: resolveSRC('components/atoms'),
  extends: resolveSRC('components/extends'),
  mixins: resolveSRC('components/mixins'),
  molecules: resolveSRC('components/molecules'),
  organisms: resolveSRC('components/organisms'),
  pages: resolveSRC('components/pages'),
  templates: resolveSRC('components/templates'),
};

module.exports = alias;
