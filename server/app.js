const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const swaggerUi = require('swagger-ui-express');
const MongoStore = require('connect-mongo');
const path = require('path');
const cors = require('cors');
const specs = require('./swagger.config');

const { connectionString } = require('./libs/mongodb');
const { handleErrors } = require('./libs/errors');
const { validateRequests } = require('./libs/validation');
const { createSecuredEndpoints, endpointsAccessConfig } = require('./libs/permissions');
const { setStrategy, serializeUser, deserializeUser } = require('./libs/passport-configs');

const {
  SESSION_SECRET,
  COOKIE_MAX_AGE,
  SESSION_COOKIE_NAME,
  COOKIE_SECURE,
  SWAGGER_DOC,
  MONGO_SESSION_STORE,
  MAX_AGE,
  SERVER_ADDRESS,
} = process.env;
const cookieMaxAge = parseInt(COOKIE_MAX_AGE, 10);
const cookieSecure = COOKIE_SECURE === 'true';

// Endpoints sources
const about = require('./endpoints/v1/about');
const users = require('./endpoints/v1/users');
const user = require('./endpoints/v1/user');
const events = require('./endpoints/v1/events');
const teams = require('./endpoints/v1/teams');
const auth = require('./endpoints/v1/auth');
const points = require('./endpoints/v1/points');
const categories = require('./endpoints/v1/categories');
const keys = require('./endpoints/v1/keys');

// App instance
const app = express();
// Routers
const { Router } = express;
const apiv1 = Router();

// Middlewares
app.use(cors({
  credentials: true,
  origin: [SERVER_ADDRESS, 'https://mobile.harcmap.pl'],
}));
app.use(express.json());
// Requests body, get validation
validateRequests(app);
// Sessions settings
app.use(expressSession({
  name: SESSION_COOKIE_NAME,
  secret: SESSION_SECRET,
  proxy: true,
  cookie: {
    maxAge: cookieMaxAge,
    secure: cookieSecure,
    httpOnly: true,
    sameSite: true,
  },
  resave: false,
  saveUninitialized: false,
  store: MONGO_SESSION_STORE === 'true'
    ? MongoStore.create({
      mongoUrl: connectionString,
      stringify: false,
    })
    : undefined,
}));
// Passport
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
setStrategy(passport);
app.use(passport.initialize());
app.use(passport.session());

// Create endpoints permissions access
createSecuredEndpoints(app, endpointsAccessConfig);

/**
 * Routing
 */
// static files
// maxAge - Cache-Control header in milliseconds
app.use(express.static('../public', {
  maxAge: MAX_AGE,
}));

app.use(express.static('../vendors', {
  maxAge: MAX_AGE,
}));

// API
apiv1.use('/users', users);
apiv1.use('/user', user);
apiv1.use('/events', teams);
apiv1.use('/events', categories);
apiv1.use('/events', points);
apiv1.use('/events', keys);
apiv1.use('/events', events);
apiv1.use('/auth', auth);
apiv1.use('/about', about);
app.use('/api/v1', apiv1);

// common endpoints
if (SWAGGER_DOC === 'true')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// index rewrite
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// catch error
app.use(handleErrors);

// todo... log
// todo confirmation in mongodb:clean script
module.exports = app;
