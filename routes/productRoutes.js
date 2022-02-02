const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");
const auth = require('../auth');
const {verify, verifyAdmin} = auth;

router.post('/createProduct', verify, verifyAdmin, productControllers.createProduct); //list a product
router.get('/', productControllers.displayActiveProducts); //get all active products
router.get('/archive', productControllers.displayArchiveProducts); //get all archived products
router.get('/:id', productControllers.displaySingleProduct); //display single product
router.post('/search', productControllers.searchSingleProduct); //search specific product
router.put('/editProduct/:id',  verify, verifyAdmin, productControllers.updateSingleProduct); //search specific product
router.put('/activateProduct/:id',  verify, verifyAdmin, productControllers.activateProduct); //activate product
router.put('/archiveProduct/:id',  verify, verifyAdmin, productControllers.archiveProduct); //archive product


module.exports = router;
