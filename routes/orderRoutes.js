const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const auth = require('../auth');
const {verify, verifyAdmin} = auth;




router.post('/', verify, orderControllers.order); //add order
router.get('/displayOrder', verify, orderControllers.displayUserOrder); //display user order details
router.get('/displayOrders', verify, verifyAdmin, orderControllers.displayOrders); //display orders
/*router.get('/addToCart', verify, orderControllers.addToCart);*/ //display user order details




module.exports = router;
