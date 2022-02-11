const {Model, DataTypes}= require('sequelize')
const sequelize = require('../config/connection')

class Time extends Model {}

Time.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        time:{
            type: DataTypes.TIME(3),
            allowNull: false,
        },

        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'time'
    }
);

module.exports = Time;