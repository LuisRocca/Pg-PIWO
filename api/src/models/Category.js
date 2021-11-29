const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            },
        name: {
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.TEXT,
        },
      });
    };