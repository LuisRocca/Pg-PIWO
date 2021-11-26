const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('beer', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
        },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        // set(value) { this.setDataValue('name', value.toLowerCase()); },
    }, 
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: { min: 0.1 },
    }, 
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 0 },
    },
});
}; 