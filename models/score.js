const {Model, DataTypes}= require('sequelize')
const sequelize = require('../config/connection')

class Score extends Model {}

Score.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        game_score:{
            type: DataTypes.INTEGER,
            // allowNull: false,
        },

        game:{
            type: DataTypes.STRING,
            allowNull:false,
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
        modelName: 'score'
    }
);

module.exports = Score;