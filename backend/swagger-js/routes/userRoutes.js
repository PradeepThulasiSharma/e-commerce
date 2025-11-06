const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, generateToken } = require('../middleware/auth');

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user (requires Bearer token)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post('/users', verifyToken, userController.createUser);

/**
 * @openapi
 * /token:
 *   post:
 *     summary: Generate a JWT token (public endpoint)
 *     security: []   # 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a JWT token
 */
router.post('/token', (req, res) => {
  const token = generateToken(req.body);
  res.json({ token });
});

module.exports = router;
