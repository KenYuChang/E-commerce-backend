const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/api-auth')
const adminController = require('../../controllers/adminController')
const upload = require('../../middleware/multer')



router.post('/signin', adminController.adminSignIn)
// product
router.get('/products/:id', adminController.getProduct)
router.get('/products', adminController.getProducts)
router.post('/products', upload.single('image'), adminController.postProduct)


module.exports = router