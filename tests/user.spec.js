const sequelize = require('../libs/sequelize');
const sinon = require('sinon');
const rewire = require('rewire');
let UserController = require('../controllers/user.controller');
const controller = new UserController();
const { User } = require('../models/user.model');
const boom = require('@hapi/boom');

describe('User Controller functionality tests', () => {
    let userModelSample;
    let userData;

    beforeEach(() => {
        userData = {
            id: 1,
            role: 'user',
            username: 'John Doe',
            password: 'LongHash',
            email: 'john@example.com',
        };

        userModelSample = User.build(userData)

        deleteStub = sinon.stub(sequelize.models.User, 'destroy').resolves(1);
        findPkStub = sinon.stub(sequelize.models.User, 'findByPk').resolves(userModelSample);
        findOneStub = sinon.stub(sequelize.models.User, 'findOne').resolves(userModelSample);
        createStub = sinon.stub(sequelize.models.User, 'create').resolves(userModelSample);
        updateStub = sinon.stub(sequelize.models.User, 'update').resolves(userModelSample);
        findAllStub = sinon.stub(sequelize.models.User, 'findAll').resolves(userModelSample);
    })

    afterEach(() => {
        UserController = rewire('../controllers/user.controller');
        sinon.restore();
    })

    /**
     * Create tests
     */
    test('Returns a model instance', async () => {
        const user = await controller.create(userData);
        expect(user).toEqual(userModelSample);
    })

    test('Returns an error (no data provided)', async () => {
        const user = await controller.create();
        expect(user).toEqual(boom.badData('No data provided'));
    })

    /**
     * Find tests
     */
    test('Returns the indicated model', async () => {
        const user = await controller.findById(1);
        expect(user).toEqual(userModelSample);
    })

    test('Returns an error (No id provided)', async () => {
        const user = await controller.findById();
        expect(user).toEqual(boom.badData('No id provided'));
    })

    test('Should return an array of models, or a single model if there is only one registered', async () => {
        const users = await controller.findAll();
        expect(users).toBe(userModelSample);
    })

    test('Should return the model corresponding to the email provided', async () => {
        const users = await controller.findByEmail('john@example.com');
        expect(users).toBe(userModelSample);
    })

    test('Should return error (no email provided)', async () => {
        const users = await controller.findByEmail();
        expect(users).toStrictEqual(boom.badData('No email provided'));
    })

    /**
     * patch tests
     */

    test('Returns the updated model', async () => {
        const user = await controller.update(1,{userData});
        expect(user).toBe(1);
    })

    test('Should return error (no data provided)', async () => {
        const user = await controller.update(1);
        expect(user).toStrictEqual(boom.badData('No data provided'));
    })
    
    test('Should return error (no id provided)', async () => {
        const user = await controller.update(null,{});
        expect(user).toStrictEqual(boom.badData('No id provided'));
    })

    /**
     * Delete tests
     */

    test('Should return error (no id provided)', async () => {
        const user = await controller.delete();
        expect(user).toStrictEqual(boom.badData('No id provided'));
    })

    test('Should return the provided ID', async () => {
        const user = await controller.delete(1);
        expect(user).toBe(1);
    })

})