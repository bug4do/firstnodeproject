const Sequelize = require('sequelize');
const config = require('../config.json');

let dbCfg = config.database;

const connection = new Sequelize(dbCfg.db, dbCfg.user, dbCfg.password, {
    host: dbCfg.host,
    logging: dbCfg.debug,
    dialect: 'mysql'
});

module.exports = connection;