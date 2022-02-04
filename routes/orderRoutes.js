const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const auth = require('../auth');
const {verify, verifyAdmin} = auth;




router.post('/', verify, /*orderControllers.computeTotalPerProduct*/ orderControllers.order); //add order
router.get('/displayOrder', verify, orderControllers.displayUserOrder); //display user order details
router.get('/displayOrders', verify, verifyAdmin, orderControllers.displayOrders); //display orders
router.put('/cancelOrder/:id', verify, orderControllers.cancelOrder); //enables clients to cancel order
router.get('/cancelledOrders', verify, verifyAdmin, orderControllers.cancelledtOrders); //get cancelled orders (admin)
router.get('/productsPerOrder/:id', verify, orderControllers.productsPerOrder); //get cancelled orders (admin)




module.exports = router;
