const Sequelize = require('sequelize');

const connection = new Sequelize('ask_system', 'root', '', {
    host: 'localhost',
    logging: false,
    dialect: 'mysql'
});

module.exports = connection;