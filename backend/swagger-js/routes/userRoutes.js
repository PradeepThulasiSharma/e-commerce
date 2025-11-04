const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 */

// const validateUserInput = (req, res, next) => {
//   const { email } = req.body;
//   if (!email.endsWith('@example.com')) {
//     return res.status(400).json({ error: 'Invalid email domain' });
//   }
//   next();
// };

// router.post('/users', validateUserInput, userController.createUser);
router.post('/users', userController.createUser);

module.exports = router;