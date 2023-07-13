const userService = require('../services/userService')

const userController = {

    signIn: async (req, res, next) => {
        try {
            const { account, password } = req.body
            const { status, message, token, user } = await userService.signIn(account, password)
            return res.json({
                status,
                message,
                token,
                user
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = userController