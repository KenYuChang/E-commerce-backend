const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')


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
      return {
        status: 'success',
        message: '登入成功',
        token,
        user: {
          id: user.id,
          account: user.account,
          is_admin: user.is_admin
        }
    } 
  }
}

module.exports = adminService