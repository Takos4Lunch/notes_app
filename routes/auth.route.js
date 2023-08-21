const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Endpoint for authentication, the user must provide their email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: user's email
 *                 example: jhonexample@email.com
 *               password:
 *                 type: string
 *                 description: user's password
 *                 example: bigpassword
 *     responses:
 *       200:
 *         description: A Json object containing the data of the user, and their generated JSON web token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       role:
 *                         type: string
 *                         description: User's role
 *                         example: user
 *                       username:
 *                         type: string
 *                         description: User's nickname.
 *                         example: johnexample
 *                       email:
 *                         type: string
 *                         description: User's email address.
 *                         example: johnexample@email.com
 *                 token:
 *                   type: string
 *                   description: Generated token for user authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkyNTg5OTE2fQ.dxc0bTzxskOAHkM9_Q2mfmRybtOs9b6q1rUzINgS03A
 */
router.post('/login', passport.authenticate('local', {session: false}) , async (req, res, next) => {
    try {
        const user = req.user;
        const secret = config.secret;
        const payload = {
            sub: user.id,
            role: user.role,
        }
        const token = jwt.sign(payload, secret)
        res.json({
            user,
            token
        })
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;