const express = require('express');
const https = require('https');
const fs = require('fs');

const config = require('./config/system.config');
const userController = require('./controllers/user');

// create express app instance
const app = express();
// server port
const port = config.app.port;
const key = config.app.key;
const cert = config.app.cert;

/**
 * @description Routing
 */
// static files
app.use(express.static('public', {
	maxAge: 0
}));
// user controller
app.use('/user', userController);
// index rewrite
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

// https
https.createServer({
	key: fs.readFileSync(key),
	cert: fs.readFileSync(cert),
}, app).listen(port, () => {
	console.log(`Start HTTPS server. Listening on port ${port}`);
});
