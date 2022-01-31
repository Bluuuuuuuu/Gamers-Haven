require('dotenv').config()
const express = require('express'); //import express.js
const mongoose = require('mongoose'); //import mongoose
const app = express(); //
const port = 4000;


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p9on8.mongodb.net/${process.env.DB_DATABASE_NAME}?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true, 
		useUnifiedTopology:true,
		ignoreUndefined: true,
	});

const db = mongoose.connection;


db.on('error', console.error.bind(console, "Connection Error."));

db.once('open', ()=>console.log('Connected to MongoDB.'));

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);


const orderRoutes = require('./routes/orderRoutes');
app.use('/orders',orderRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/products',productRoutes);


app.listen(port, () => console.log(`Server is running at port ${port}`));