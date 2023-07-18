const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User, Product, Category, Order } = require('../models')
const { localFileHandler, imgurFileHandler } = require('../helpers/file-helpers')


const adminService = {
  signIn: async (account, password) => {
      const user = await User.findOne({ where: { account }})
      if (!user) {
        const error = new Error('User not found')
        error.status = 404
        throw error
      }
      if (!bcrypt.compareSync(password, user.password)) {
        const error = new Error('Wrong password')
        error.status = 403
        throw error
      }
      if (!user.is_admin) {
        const error = new Error('Access forbidden')
        error.status = 403
        throw error
      }
      const payload = { id: user.id }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const expirationDate = new Date(decodedToken.exp * 1000) // 转换为日期对象
      return {
        success: true,
        message: '登入成功',
        token,
        expirationDate,
        user: {
          id: user.id,
          account: user.account,
          is_admin: user.is_admin
        }
    } 
  },
  getProducts: async() => {
    const products = await Product.findAll({ include: [{ model: Category }]})
    return {
      success: true,
      message: 'Get all products',
      products }
  },
  getProduct: async(productId) => {
    const product = await Product.findByPk(productId, { include: [{ model: Category }]})
    return {
      success: true,
      message: 'Get one product',
      product
    }
  },
  postProduct: async (file, body) => {
    const filePath = await imgurFileHandler(file)
    const product = await Product.create({
      ...body,
      image: filePath || null
    })

    return {
      success: true,
      message: 'Product create',
      product
    }
  },
  putProduct: async(productId, productData) => {
    const product = await Product.findByPk(productId)
    if (!product) throw new Error('Product does not exit')
    const updatedProduct = await product.update(productData)
    return {
      success: true,
      message: 'product edit',
      updatedProduct
    }
  },
  deleteProduct: async(productId) => {
    const product = await Product.findByPk(productId)
    await product.destroy()
    return {
      success: true,
      message: 'Product delete'
    }
  },
  getOrders: async() => {
    const orders = await Order.findAll({
      order: [['createdAt', 'ASC']]
    })
    return {
      success: true,
      message: 'get order lists',
      orders
    }
  },
  putOrders: async(orderId, orderData) => {
    const order = await Order.findByPk(orderId)
    const updatedOrder = await order.update(...orderData)
    return {
      success: true,
      message: 'order edit',
      updatedOrder
    }
  }
  
}

module.exports = adminService