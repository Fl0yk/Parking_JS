const Router = require('express')

const router = new Router()
const newsController = require('../controllers/newsController')

router.get('/', newsController.getAll)
router.get('/:id', newsController.getById)

module.exports = router