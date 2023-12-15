const ApiError = require('../error/ApiError');
const { Car } = require('../models/models')


class CarController {
    async create(req, res, next) {
        try {
            const { number, brand, model } = req.body;

            // ���������, ���������������� �� ������������
            if (!req.user) {
                return next(ApiError.forbidden('User is not authorize'));
            }

            // ������� ������, ����������� � �������� ������������
            const car = await Car.create({
                number,
                brand,
                model,
                userId: req.user.id, // ��������� ������������� ������������
            });

            return res.json(car);
        } catch (error) {
            return next(ApiError.internal('Error on create car', error));
        }
    }

    async getAll(req, res, next) {
        // ���������, ���������������� �� ������������
        if (!req.user) {
            return next(ApiError.forbidden('User is not authorize'));
        }

        // �������� ��� ������, ������������� �������� ������������ �� ���� ������
        let userCars;
        try {
            userCars = await Car.findAll({ where: { userId: req.user.id } })

            return res.json(userCars);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal('Error on get all cars', error));
        }
    }

   async getById(req, res, next) {
        try {
            const num = req.params.id;

            // �������� ������ �� �������������� �� ���� ������
            const car = await Car.findByPk(num);

            if (!car) {
                return next(ApiError.badRequest('Car not found'));
            }

            return res.json(car);
        } catch (error) {
            return next(ApiError.internal('Error on get by id car', error));
        }
    }

    async update(req, res, next) {
        try {
            //const num = req.params.id;

            const { number, brand, model } = req.body;

            // ��������� ������ � ���� ������
            const [, updatedCar] = await Car.update(
                { brand, model },
                { where: { number }, returning: true }
            );

            if (!updatedCar || updatedCar.length === 0) {
                return next(ApiError.badRequest('Car not found'));
            }

            return res.json(updatedCar[0]);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal('Error on update car', error));
        }
    }

    async delete(req, res, next) {
        try {
            const carId = req.params.id;

            // ������� ������ �� ���� ������
            const deletedCarCount = await Car.destroy({ where: { number: carId } });

            if (deletedCarCount === 0) {
                return next(ApiError.badRequest('Car not found'));
            }

            return res.json({ message: 'delete successfully' });
        } catch (error) {
            return next(ApiError.internal('Error on delete car', error));
        }
    }
}

module.exports = new CarController()