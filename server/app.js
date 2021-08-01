const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const { handleErrors } = require('./libs/errors');
const { validateRequests } = require('./libs/validation');
const { createSecuredEndpoints, endpointsAccessConfig } = require('./libs/permissions');
const { setStrategy, serializeUser, deserializeUser } = require('./libs/passport-configs');

const {
	SESSION_SECRET,
	COOKIE_MAX_AGE,
	SESSION_COOKIE_NAME,
	COOKIE_SECURE,
} = process.env;
const cookieMaxAge = parseInt(COOKIE_MAX_AGE, 10);
const cookieSecure = COOKIE_SECURE !== 'false';

// Endpoints sources
const about = require('./endpoints/about');
const users = require('./endpoints/v1/users/index');
const auth = require('./endpoints/v1/auth/index');

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
}));
// Passport
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
setStrategy(passport);
app.use(passport.initialize());
app.use(passport.session());
// Create endpoints permissions access
createSecuredEndpoints(app, endpointsAccessConfig);

// API
apiv1.use('/users', users);
apiv1.use('/auth', auth);
app.use('/api/v1', apiv1);

// common endpoints
app.use('/about', about);

// catch error
app.use(handleErrors);

// todo... log
// todo confirmation in mongodb:clean script
module.exports = app;
