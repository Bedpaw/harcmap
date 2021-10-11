const Events = require('../../../../models/events');
const mongodb = require('../../../../libs/mongodb');

// TODO secure from ddos, add captcha
async function checkKey (eventKey) {
  return {};
}

module.exports = checkKey;
