const { Sequelize } = require('sequelize');

const connectdb = new Sequelize('blogger', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = connectdb;
