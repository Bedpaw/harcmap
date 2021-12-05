
const getDevGlobals = () => ({
  '__APP_PRODUCTION_MODE__': JSON.stringify(false),
  '__APP_USER_LOGIN_DATA__': JSON.stringify({
    user: 'example@domain.com',
    password: 'Password1',
  }),
  '__APP_ADMIN_LOGIN_DATA__': JSON.stringify({
    user: 'admin@harcmap.com',
    password: 'Password1',
  }),
  '__VUE_OPTIONS_API__': true,
  '__VUE_PROD_DEVTOOLS__': true,
});

const getProdGlobals = () => ({
  '__APP_PRODUCTION_MODE__': JSON.stringify(true),
  '__APP_USER_LOGIN_DATA__': JSON.stringify({ user: '', password: '' }),
  '__APP_ADMIN_LOGIN_DATA__': JSON.stringify({ user: '', password: '' }),
  '__VUE_OPTIONS_API__': true,
  '__VUE_PROD_DEVTOOLS__': false,
});

module.exports = {
  getGlobals: {
    dev: getDevGlobals,
    prod: getProdGlobals,
  },
};
