const { localFileHandler } = require('../helpers/file-helpers')
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
                product
            })

        } catch (error) {
            next(error)
        }
    },
    postProduct: async (req, res, next) => {
        try {
          const { name, description, price, quantity, category_id, origin_price, is_enabled } = req.body
          const { file } = req
          const product = await adminService.postProduct(
            name, 
            description,
            price,
            quantity,
            category_id,
            origin_price,
            is_enabled,
            file
          )
          return res.json({
            product
          })
        } catch (error) {
          next(error)
        }
      },
      putProduct: async(req, res, next) => {
        try {
            
            const { name, description, price, quantity, category_id } = req.body
            const { file } = req
            const productId = req.params.id
            const productData = {
                name,
                description,
                price,
                quantity,
                category_id,
                image: file ? await localFileHandler(file) : null
            }
            if (!name) throw new Error('Name is required')
            const updatedProduct = await adminService.putProduct(productId, productData)
            return res.json({
                updatedProduct,
            })
        } catch (error) {
            next(error)
        }
      },
      deleteProduct: async(req, res, next) => {
        try {
            const productId = req.params.id
            const deletedProduct = await adminService.deleteProduct(productId)
            return res.json({
                deletedProduct
            })
        } catch (error) {
            next(error)
        }
      }
}
module.exports = adminController