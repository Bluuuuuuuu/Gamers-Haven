const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

	userId: {
		type: String,
	},
	totalAmount: {
		type: Number,
	},
	purchasedOn: {
		type: Date,
		default: new Date()
	},
	isCancelled: {
		type: Boolean,
		default: false
	},
	reasonOfCancellation: {
		type: String
	},
	productsPurchased: [
	{
		productId:{
			type: String,
			//required: [true, "productId ID is required."]
		},
		quantity:{
			type: Number,
			//required: [true, "Quantity is required."]
		}
	}
	]
})

module.exports = mongoose.model("Order", orderSchema);