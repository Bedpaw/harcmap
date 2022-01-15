const getDevGlobals = () => ({
  '__APP_PRODUCTION_MODE__': JSON.stringify(false),
  '__APP_TEAM_LEADER_LOGIN_DATA__': JSON.stringify({
    email: 'quest@google.com',
    password: 'Password1',
  }),
  '__APP_ADMIN_LOGIN_DATA__': JSON.stringify({
    email: 'admin@harcmap.com',
    password: 'Password1',
  }),
  '__APP_OBSERVER_LOGIN_DATA__': JSON.stringify({
    email: 'example@domain.com',
    password: 'Password1',
  }),
  '__APP_TEAM_MEMBER_LOGIN_DATA__': JSON.stringify({
    email: 'member@harcmap.com',
    password: 'Password1',
  }),
  '__VUE_OPTIONS_API__': true,
  '__VUE_PROD_DEVTOOLS__': true,
});

const getProdGlobals = () => ({
  '__APP_PRODUCTION_MODE__': JSON.stringify(true),
  '__APP_TEAM_LEADER_LOGIN_DATA__': JSON.stringify({ email: '', password: '' }),
  '__APP_ADMIN_LOGIN_DATA__': JSON.stringify({ email: '', password: '' }),
  '__APP_OBSERVER_LOGIN_DATA__': JSON.stringify({ email: '', password: '' }),
  '__APP_TEAM_MEMBER_DATA__': JSON.stringify({ email: '', password: '' }),
  '__VUE_OPTIONS_API__': true,
  '__VUE_PROD_DEVTOOLS__': false,
});

module.exports = {
  getGlobals: {
    dev: getDevGlobals,
    prod: getProdGlobals,
  },
};
