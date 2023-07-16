const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const admin = require('./modules/admin')
const userController = require('../controllers/userController')
const { apiErrorHandler } = require('../middleware/error-handler')
const { authenticated } = require('../middleware/api-auth')

router.use('/api/admin', admin)
router.use('/api/users', users)
router.get('/api/currentUser', userController.getCurrentUser)
router.post('/api/logout', userController.logout)
router.use('/', apiErrorHandler)

module.exports = router 