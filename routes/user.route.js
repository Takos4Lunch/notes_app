const express = require('express');
const passport = require('passport');
const UserController = require('../controllers/user.controller');
const { checkRoles } = require('../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const { getUserSchema, createUserSchema } = require('../schemas/user.schema');

const router = express.Router();
//controller object
const controller = new UserController();

router.get('/', passport.authenticate('jwt', {session: false}), checkRoles('admin'), 
async(req, res, next) => {
    try{
        const user = await controller.findAll();
        res.json(user);
    } catch(err){
        next(err);
    }
})

router.get('/:id', passport.authenticate('jwt', {session: false}), checkRoles('admin', 'user'),
validatorHandler(getUserSchema,'params'),
async (req, res, next) => {
    try{
        const user = await controller.findById(req.params.id);
        res.json(user);
    } catch(err){
        next(err);
    }
})

router.post('/', passport.authenticate('jwt', {session: false}), checkRoles('admin') ,
validatorHandler(createUserSchema, 'body'),
async(req, res, next) => {
    try{
        const body = req.body;
        const user = await controller.create(body);
        return res.json(user);
    } catch(err){
        next(err)
    }
})

router.patch('/:id', passport.authenticate('jwt', {session:false}), checkRoles('admin', 'user'), 
validatorHandler(getUserSchema, 'params'),
validatorHandler(createUserSchema, 'body'),
async(req, res) => {
    try{
        const {id} = req.params;
        const body = req.body;
        const changes = await controller.update(id, body);
        res.json({
            id: changes
        })
    }catch(err){
        next(err)
    }
})

router.delete('/:id', passport.authenticate('jwt', {session:false}), checkRoles('admin'),
validatorHandler(getUserSchema, 'params'),
async(req, res) => {
    try{
        const {id} = req.params;
        const result = await controller.delete(id)
        res.json(result)
    }catch(err){
        next(err)
    }
})

module.exports = router;