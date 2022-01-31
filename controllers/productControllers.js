const Product = require("../models/Product");
const auth = require("../auth");

module.exports.createProduct = (req,res) => { //create product (admin)
	Product.findOne({name: req.body.name})
	.then(productFound => {
		if(productFound !== null && productFound.name === req.body.name) {
			return res.send("The product you're trying to enter is already listed.");
		}
		else {
		let newProduct = new Product({
    		name: req.body.name,
    		category: req.body.category,
    		description: req.body.description,
    		price: req.body.price
			});
			newProduct.save()
			.then(user => res.send(user))
			.catch(err => res.send(err));
				}
	})
	.catch(error => res.send(error));
}

module.exports.retrieveActiveProducts = (req, res) => {
	Product.find({isActive: true})
	.then(foundProducts => {
		return res.send(foundProducts);
	})
	.catch(error => res.send(error));
}
