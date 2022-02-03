const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

	
	name: {
		type: String,
		required: [true,"Name is required."]
	},
	category: {
		type: String,
		required: [true, "Category is required."]
	},
	description: {
		type: String,
		required: [true, "Description is required."]
	},
	price: {
		type: Number,
		required: [true, "Price is required."]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	},
	
	orders: [
	{
		orderId:{
			type: String,
			
		},
		quantity:{
			type: Number,
			
		}
	}
	]
	
})



module.exports = mongoose.model("Product", productSchema);