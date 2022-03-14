db = db.getSiblingDB('harcmap');

db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [{
    role: 'readWrite',
    db: 'harcmap',
  }],
});
