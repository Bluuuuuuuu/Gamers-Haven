const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.registerUser = (req,res) => { //REGISTER USER
	User.findOne({email: req.body.email})
	.then(result => {

		if(result !== null && result.email === req.body.email) {
			return res.send("Email is already used, try another email instead.");
		}
		else {
			const hashedPW = bcrypt.hashSync(req.body.password, 10); //hashing passwords
			let newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				mobileNo: req.body.mobileNo,
				password: hashedPW
			});
			newUser.save()
			.then(user => res.send(user))
			.catch(err => res.send(err));
				}
	})
	.catch(error => res.send(error));
}

module.exports.retrieveAllClients = (req, res) => { //display user details (admin)
	User.find({isAdmin: false})
	.then(foundUsers =>{
		return res.send(foundUsers);
	})
	.catch(error => res.send(error));
		
}
module.exports.loginUser = (req, res) => { //login user
	User.findOne({email: req.body.email})
	.then(foundUser => {
		if (foundUser === null) {
			return res.send("Email not found.");
		}
		else {
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password); 		
			if(isPasswordCorrect) {				
			return res.send({acessToken: auth.createAccessToken(foundUser)});
			}
			else {
			return res.send("Incorrect password.");
			}
		}
	})
	.catch(error => res.send(error));

}

module.exports.editUserRoleAdmin = (req, res) => { // client - admin (admin)
	 User.findByIdAndUpdate(req.params.id, {isAdmin:true}, {new: true})
	 .then(result =>  res.send(result))
	 .catch(error => res.send(error));
}
module.exports.editUserRoleClient = (req, res) => { // admin - client
	 User.findByIdAndUpdate(req.params.id, {isAdmin:false}, {new: true})
	 .then(result =>  res.send(result))
	 .catch(error => res.send(error));
}

module.exports.editUserDetails = (req, res) => { // update client details
	let userUpdates = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		mobileNo: req.body.mobileNo
	}

	 User.findByIdAndUpdate(req.user.id, userUpdates,{new: true})
	 .then(result =>  res.send(result))
	 .catch(error => res.send(error));
}