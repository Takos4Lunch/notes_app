const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * @summary Endpoint used for authentication
 * The request body must consist of the following parameters:
 * @param { string } email : user's email address
 * @param { string } password : user's password
 * @yields { jsonwebtoken } 
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