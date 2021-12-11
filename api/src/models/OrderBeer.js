const {DataTypes,Sequelize}  = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('orderBeer', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: { min: 0.1 },
        }
    });
};