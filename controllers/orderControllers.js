const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const auth = require("../auth");


module.exports.createCart = (req,res) => {
	if(req.user.isAdmin) {
		return res.send("Action Forbidden")
	}
	Order.findOne({userId: req.user.id})
	.then(userFound => {
		if(userFound !== null && userFound.userId === req.user.id) {
			return res.send("You can't create another cart.");
		}
		else {
		let newOrder = new Order({
    		userId: req.user.id,
    		totalAmount: 0,
			});
			newOrder.save()
			.then(user => res.send(user))
			.catch(err => res.send(err));	
			}
})
}	
	/*
module.exports.addToCart = async (req, res) => {

	//check if the user is Admin, if yes, the use can not proceed
	if(req.user.isAdmin) {
		return res.send("Action Forbidden")
	}

	let isOrderUpdated = await Order.find({userId: req.user.id}).then(order => {

	
		let orderProduct = {
			productId: req.body.productId,
			quantity: req.body.quantity
		}

	
		order.productsPurchased.push(orderProduct);

	
		return order.save().then(order => true).catch(err => err.message)

	})

	if(isOrderUpdated !== true) {
		return res.send({message: isOrderUpdated})
	}

	let isProductUpdated  = await Product.findById(req.body.productId).then(product => {

		let productOrders = {
			orderId: req.params.id,
			quantity: req.body.quantity
		}

		product.orders.push(productOrders);

		return product.save().then(product => true).catch(err => err.message)
	})

	if(isProductUpdated !== true){
		return res.send({message: isProductUpdated})
	}

	if(isUserUpdated && isProductUpdated){
		return res.send({message: "Products added to cart."})
	}

}
*/









	/*let isUserUpdated = await User.findById(req.user.id).then(user => {

	
		let newEnrollment = {
			courseId: req.body.courseId
		}

	
		user.enrollments.push(newEnrollment);

	
		return user.save().then(user => true).catch(err => err.message)

	})

	if(isUserUpdated !== true) {
		return res.send({message: isUserUpdated})
	}


	let isCourseUpdated  = await Course.findById(req.body.courseId).then(course => {

		let enrollee = {
			userId: req.user.id
		}

		course.enrollees.push(enrollee);

		return course.save().then(course => true).catch(err => err.message)
	})

	if(isCourseUpdated !== true){
		return res.send({message: isCourseUpdated})
	}

	if(isUserUpdated && isCourseUpdated){
		return res.send({message: "Enrolled Successfully."})
	}*/
