const { DataTypes } = require('sequelize');
const sequelize = require('../database/connectdb'); // Importing the sequelize instance

const blogModel = sequelize.define('blogs', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    img_public_id: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    img_url: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true, //
});

module.exports = blogModel;