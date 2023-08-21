const express = require('express');
const passport = require('passport');
const NotesController = require('../controllers/note.controller');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
//controller object
const controller = new NotesController();

router.get('/', passport.authenticate('jwt', {session: false}), checkRoles('admin','user'), //Should return all the notes that belong to the user
async(req, res, next) => {
    try{
        const user = await controller.findAllByUser(req.user.sub);
        res.json(user);
    } catch(err){
        next(err);
    }
})

router.get('/:id', passport.authenticate('jwt', {session: false}), checkRoles('admin', 'user'), async (req, res, next) => {
    try{
        const user = await controller.findById(req.params.id);
        res.json(user);
    } catch(err){
        next(err);
    }
})

router.post('/', passport.authenticate('jwt', {session: false}), checkRoles('admin', 'user') ,
async(req, res, next) => {
    try{
        const body = {
            ...req.body,
            UserId: req.user.sub
        };
        const user = await controller.create(body);
        return res.json(user);
    } catch(err){
        next(err)
    }
})

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