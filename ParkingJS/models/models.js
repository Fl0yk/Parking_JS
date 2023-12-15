const sequelize = require('../db')
const { DataTypes } = require('sequelize')

//Определяем сущности бд
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        //Не может быть пустым
        allowNull: false,
        //Дополнительная валидация
        validate: {
            isDecimal: true,
            min: 0,
        },
    }
})

const Car = sequelize.define('car', {
    number: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
            //Проверка на совпадение с регуляркой
            is: /^\d{4}\s\w{2}-\d$/i,
        }
    },
    model: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    },
    brand: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    },
})

const Place = sequelize.define('place', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    isEmpty: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        unique: false,
        validate: {
            isDecimal: true,
            min: 1,
            max: 100,
        }
    },
})

const News = sequelize.define('news', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
    },
})

//Задаем отношения между сущностями
User.hasMany(Car)
Car.belongsTo(User)

Place.hasOne(Car)
Car.belongsTo(Place)

module.exports = {
    User,
    Car,
    Place,
    News
}