const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("open", "closed", "cancelled"),
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
    },

    numero_telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "No es una dirección de correo electrónico.",
        },
      },
    },
  });
};
