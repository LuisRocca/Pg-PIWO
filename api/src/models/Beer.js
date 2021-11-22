const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('beer', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) { this.setDataValue('name', value.toLowerCase()); },
    }, 
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0.1 },
    }, 
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
    }, 
    impression: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) { this.setDataValue('impression', value.toLowerCase()); }
    },
    aroma: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) { this.setDataValue('aroma', value.toLowerCase()); }
    },
    flavor: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) { this.setDataValue('flavor', value.toLowerCase()); }
      }, 
    image: {
        type: DataTypes.TEXT,
        defaultValue: "https://www.billsbeercans.com/~billsbee/canstore/images/IMG_2947.JPG"
    }, 
    IBU: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
    }, 
    ABV: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
    }, 
    history: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
};