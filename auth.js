const jwt = require('jsonwebtoken');
const secret = "userAuthentication97";
module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		name: user.firstName,
		email: user.email,
		isAdmin: user.isAdmin
	}
	return jwt.sign(data, process.env.AUTH_SECRET, {});
}
module.exports.verify = (req,res,next) => {
	let token = req.headers.authorization;
	if (typeof token === "undefined") {
		return res.send({auth: "Failed. No Token."});
	}
	else {
		token = token.slice(7, token.length)
		jwt.verify(token, process.env.AUTH_SECRET, function(err,decodedToken) {
			if(err) {
				return res.send({
					auth: "Failed",
					message: err.message
				})
			}
			else {			
				req.user=decodedToken;
				next();
			}
		})
	}
}
module.exports.verifyAdmin = (req, res, next) => {
	if(req.user.isAdmin) {
		next();
	}
	else {
		return res.send({
			auth: "Failed!",
			message: "User not authenticated for this action!"
		})
	}
}