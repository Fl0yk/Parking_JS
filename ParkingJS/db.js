const { Sequelize } = require('sequelize')

//Используем ОРМ для взаимодействия с бд
//Задаем конфигурацию для подключения к бд
module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)