import { logical } from 'vendors/logical';

export const vuexVModel = (config = {}) => {
  let {
    module = '',
    getter = '',
    mutation = '',
    nameOnChangeMethod = '',
    convertMethods = {
      get: v => v,
      set: v => v,
    },
  } = config;

  if (!mutation)
    mutation = 'set' + getter[0].toUpperCase() + getter.slice(1);

  if (module[module.length - 1] !== '/')
    module = module + '/';

  return {
    get () {
      return convertMethods.get(this.$store.getters[module + getter]);
    },
    set (value) {
      const method = nameOnChangeMethod === '' ? () => undefined : this[nameOnChangeMethod];

      this.$store.commit(module + mutation, convertMethods.set(value));
      if (logical.isFunction(method))
        method();

    },
  };
};

export const mapVuexVModel = (module, list = [], config = {}) => {
  const map = {};
  list.forEach((getter) => {
    map[getter] = vuexVModel({
      module,
      getter,
      ...config,
    });
  });
  return map;
};
