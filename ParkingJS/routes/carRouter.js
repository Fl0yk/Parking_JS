const Router = require('express')

const router = new Router()
const carController = require('../controllers/carController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, carController.getAll)
router.get('/:id', authMiddleware, carController.getById)
router.post('/', authMiddleware, carController.create)
router.put('/', authMiddleware, carController.update)
router.delete('/:id', authMiddleware, carController.delete)

module.exports = router