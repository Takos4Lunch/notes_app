const { models } = require('../libs/sequelize');
const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');
const config = require('../config/config');

class UserController{
    constructor(){}

    async create(data){
        if(!data){
            return boom.badData('No data provided');
        }
        //Password encryption
        const hash = bcrypt.hashSync(data.password, 10);
        const newUser = await models.User.create({
            ...data,
            password: hash,
        })
        delete newUser.dataValues.password;
        delete newUser.dataValues.role;
        return newUser;
    }

    async findById(id){
        if(!id){
            return boom.badData('No id provided');
        }
        const user = await models.User.findByPk(id);
        return user;
    }

    async findByEmail(email){
        if(!email){
            return boom.badData('No email provided');
        }
        
        const user = await models.User.findOne({
            where: {email}
        });

        return user;
    }

    async findAll(){
        const results = await models.User.findAll();
        return results;
    }

    async update(id, changes){
        try {
            if(!changes){
                return boom.badData('No data provided');
            }
            const user = await this.findById(id);
            //This function should NOT allow to update the password
            //The aforementioned functionality will be moved to another endpoint
            await user.update({
                ...changes
            });
            await user.save();
            return user.id;
        } catch (error) {
                return boom.badData('No id provided');
        }
    }

    async delete(id){
        if(!id){
            return boom.badData('No id provided');
        }

        const result = await models.User.destroy({
            where: {
                id: id,
            }
        });
        return result; //returns the number of destroyed rows, which in this case, will be 1
    }
}

module.exports = UserController;