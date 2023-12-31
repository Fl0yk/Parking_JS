const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generateJwt = (id, name, email) => {
    return jwt.sign(
        { id, name, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { name, email, password } = req.body

        if (!email || !password || !name) {
            return next(ApiError.badRequest('Bad email, name or password'))
        }

        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('User with this email is exist'))
        }

        const user = await User.create({ name, email, password })

        const token = generateJwt(user.id, user.name, user.email)

        return res.json({ token })
        
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('User not found'))
        }
        
        if (password !== user.password) {
            return next(ApiError.internal('Bad password'))
        }
        const token = generateJwt(user.id, user.name, user.email)
        return res.json({ token })
    }

    check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.email)
        return res.json({ token })
    }
}

module.exports = new UserController()