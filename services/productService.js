const { Product, Category } = require('../models')

const productService = {
    getProducts: async() => {
        const products = await Product.findAll({ include: [{ model: Category }]})
        return {
            success: true,
            message: 'get all products',
            products
        }
    },
    getProductsByCategory: async(category_id) => {
        const products = await Product.findAll({
            where: { category_id }  
        })
        return {
            success: true,
            message: 'get all products by categoryId',
            products
        }
    },
    getProduct: async(product_id) => {
        const product = await Product.findByPk(product_id)
        return {
            success: true,
            message: 'get one product',
            product
        }
    }
}

module.exports = productService