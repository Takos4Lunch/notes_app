const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config')

const assocModels = require('../models')

const sequelize = new Sequelize(config.dbname,config.user,config.password, {
    host: config.host,
    dialect: 'postgres'
})

assocModels(sequelize);
/*
sequelize.sync({force: true});
*/
module.exports = sequelize;