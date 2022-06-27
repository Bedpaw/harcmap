const http = require('http');
const path = require('path');
const { env } = process;
const { MYDEVIL_SERVER } = env;

console.log('Starting app...', { MYDEVIL_SERVER });

// preload environments variables
if (MYDEVIL_SERVER === 'true') {
  require('dotenv').config({ path: path.join(__dirname, './server/.env') });
}

// load app
const app = require('./server/app');

// load server
const httpServer = http.createServer(app);

httpServer.listen(env.SERVER_PORT);

console.log(`Server started on port ${env.SERVER_PORT}`);
