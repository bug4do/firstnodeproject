const Sequelize = require('sequelize');
const connection = require('../database');

const Replies = connection.define('replies', {

});

Replies.sync({force: false}).then(() => {});

module.exports = Replies;