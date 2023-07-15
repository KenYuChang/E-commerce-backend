const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/api-auth')
const adminController = require('../../controllers/adminController')

router.post('/signin', adminController.adminSignIn)
// product
router.get('/products/:id', adminController.getProduct)
router.get('/products', adminController.getProducts)
// router.post('/products', adminController.postProduct)


module.exports = router