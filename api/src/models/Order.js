const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('order', {
        // quantity: {
        //   type: DataTypes.FLOAT,
        //   allowNull: true
        // },
        // totalPrice: {
        //     type: DataTypes.ARRAY(DataTypes.FLOAT),
        //     allowNull: false
        // },
        // unity_price: {
        //   type: DataTypes.FLOAT,
        //   allowNull: true,
        //   validate: { min: 0.1 },
        // },
        carrito: {
          type: DataTypes.ARRAY(DataTypes.JSON),
          allowNull: true
        },
         status: {
            type: DataTypes.ENUM('open', 'created', 'processing', 'cancelled', 'completed'),
            allowNull: false
        },
         address: {
            type: DataTypes.TEXT,
        },
         email: {
            type: DataTypes.STRING,
            validate: {
              isEmail: {
                msg: 'No es una dirección de correo electrónico.'
              }
            },
          },
        payment_id:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        payment_status:{
            type: DataTypes.STRING,
            defaultValue: ""
        },
        merchant_order_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        title: {
          type: DataTypes.STRING
        }
    });
};
