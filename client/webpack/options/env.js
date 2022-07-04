const commonGlobals = {
  '__REPORT_EMAIL__': JSON.stringify('kontakt@harcmap.pl'),
  '__MAIN_DOMAIN__': JSON.stringify('harcmap.pl'),
};

const getDevGlobals = () => ({
  ...commonGlobals,
  '__APP_PRODUCTION_MODE__': JSON.stringify(false),
  '__APP_TEAM_LEADER_LOGIN_DATA__': JSON.stringify({
    email: 'user3@harcmap.pl',
    password: 'Password1',
  }),
  '__APP_ADMIN_LOGIN_DATA__': JSON.stringify({
    email: 'user1@harcmap.pl',
    password: 'Password1',
  }),
  '__APP_OBSERVER_LOGIN_DATA__': JSON.stringify({
    email: 'user6@harcmap.pl',
    password: 'Password1',
  }),
  '__APP_TEAM_MEMBER_LOGIN_DATA__': JSON.stringify({
    email: 'user7@harcmap.pl',
    password: 'Password1',
  }),
  '__VUE_OPTIONS_API__': true,
  '__VUE_PROD_DEVTOOLS__': true,
});

const getProdGlobals = () => ({
  ...commonGlobals,
  '__APP_PRODUCTION_MODE__': JSON.stringify(true),
  '__APP_TEAM_LEADER_LOGIN_DATA__': JSON.stringify({ email: '', password: '' }),
  '__APP_ADMIN_LOGIN_DATA__': JSON.stringify({ email: '', password: '' }),
  '__APP_OBSERVER_LOGIN_DATA__': JSON.stringify({ email: '', password: '' }),
  '__APP_TEAM_MEMBER_LOGIN_DATA__': JSON.stringify({ email: '', password: '' }),
  '__VUE_OPTIONS_API__': true,
  '__VUE_PROD_DEVTOOLS__': false,
});

module.exports = {
  getGlobals: {
    dev: getDevGlobals,
    prod: getProdGlobals,
  },
};
