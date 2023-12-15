const Router = require('express')

const router = new Router()
const userRouter = require('./userRouter')
const carRouter = require('./carRouter')
const newsRouter = require('./newsRouter')
const placeRouter = require('./placeRouter')

router.use('/user', userRouter)
router.use('/car', carRouter)
router.use('/news', newsRouter)
router.use('/place', placeRouter)

module.exports = router