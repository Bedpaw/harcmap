const swaggerJsdoc = require('swagger-jsdoc');
const { name, version, description, author } = require('./package.json');

const options = {
  // List of files to be processed
  apis: [
    './endpoints/**/*.swagger.yml',
    './specs/**/*.swagger.yml',
  ],
  definition: {
    openapi: '3.0.0',
    // App info
    info: {
      title: name,
      version,
      description,
      contact: {
        name: author,
      },
    },
    // Documentation endpoints groups
    tags: [{
      name: 'About',
      description: 'Endpoint zwracający informacje o aplikacji',
    }, {
      name: 'Auth',
      description: 'Endpoint do operacji na sesji(rejestracja, logowanie, wylogowywanie)',
    }, {
      name: 'Users',
      description: 'Endpoint do operacji na użytkownikach',
    }, {
      name: 'Events',
      description: 'Endpoint do operacji na wydarzeniach',
    }],
  },
};

const specs = swaggerJsdoc(options);

module.exports = specs;
