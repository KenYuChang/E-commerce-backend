const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')


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
      const expirationDate = new Date(decodedToken.exp * 1000) // 转换为日期对象
      return {
        status: 'success',
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
}

module.exports = userService

