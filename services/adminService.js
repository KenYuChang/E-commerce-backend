const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User, Product, Category } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')


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
    return products
  },
  getProduct: async(productId) => {
    const product = await Product.findByPk(productId, { include: [{ model: Category }]})
    return product
  },
  postProduct: async (name, description, price, quantity, category_id, file) => {
    if (!name) throw new Error('Name is required')
    if (!file) throw new Error('Image is required')
    const filePath = await localFileHandler(file)
    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      category_id,
      image: filePath || null
    })

    return product
  },
}

module.exports = adminService