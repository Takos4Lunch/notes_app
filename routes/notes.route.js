const express = require('express');
const passport = require('passport');
const NotesController = require('../controllers/note.controller');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
//controller object
const controller = new NotesController();

/**
 * @summary Gets all notes avaliable
 * @yields { jsonwebtoken } 
 */
router.get('/', passport.authenticate('jwt', {session: false}), checkRoles('admin','user'), //Should return all the notes that belong to the user
async(req, res, next) => {
    try{
        const user = await controller.findAllByUser(req.user.sub);
        res.json(user);
    } catch(err){
        next(err);
    }
})

/**
 * @summary Get a specific note
 * The request must contain the following parameter(s):
 * @param { Number } ID : ID of the requested note
 * Returns the specified note, if available
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
 * @summary Create a note
 * This note is asociated to the user that generates it
 * The request body must consist of the following parameters:
 * @param { string } category : Desired category for the note
 * @param { string } body : Note's body
 * Returns a JSON object containing the data of the generated note
 */
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

/**
 * @summary Update/Change a note
 * @param { Number } ID: The ID of the note to update.
 * The request body must consist of the following parameters:
 * @param { string } category : Desired category for the note
 * @param { string } body : Note's body
 * Returns a JSON object containing the data of the modified note
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
 * @summary Deletes a note
 * @param { Number } ID: The ID of the note to update.
 * @yields { Number } ID: The ID of the deleted note.
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