const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { apiErrorHandler } = require('../middleware/error-handler')

router.post('/api/users/signin', userController.signIn)
router.use('/', apiErrorHandler)

module.exports = router