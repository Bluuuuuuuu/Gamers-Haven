const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");
const auth = require('../auth');
const {verify, verifyAdmin} = auth;

router.post('/createProduct', verify, verifyAdmin, productControllers.createProduct);
router.get('/', verify, productControllers.retrieveActiveProducts);



module.exports = router;
