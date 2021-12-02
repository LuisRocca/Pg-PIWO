const { DataTypes, Sequelize, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('category', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,            },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        }
      });
    };