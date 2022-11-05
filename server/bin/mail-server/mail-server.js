const SMTPServer = require('smtp-server').SMTPServer;
const fs = require('fs');
const path = require('path');

const options = {
  secure: true,
  logger: true,
  transactionLog: true,
  debug: true,
  key: fs.readFileSync(path.resolve(__dirname, '../server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../server.pem')),
  onConnect (session, callback) {
    console.log(session);
    return callback();
  },
  onAuth (auth, session, callback) {
    if (auth.username !== 'mail@harcmap.pl' || auth.password !== 'Password1')
      return callback(new Error('Invalid username or password'));

    callback(null, { user: 'mail@harcmap.pl' });
  },
};

const server = new SMTPServer(options);

server.on('connect', conn => {
  console.log('Connect $s', conn);
});

server.on('error', err => {
  console.log('Error %s', err);
});

server.listen(465);
