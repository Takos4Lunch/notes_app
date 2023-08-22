const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class NotesController{
    constructor(){}

    async create(data){
        if(!data){
            return boom.badData('No data provided');
        }
        const newNote = await models.Note.create({
            ...data
        })
        return newNote;
    }

    async findById(id){
        if(!id){
            return boom.badData('No id provided');
        }
        const Note = await models.Note.findByPk(id);
        return Note;
    }

    async findAll(){
        const results = await models.Note.findAll();
        return results;
    }

    async findAllByUser(id){
        const results = await models.Note.findAll({
            where: {
                '$Note.UserId$' : id
            }
        })
        return results;
    }

    async update(id, changes){
        try {
            if(!changes){
                return boom.badData('No data provided');
            }
            const note = await this.findById(id);
            await note.update({
                ...changes
            });
            await note.save();
            return note.id;
        } catch (error) {
                return boom.badData('No id provided');
        }
    }

    async delete(id){
        if(!id){
            return boom.badData('No id provided');
        }

        const result = await models.Note.destroy({
            where: {
                id: id,
            }
        });
        return result;
    }
}

module.exports = NotesController