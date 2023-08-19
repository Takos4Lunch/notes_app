const { Sequelize, DataTypes, Model} = require('sequelize');

const TABLENAME = 'users';

class User extends Model {
    static config(sequelize){
        return {
            sequelize,
            tableName: TABLENAME,
            modelName: 'User',
            timestamps: false
        }
    }

    static assoc(models){
        this.hasMany(models.Note); //Has to be created
    }
}

const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

module.exports = {User, userSchema}