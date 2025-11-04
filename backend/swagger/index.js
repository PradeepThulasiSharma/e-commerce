const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');

const app = express();
app.use(express.json());

// Load Swagger spec from YAML file
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Register OpenAPI validation middleware (Correct usage)
app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, './swagger.yaml'),
    validateRequests: true, // Validate request body, query, params, headers
    validateResponses: false, // Optional: enable if you want response validation
  })
);

// ✅ Define routes (must match paths in your swagger.yaml)
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', (req, res) => {
  res.json({ message: 'User created', data: req.body });
  console.log('sample data');
});

// ✅ Error handler for validation errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      details: err.errors,
    },
  });
});

// ✅ Start the server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
  console.log('📚 Swagger docs available at http://localhost:3000/api-docs');
});

