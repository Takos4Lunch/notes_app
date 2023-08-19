const { Sequelize, DataTypes, Model} = require('sequelize');

const TABLENAME = 'notes';

class Note extends Model {
    static config(sequelize){
        return {
            sequelize,
            tableName: TABLENAME,
            modelName: 'Note',
            timestamps: false
        }
    }

    static assoc(models){
        this.belongsTo(models.User); //Relation One-To-Many
    }
}

const noteSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
}

module.exports = {Note, noteSchema}