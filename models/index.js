const { User, userSchema} = require('./user.model');
const { Note, noteSchema} = require('./notes.model');

function assocModels(sequelize) {
    User.init(userSchema, User.config(sequelize))
    Note.init(noteSchema, Note.config(sequelize))

    User.assoc(sequelize.models)
    Note.assoc(sequelize.models)
}

module.exports = assocModels