// swagger/swaggerDef.js
const userSchemas = require('./schemas/user');

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
  },
  servers: [
    { url: 'http://localhost:3000' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ...userSchemas,
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
