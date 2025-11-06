// index.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');

const swaggerDefinition = require('./swagger/swaggerDef');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize OpenAPI Validator
app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerSpec,
    validateRequests: true,
    validateResponses: false,
  })
);

// Routes
app.use(userRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      details: err.errors,
    },
  });
});

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
  console.log('📚 Swagger docs at http://localhost:3000/api-docs');
});
