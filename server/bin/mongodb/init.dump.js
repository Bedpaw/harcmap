db = db.getSiblingDB('boilerplate-expressjs');

db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [{
    role: 'readWrite',
    db: 'harcmap',
  }],
});
