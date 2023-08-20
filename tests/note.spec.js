const sequelize = require('../libs/sequelize');
const sinon = require('sinon');
const rewire = require('rewire');
let NotesController = require('../controllers/note.controller');
const controller = new NotesController();
const { Note } = require('../models/notes.model');
const boom = require('@hapi/boom');

describe('Note Controller functionality tests', () => {
    let NoteModelSample;
    let NoteData;

    beforeEach(() => {
        NoteData = {
            id: 1,
            role: 'user',
            username: 'John Doe',
            password: 'LongHash',
            email: 'john@example.com',
        };

        NoteModelSample = Note.build(NoteData)

        deleteStub = sinon.stub(sequelize.models.Note, 'destroy').resolves(1);
        findPkStub = sinon.stub(sequelize.models.Note, 'findByPk').resolves(NoteModelSample);
        findOneStub = sinon.stub(sequelize.models.Note, 'findOne').resolves(NoteModelSample);
        createStub = sinon.stub(sequelize.models.Note, 'create').resolves(NoteModelSample);
        updateStub = sinon.stub(sequelize.models.Note, 'update').resolves(NoteModelSample);
        findAllStub = sinon.stub(sequelize.models.Note, 'findAll').resolves(NoteModelSample);
    })

    afterEach(() => {
        NoteController = rewire('../controllers/note.controller');
        sinon.restore();
    })

    /**
     * Create tests
     */
    test('Returns a model instance', async () => {
        const Note = await controller.create(NoteData);
        expect(Note).toEqual(NoteModelSample);
    })

    test('Returns an error (no data provided)', async () => {
        const Note = await controller.create();
        expect(Note).toEqual(boom.badData('No data provided'));
    })

    /**
     * Find tests
     */
    test('Returns the indicated model', async () => {
        const Note = await controller.findById(1);
        expect(Note).toEqual(NoteModelSample);
    })

    test('Returns an error (No id provided)', async () => {
        const Note = await controller.findById();
        expect(Note).toEqual(boom.badData('No id provided'));
    })

    test('Should return an array of models, or a single model if there is only one registered', async () => {
        const Notes = await controller.findAll();
        expect(Notes).toBe(NoteModelSample);
    })

    /**
     * patch tests
     */

    test('Returns the updated model', async () => {
        const Note = await controller.update(1,{NoteData});
        expect(Note).toBe(1);
    })

    test('Should return error (no data provided)', async () => {
        const Note = await controller.update(1);
        expect(Note).toStrictEqual(boom.badData('No data provided'));
    })
    
    test('Should return error (no id provided)', async () => {
        const Note = await controller.update(null,{});
        expect(Note).toStrictEqual(boom.badData('No id provided'));
    })

    /**
     * Delete tests
     */

    test('Should return error (no id provided)', async () => {
        const Note = await controller.delete();
        expect(Note).toStrictEqual(boom.badData('No id provided'));
    })

    test('Should return the provided ID', async () => {
        const Note = await controller.delete(1);
        expect(Note).toBe(1);
    })

})