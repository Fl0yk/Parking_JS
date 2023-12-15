const ApiError = require('../error/ApiError');
const { News } = require('../models/models')


class NewsController {
    async getAll(req, res, next) {
        try {
            // �������� ��� ������� �� ���� ������
            const news = await News.findAll();

            return res.json(news);
        } catch (error) {
            return next(ApiError.internal('Error in get all news ', error));
        }
    }

    async getById(req, res, next) {
        try {
            const newsId = req.params.id;

            // �������� ������� �� �������������� �� ���� ������
            const newsItem = await News.findByPk(newsId);

            if (!newsItem) {
                return next(ApiError.notFound('News not found'));
            }

            return res.json(newsItem);
        } catch (error) {
            return next(ApiError.internal('�Error on get news by id ', error));
        }
    }
}

module.exports = new NewsController()