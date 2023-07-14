const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const { apiErrorHandler } = require('../middleware/error-handler')

router.post('/api/admin/signin', adminController.adminSignIn)
router.post('/api/users/signin', userController.signIn)
router.use('/', apiErrorHandler)

module.exports = router