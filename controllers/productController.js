const productService = require('../services/productService')

const productController = {
    getProducts: async(req, res, next) => {
        try {
            if (req.query.category_id) {
                const category_id = req.query.category_id
                const products = await productService.getProductsByCategory(category_id)
                res.json({
                    products
                })
            }
            const products = await productService.getProducts()
            return res.json({
                products
            })
        } catch (error) {
            next(error)
        }
    },
    getProduct: async(req, res, next) => {
        try {
            const product_id = req.params.id
            const product = await productService.getProduct(product_id)
            return res.json({
                product
            })
        } catch (error) {
            next(eror)
        }
    }

}
module.exports = productController