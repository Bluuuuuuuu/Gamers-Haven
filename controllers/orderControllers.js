const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const auth = require("../auth");

module.exports.order = async (req,res) => {

	//check if the user is Admin, if yes, the user can not proceed

	if(req.user.isAdmin) {
		return res.send("Action Forbidden")
	}
			let newOrder = new Order({
    		userId: req.user.id,
    		totalAmount: req.body.totalAmount
    		//productsPurchased: [....]
    		});
			newOrder.save()
			const order_Id = newOrder.id; //saving new orderId
			//console.log(order_Id);
			//return res.send("Order added.");
			
				let isOrderUpdated = await Order.findById(order_Id).then(order => {
				let orderProduct = 																		
						[
							{
								productId: req.body.productId,
								quantity: req.body.quantity
							}
						]	
						orderProduct.forEach(function(products) {							
						order.productsPurchased.push(products);
				})
			
				return order.save().then(order => true).catch(err => err.message)

				})

				if(isOrderUpdated !== true) {
					return res.send({message: isOrderUpdated})
				}


				let isProductUpdated  = await Product.findById(req.body.productId).then(product => {
				let productOrders = 
				{
				orderId: order_Id,
				quantity: req.body.quantity		
				}

				product.orders.push(productOrders);
				return product.save().then(product => true).catch(err => err.message)
				})

				if(isProductUpdated !== true){
				return res.send({message: isProductUpdated})
				}


			
				if(isOrderUpdated && isProductUpdated){
					return res.send({message: "Products added to cart."})
				}
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