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

module.exports.displayActiveProducts = (req, res) => { //display all active products
	Product.find({isActive: true})
	.then(foundProducts => {
		return res.send(foundProducts);
	})
	.catch(error => res.send(error));
}

module.exports.displayArchiveProducts = (req, res) => { //display all archived products
	Product.find({isActive: false})
	.then(foundProducts => {
		return res.send(foundProducts);
	})
	.catch(error => res.send(error));
}

module.exports.displaySingleProduct = (req, res) => { //display single product using id 
	Product.findById(req.params.id)
	.then(foundProducts => {
		return res.send(foundProducts);
	})
	.catch(error => res.send(error));
}

module.exports.searchSingleProduct = (req, res) => { //search products and display
	Product.find({name: {$regex: req.body.name, $options: '$i'}})
	.then(result => {
		if(result.length === 0) {
			return res.send("No products found.");
		}
		else {
			return res.send(result);
		}
	})
}

module.exports.updateSingleProduct = (req, res) => { //update product details
	let updatedProduct = {
		name: req.body.name,
		category: req.body.cat,
		description: req.body.desc,
		price: req.body.price
	}
	 Product.findByIdAndUpdate(req.params.id, updatedProduct,{new: true})
	 .then(result =>  res.send(result))
	 .catch(error => res.send(error));
}

module.exports.activateProduct = (req, res) => { //activate product
	 Product.findByIdAndUpdate(req.params.id, {isActive:true}, {new: true})
	 .then(result =>  res.send(result))
	 .catch(error => res.send(error));
}

module.exports.archiveProduct = (req, res) => { //archive product
	 Product.findByIdAndUpdate(req.params.id, {isActive:false}, {new: true})
	 .then(result =>  res.send(result))
	 .catch(error => res.send(error));
}