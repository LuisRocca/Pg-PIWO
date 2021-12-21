require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;

const sequelize =
process.env.NODE_ENV === "production"
? new Sequelize({
    database: DB_NAME,
    dialect: "postgres",
    host: DB_HOST,
    port: 5432,
    username: DB_USER,
    password: DB_PASSWORD,
    pool: {
      max: 3,
      min: 1,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        // Ref.: https://github.com/brianc/node-postgres/issues/2009
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
  })
:new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/piwobeer`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Beer, Review,Order, Category,OrderBeer, OrderDetail } = sequelize.models;

// Aca vendrian las relaciones

//Relacion Reviews clientes productos
User.belongsToMany(Beer, {through: Review}) // da el producto id 
Beer.belongsToMany(User, {through: Review}) //  el user id, EL producto tiene reviews de muchos usuarios

// Relaciones del usuario producto 
User.belongsToMany(Beer, {through: 'user_beer'}) //tabla intermedia
Beer.belongsToMany(User, {through: 'user_beer'})

// Relaciones de la categoria - producto 
Category.belongsToMany(Beer, {through: 'category_beer'}) //tabla intermedia
Beer.belongsToMany(Category, {through: 'category_beer'})

User.hasMany(Order)

// Relaciones de Una orden solo puede tener 1 Usuario
Order.belongsTo(User)

// Relaciones de 
Order.hasMany(OrderBeer)
OrderBeer.belongsTo(Order)

// Relaciones de 
Order.hasMany(OrderBeer)
OrderBeer.belongsTo(Order)
Beer.hasMany(OrderBeer)
OrderBeer.belongsTo(Beer)


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};