const { Router } = require('express');
const requestSchema = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const serverpj = require('../../../package.json');
const clientpj = require('../../../../client/package.json');
const mainpj = require('../../../../package.json');

const router = Router();

addEndpointValidation('/api/v1/about', requestSchema);

// Information about application
router.route('/')
  .get((req, res) => {
    const informationAboutApp = {
      appName: mainpj.name,
      author: mainpj.author,
      version: mainpj.version,
      appClientVersion: clientpj.version,
      appServerVersion: serverpj.version,
    };

    res.send(informationAboutApp);
  });

module.exports = router;
