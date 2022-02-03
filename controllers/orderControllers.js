const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const auth = require("../auth");

module.exports.order = (req,res) => {

	//check if the user is Admin, if yes, the user can not proceed

	if(req.user.isAdmin) {
		return res.send("Action Forbidden")
	}
		
			let newOrder = new Order({
    		userId: req.user.id,
    		totalAmount: req.body.totalAmount,
 			productsPurchased: req.body.productsPurchased
    		});
    		//console.log(req.body.productsPurchased);
			//newOrder.productsPurchased.push(req.body.productsPurchased);	
			 let isOrderAdded = newOrder.save() 
		/*	.then(saveOrder =>res.send(newOrder))
			.catch(err => res.send(err));*/

			const order_Id = newOrder.id; //saving new orderId

			//console.log(order_Id);
			

			//console.log(req.body.productsPurchased);
			//forEach productId
			let productsForEach = req.body.productsPurchased.forEach(function(products) {
				//console.log(products.productId);
				//console.log(products.productId);
				//console.log(products.quantity);
				
			//let product_Ids = productsForEach.productId;

				///PRODUCT.findById
				Product.findById(products.productId).then(product => {
				let productOrders = 

				{
				orderId: order_Id,
				quantity: products.quantity	
				}

				product.orders.push(productOrders);
				return product.save();

				})
				});

			return res.send("Order added.");
}	

module.exports.displayUserOrder = (req, res) => {
	Order.find({userId: req.user.id}) 
	.then(result => res.send(result))
	.catch(error => res.send(error));
}

module.exports.displayOrders = (req,res) => {
	Order.find({})
	.then(result => res.send(result))
	.catch(error => res.send(error));
}

module.exports.cancelOrder = (req, res) => {
	const update = {isCancelled: true, reasonOfCancellation: req.body.reason};
	const filter = {userId: req.user.id};
	Order.findOneAndUpdate(filter, update, {new: true}) 
	.then(result => res.send("Order cancelled."))
	.catch(error => res.send(error));
}
module.exports.cancelledtOrders = (req, res) => {

	const filter = {isCancelled: true};
	Order.find(filter)
	.then(result => {
			console.log(result);
	}) 
	.catch(error => res.send(error));

}