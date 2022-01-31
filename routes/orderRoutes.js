const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const auth = require('../auth');
const {verify, verifyAdmin} = auth;


router.post('/', verify, orderControllers.createCart);
/*router.post('/addToCart/:id', verify, orderControllers.addToCart);
*/
module.exports = router;
