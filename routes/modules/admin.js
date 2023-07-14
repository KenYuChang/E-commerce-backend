const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/api-auth')
const adminController = require('../../controllers/adminController')

router.post('/signin', adminController.adminSignIn)

module.exports = router