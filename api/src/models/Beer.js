const { DataTypes, Sequelize, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('beer', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
        // autoIncrement: true
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
    impression: {
        type: DataTypes.TEXT,
        allowNull: true,
        // set(value) { this.setDataValue('impression', value.toLowerCase()); }
    },
    aroma: {
        type: DataTypes.TEXT,
        allowNull: true,
        // set(value) { this.setDataValue('aroma', value.toLowerCase()); }
    },

    flavor: {
        type: DataTypes.TEXT,
        allowNull: true,
        // set(value) { this.setDataValue('flavor', value.toLowerCase()); }
      }, 
    image: {
        type: DataTypes.STRING,
        defaultValue: "https://www.billsbeercans.com/~billsbee/canstore/images/IMG_2947.JPG"
    }, 
    IBU: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }, 
    ABV: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }, 
    history: {
        type: DataTypes.TEXT,
        allowNull: true
    }, 
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    examples: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    
  });
};