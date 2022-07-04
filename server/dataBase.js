const Sequelize = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(process.env.DATABASE_URL,{
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})
// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.USER_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT
//     }
// )
