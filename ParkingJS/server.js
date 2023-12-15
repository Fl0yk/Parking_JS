'use strict';

try {
    require('dotenv').config();
    const express = require('express');
    const sequelize = require('./db');
    const models = require('./models/models');
    const cors = require('cors');
    const router = require('./routes/index');
    const errorHandler = require('./middleware/ErrorHandlingMiddleware');

    const PORT = process.env.PORT || 5001;

    const app = express();
    //Разрешаем запросы с других доменов
    app.use(cors());
    //Для доступа к данным json в теле запроса
    app.use(express.json());
    //Для направления всех маршрутов, которые начинаются с api, в router
    app.use('/api', router);

    app.use(errorHandler);

    const start = async () => {
        try {
            //Проверяем подключение к бд
            await sequelize.authenticate();
            //Синхранизируем модели
            await sequelize.sync();
            app.listen(PORT, () => console.log("Server start on port " + PORT));
        } catch (e) {
            console.log(e);
            let a = 5;
        }
    };

    start();
} catch (e) {
    console.log(e);
    let a = 5;
}