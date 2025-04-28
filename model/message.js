const {DataTypes} = require('sequelize');
const sequelize = require('../database/connectdb');

const msgModel = sequelize.define('messages',{
    id:{
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING(15),
        allowNull: false
    },
    message:{
        type: DataTypes.STRING(1000)
    },
});

module.exports = msgModel;