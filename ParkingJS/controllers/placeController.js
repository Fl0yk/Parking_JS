const ApiError = require('../error/ApiError');
const { Place, News } = require('../models/models')


class PlaceController {
    async create(req, res, next) {
        try {
            //const { title, text } = req.body
            //await News.create({ title, text })
            const { price } = req.body;

            // Создаем новое место
            const place = await Place.create({ isEmpty: true, price });

            return res.json(place);
        } catch (error) {
            console.log(error)
            return next(ApiError.internal('Ошибка при создании места', error));
        }
    }

    async getAll(req, res, next) {
        try {
            // Получаем все места из базы данных
            const places = await Place.findAll();

            return res.json(places);
        } catch (error) {
            return next(ApiError.internal('Ошибка при получении списка мест', error));
        }
    }

    async getById(req, res, next) {
        try {
            const placeId = req.params.id;

            // Получаем место по идентификатору из базы данных
            const place = await Place.findByPk(placeId);

            if (!place) {
                return next(ApiError.badRequest('place not found'));
            }

            return res.json(place);
        } catch (error) {
            return next(ApiError.internal('Ошибка при получении места по идентификатору', error));
        }
    }

    async reserve(req, res, next) {
        try {
            const placeId = req.params.id;

            const [updateCount, updatePlace] = await Place.update(
                { isEmpty: false }, {
                    where: { id:placeId },
                    returning: true,
                }
            );

            return res.json(updatePlace);

        } catch (error) {
            return next(ApiError.internal('Error in reserve ', error));
        }
    }
}

module.exports = new PlaceController()