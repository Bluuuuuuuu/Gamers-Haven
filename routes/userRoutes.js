const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const auth = require('../auth');
const {verify, verifyAdmin} = auth;


router.post('/', userControllers.registerUser); //register user
router.get('/login', userControllers.loginUser); //login user

//retrieve all clients (admin)
router.get('/clients', verify, verifyAdmin, userControllers.retrieveAllClients); 

//client to admin
router.put('/editRole0/:id', verify, verifyAdmin, userControllers.editUserRoleAdmin);

//admin to client 
router.put('/editRole1/:id', verify, verifyAdmin, userControllers.editUserRoleClient); 

 //edit details (clients)
router.put('/editUserDetails', verify, userControllers.editUserDetails);




module.exports = router;
