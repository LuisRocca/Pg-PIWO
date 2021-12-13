const {DataTypes,Sequelize}  = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('orderBeer', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: { min: 0.1 },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
};