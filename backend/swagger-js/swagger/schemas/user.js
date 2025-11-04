// swagger/schemas/user.js
module.exports = {
  User: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string' },
      email: { 
        type: 'string',
        format: 'email', 
        pattern: '^[\\w.-]+@example\\.com$' 
      },
    },
  },
};
