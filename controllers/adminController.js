const adminService = require('../services/adminService')

const adminController = {
    adminSignIn: async (req, res, next) => {
        try {
            const { account, password } = req.body
            const { success, message, token, expirationDate, user } = await adminService.signIn(account, password)
            return res.json({
                success,
                message,
                token,
                expirationDate,
                user
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = adminController