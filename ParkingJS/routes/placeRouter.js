const Router = require('express')

const router = new Router()
const placeController = require('../controllers/placeController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', placeController.getAll);
router.get('/:id', placeController.getById);
router.post('/', authMiddleware, placeController.create);
router.post('/:id', authMiddleware, placeController.reserve);

module.exports = router;