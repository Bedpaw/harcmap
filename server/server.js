const http = require('http');
const app = require('./app');

const {
  SERVER_PORT,
} = process.env;

const httpServer = http.createServer(app);

httpServer.listen(SERVER_PORT);

console.log(`Server started on port ${SERVER_PORT}`);

module.exports = httpServer;
