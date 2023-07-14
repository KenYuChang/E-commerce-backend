const adminService = require('../services/adminService')

const adminController = {
    adminSignIn: async (req, res, next) => {
        try {
            const { account, password } = req.body
            const { status, message, token, user } = await adminService.signIn(account, password)
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
module.exports = adminController