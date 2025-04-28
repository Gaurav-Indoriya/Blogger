const { DataTypes } = require('sequelize');
const sequelize = require('../database/connectdb'); // Importing the sequelize instance

const adminModel = sequelize.define('admin', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    freezeTableName: true, //
});

module.exports = adminModel;
