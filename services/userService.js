const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User, Product, Order } = require('../models')


const userService = {
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
      if (user.is_admin) {
        const error = new Error('Access forbidden')
        error.status = 403
        throw error
      }
      const payload = { id: user.id }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const expirationDate = new Date(decodedToken.exp * 1000) 
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
  getCurrentUser: async(userId) => {
    const currentUser = await User.findByPk(userId, {
      attributes: { exclude: ['password']}
    })
    const userOrders = await Order.findAll({
      where: { user_id: userId},
      include: [{ model: Product, as: 'items' }]
    })

    return {
      success: true,
      message: '獲得使用者資訊',
      currentUser,
      userOrders
    }
  }
}

module.exports = userService

