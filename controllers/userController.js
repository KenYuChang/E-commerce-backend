const userService = require('../services/userService')
const jwt = require('jsonwebtoken')

const userController = {

    signIn: async (req, res, next) => {
        try {
            const { account, password } = req.body
            const { status, message, token,expirationDate , user } = await userService.signIn(account, password)
            return res.json({
                status,
                message,
                token,
                expirationDate,
                user
            })
        } catch (error) {
            next(error)
        }
    },
    getCurrentUser: async (req, res, next) => {
        try {
            const result = req.user.toJSON()
            delete result.password
            delete result.account

            return res.json({
                success: 'true',
                result
            })
        } catch (error) {
            next(error)
        }
    },
}
module.exports = userController