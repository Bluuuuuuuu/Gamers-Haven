const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const auth = require("../auth");


//create order (client)
module.exports.order = (req,res) => {

	if(req.user.isAdmin) {
		return res.send("Action Forbidden")//check if the user is Admin, if yes, the user can not proceed
	}
	
			let newOrder = new Order({//inserting a document to db
				userId: req.user.id,
				clientName: req.user.name,
				totalAmount: req.body.totalAmount,
				productsPurchased: req.body.productsPurchased
			});

			//check the totalAmount in client
			if(typeof(req.body.totalAmount) !== Number && req.body.totalAmount === undefined) { 
				res.send("Invalid total amount entered");
			}
			else {
				let isOrderAdded = newOrder.save(); 
			}
			 const order_Id = newOrder.id; //saving new orderId for reference

			//print each product keys as strings
			let productsForEach = req.body.productsPurchased.forEach(function(products) {
				

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

//display client's orders
module.exports.displayUserOrder = (req, res) => {
	const filter = {userId: req.user.id, };
		//console.log(req.user.name);
		//console.log(req.user.id);
		Order.find(filter) 
		.then(result => res.send(result))
		.catch(error => res.send(error));
	}

//display all orders from all clients (admin)
module.exports.displayOrders = (req,res) => {

	Order.find({})
	.then(result => res.send(result))
	.catch(error => res.send(error));
}

//cancel specific order of a client (client) (other client can not cancel other's clients)
module.exports.cancelOrder = (req, res) => {
	if(req.user.isAdmin) {//check if the user is Admin, if yes, the user can not proceed
		return res.send("Action Forbidden")
	}

	const update = {isCancelled: true, reasonOfCancellation: req.body.reason};
	const filter = {_id: req.params.id, userId: req.user.id};

	Order.findOneAndUpdate(filter, update, {new: true}) 
	.then(result =>{

		if(result.userId === req.user.id) {
			res.send("Order cancelled.");
		}
	})
	.catch(error => res.send("Invalid orderID."));
}

//display all cancelled orders from all clients (admin)
module.exports.cancelledtOrders = (req, res) => {
	const filter = {isCancelled: true};
	Order.find(filter)
	.then(result => {
		res.send(result);
	}) 
	.catch(error => res.send(error));
}


