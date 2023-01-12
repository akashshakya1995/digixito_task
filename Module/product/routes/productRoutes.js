const productRoutes = require('express').Router()
const { productListing } = require('../controller/productCtrl')

productRoutes.get('', productListing)

module.exports = productRoutes