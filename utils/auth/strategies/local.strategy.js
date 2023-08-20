const { Strategy } = require('passport-local')
const UserController = require('../../../controllers/user.controller')
const controller = new UserController;
const boom = require('@hapi/boom')
const bcrypt = require('bcryptjs')

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try{
        const user = await controller.findByEmail(email)
        if(!user){
            //Unauthorized
            done(boom.unauthorized(),false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            done(boom.unauthorized(),false);
        }
        delete user.dataValues.password;
        done(null, user);
    }catch(error){
        done(error, false)
    }
});

module.exports = localStrategy;