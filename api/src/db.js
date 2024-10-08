// require('dotenv').config();
// const { Sequelize } = require('sequelize');
// const fs = require('fs');
// const path = require('path');
// const {
//   DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
// } = process.env;

// //Aqui se hace la conexion con mi base de datos, mis credenciales estan en mi archivo .env
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
// const basename = path.basename(__filename);

// const modelDefiners = [];

// // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync(path.join(__dirname, '/models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, '/models', file)));
//   });

// // Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners.forEach(model => model(sequelize));
// // Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);

// // En sequelize.models están todos los modelos importados como propiedades
// // Para relacionarlos hacemos un destructuring
// const { Recipe, Diets } = sequelize.models; //Importar mis Modelos para poder hacer la relacion 

// // Aca vendrian las relaciones
// // Product.hasMany(Reviews);
// //Mi tabla intermedia , relacion de muchos a muchos , atraves de recipe_diets
// Recipe.belongsToMany(Diets, { through: 'recipe_diets' }); //recipe_diets es mi tabla intermedia
// Diets.belongsToMany(Recipe, { through: 'recipe_diets' });


// module.exports = {
//   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
//   conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
// };


// db.js
const db = require('../firebaseAdmin'); // Reemplaza la configuración de PostgreSQL/Sequelize con Firebase Admin SDK

// Aquí podrías exportar `db` si necesitas usarlo en otras partes de tu API
module.exports = db;
