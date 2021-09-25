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
      description: 'Endpoint do obsługi sesji(rejestracja, logowanie, wylogowywanie)',
    }, {
      name: 'Users',
      description: 'Endpoint do obsługi użytkowników',
    }, {
      name: 'Events',
      description: 'Endpoint do obsługi wydarzeń',
    }, {
      name: 'Teams',
      description: 'Endpoint do obsługi zespołów wydarzenia',
    }, {
      name: 'Points',
      description: 'Endpoint do obsługi punktów wydarzenia',
    }, {
      name: 'Categories',
      description: 'Endpoint do obsługi kategorii punktów wydarzenia',
    }],
  },
};

const specs = swaggerJsdoc(options);

module.exports = specs;
