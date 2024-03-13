const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API emprendimientos',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'], // Rutas de tu API
};

console.log("Options", options);

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
