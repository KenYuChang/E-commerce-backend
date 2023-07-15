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
    },
    getProducts: async (req, res, next) => {
        try {
            const products = await adminService.getProducts()
            return res.json({
                success: true,
                products
            })
        } catch (error) {
            next(error)
        }
    },
    getProduct: async (req, res, next) => {
        try {
            const productId = req.params.id
            const product = await adminService.getProduct(productId)
            return res.json({
                success: true,
                product
            })

        } catch (error) {
            next(error)
        }
    },
    postProduct: async (req, res, next) => {
        try {
          const { name, description, price, quantity, category_id } = req.body
          const { file } = req
          const product = await adminService.postProduct(
            name, 
            description,
            price,
            quantity,
            category_id,
            file
          )
          return res.json({
            success: true,
            product
          })
        } catch (error) {
          next(error)
        }
      },
}
module.exports = adminController