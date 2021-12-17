const {DataTypes,Sequelize, UUIDV4}  = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('orderBeer', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true  
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
};