// routes connect the controller commands to the postman and db. It acts as a link to apply our commands to our data to obtain an output. It specifies the different paths for our commands thereby specifying the resources each path accesses. It is like a roundabout junction where the different roads(commands) meet and disperse depending on their desired destination (output data).

// kickstart express
const express = require('express')
const router = express.Router()

//requiring our controller commands
const {getAllProducts, getAllProductsStatic} = require('../controllers/products')


//stating our routes
router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)

//exporting our module
module.exports = router