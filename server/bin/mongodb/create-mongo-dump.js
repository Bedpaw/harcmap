const fs = require('fs');
const { resolve } = require('path');

const sourceArgv = process.argv.find(item => /source=.*/.test(item));
const source = sourceArgv ? sourceArgv.replace('source=', '') : null;
const dir = source || 'default-dump';

console.log('load dumps from dir:', dir);

const users = require(`./${dir}/users.dump`);
const usersEvents = require(`./${dir}/usersEvents.dump`);
const events = require(`./${dir}/events.dump`);
const teams = require(`./${dir}/teams.dump`);
const keys = require(`./${dir}/keys.dump`);
const categories = require(`./${dir}/categories.dump`);
const points = require(`./${dir}/points.dump`);

function createCollection (collectionName, data, idsFields) {
  let inserts = '';

  data.forEach(document => {
    const newDocument = document;

    idsFields.forEach(idField => {
      const field = document[idField];

      if (Array.isArray(field)) {
        newDocument[idField] = field.map(item => `ObjectId('${item}')`);
      } else if (field) {
        newDocument[idField] = `ObjectId('${field}')`;
      }
    });

    const documentString = JSON.stringify(newDocument, null, 2);
    let newDocumentString = documentString;

    const ids = documentString.match(/"ObjectId\('.{24}'\)"/g);

    if (ids) {
      ids.forEach(id => {
        newDocumentString = newDocumentString.replace(id, id.substring(1, id.length - 1));
      });
    }

    inserts += `db.${collectionName}.insert(${newDocumentString})\n\n`;
  });

  return inserts;
}

const data = `// AUTOMATICALLY GENERATED FILE
// >>> DONT EDIT <<<
/* eslint-disable */

db = db.getSiblingDB('harcmap');

db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [{
    role: 'readWrite',
    db: 'harcmap',
  }],
});

${createCollection('users', users, ['_id', 'userEvents'])}
${createCollection('usersEvents', usersEvents, ['_id', 'eventId', 'teamId'])}
${createCollection('events', events, ['_id'])}
${createCollection('teams', teams, ['_id', 'eventId'])}
${createCollection('keys', keys, ['_id', 'eventId', 'teamId'])}
${createCollection('categories', categories, ['_id', 'eventId'])}
${createCollection('points', points, ['_id', 'eventId', 'pointCategoryId'])}
`;

fs.writeFileSync(resolve(__dirname, '__mongo-dump.js'), data, 'utf8');
