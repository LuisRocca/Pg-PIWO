const { DataTypes } = require('sequelize');

 module.exports = (sequelize) => {
  sequelize.define('user', {
    name: {
        type: DataTypes.STRING, 
        required: true ,
        allowNull: true
      },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail:true,
       }
     },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
        min: 18,
        }
    },
    password: {
      type: DataTypes.STRING,
       required: true 
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
       required: true,
       default: false 
      },
  }); 
 };