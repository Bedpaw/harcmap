const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const swaggerUi = require('swagger-ui-express');
const MongoStore = require('connect-mongo');
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
} = process.env;
const cookieMaxAge = parseInt(COOKIE_MAX_AGE, 10);
const cookieSecure = COOKIE_SECURE !== 'false';

// Endpoints sources
const about = require('./endpoints/about');
const users = require('./endpoints/v1/users/index');
const events = require('./endpoints/v1/events/index');
const teams = require('./endpoints/v1/teams/index');
const auth = require('./endpoints/v1/auth/index');
const points = require('./endpoints/v1/points/index');
const categories = require('./endpoints/v1/categories/index');

// App instance
const app = express();
// Routers
const { Router } = express;
const apiv1 = Router();

// Middlewares
app.use(express.json());
// Requests body, get validation
validateRequests(app);
app.use(expressSession({
  name: SESSION_COOKIE_NAME,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: cookieMaxAge,
    secure: cookieSecure,
    httpOnly: true,
    sameSite: true,
  },
  resave: false,
  saveUninitialized: false,
  store: MONGO_SESSION_STORE === 'true' ? new MongoStore({
    url: connectionString,
    // dbName: 'harcmap-sessions',
    stringify: false,
  }) : undefined,
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
apiv1.use('/events', teams);
apiv1.use('/events', categories);
apiv1.use('/events', points);
apiv1.use('/events', events);
apiv1.use('/auth', auth);
app.use('/api/v1', apiv1);

// common endpoints
app.use('/about', about);

if (SWAGGER_DOC === 'true') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

// catch error
app.use(handleErrors);

// todo... log
// todo confirmation in mongodb:clean script
module.exports = app;
