const Sequelize = require('sequelize');
const connection = require('../database');

const Asks = connection.define('asks', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Asks.sync({force: false}).then(() => {});

module.exports = Asks;