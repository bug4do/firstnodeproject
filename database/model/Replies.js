const Sequelize = require('sequelize');
const connection = require('../database');

const Replies = connection.define('replies', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    askId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Replies.sync({force: true}).then(() => {});

module.exports = Replies;