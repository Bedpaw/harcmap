const {
  SRC,
  ROOT,
} = require('./enums');
const resolve = require('./utils').resolve;
const resolveSRC = (path = '') => require('./utils').resolve(SRC + '/' + path);

const alias = {
  src: resolve(SRC),
  api: resolveSRC('api'),
  map: resolveSRC('map'),
  store: resolveSRC('store'),
  utils: resolveSRC('utils'),
  dictionary: resolveSRC('dictionary'),
  vendors: resolve(ROOT + '../vendors'),
  validateCodes: resolve(ROOT + '../server/libs/errors/codes.js'),
  config: resolveSRC('config'),
  models: resolveSRC('models'),
  data: resolve(ROOT + '/data'),
  components: resolveSRC('components'),
  atoms: resolveSRC('components/atoms'),
  mixins: resolveSRC('components/mixins'),
  molecules: resolveSRC('components/molecules'),
  organisms: resolveSRC('components/organisms'),
  pages: resolveSRC('components/pages'),
  templates: resolveSRC('components/templates'),
  plugins: resolveSRC('components/plugins'),
};

module.exports = alias;
