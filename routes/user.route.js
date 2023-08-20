const express = require('express');
const passport = require('passport');
const UserController = require('../controllers/user.controller');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
//controller object
const controller = new UserController();

/**
 * @summary Gets all the current users registered (admin role required)
 * @yields { Array } An array of users registered
 */
router.get('/', passport.authenticate('jwt', {session: false}), checkRoles('admin'), 
async(req, res, next) => {
    try{
        const user = await controller.findAll();
        res.json(user);
    } catch(err){
        next(err);
    }
})

/**
 * @summary Gets a specific user
 * @param { Number } Id : The id of the desired user
 * @yields { User } : The data of the user requested 
 */
router.get('/:id', passport.authenticate('jwt', {session: false}), checkRoles('admin', 'user'), async (req, res, next) => {
    try{
        const user = await controller.findById(req.params.id);
        res.json(user);
    } catch(err){
        next(err);
    }
})

/**
 * @summary Creates a new user
 * The request body must consist of the following parameters:
 * @param { string } username : the desired username
 * @param { string } password : user's password
 * @param { string } email : user's email address
 * This endpoint returns a JSON object which contains the data of the generated user
 */
router.post('/', /*passport.authenticate('jwt', {session: false}), checkRoles('admin') ,*/
async(req, res, next) => {
    try{
        const body = req.body;
        const user = await controller.create(body);
        return res.json(user);
    } catch(err){
        next(err)
    }
})

/**
 * @summary Update/Change the data of the indicated user
 * The ID of the user must be provided as a parameter on the endpoint link
 * The request body must consist of the following parameters (at least one should be provided):
 * @param { string } email : user's email address
 * @param { string } password : user's password
 * The endpoint should return a JSON object containing the changes made to the user
 */
router.patch('/:id', passport.authenticate('jwt', {session:false}), checkRoles('admin', 'user'), 
async(req, res) => {
    try{
        const {id} = req.params;
        const body = req.body;
        const changes = await controller.update(id, body);
        res.json(changes)
    }catch(err){
        next(err)
    }
})

/**
 * @summary Deletes an user from the database
 * @param { Number } ID : ID of the user selected for deletion 
 * This endpoint should return the ID of the deleted user when called successfully
 */
router.delete('/:id', passport.authenticate('jwt', {session:false}), checkRoles('admin'), async(req, res) => {
    try{
        const {id} = req.params;
        const result = await controller.delete(id)
        res.json(result)
    }catch(err){
        next(err)
    }
})

module.exports = router;