const express = require('express');
const app = express();

// this is for environment Variable.
const env = require('dotenv');
env.config();

// we have to parse the data.
app.use(express.json());

// For database

const Path = require('path');


const mongoose = require('mongoose');
const db_url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.eslmv.gcp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect( db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Database Connected Succesfully.")
})

const cors = require('cors');
app.use(cors());

// Importing Routes for admin
const adminAuthRoutes = require('./Admin/routes/auth');
const adminCategoryRoutes = require('./Admin/routes/categoryRoutes');
const adminProductRoutes = require('./Admin/routes/productRoutes');

// Importing Routes for customer
const userAuthRoutes = require('./Customers/routes/customer_auth');


// Using the Imported Routes
// For Admin
app.use('/api', adminAuthRoutes);
app.use('/api', adminCategoryRoutes);
app.use('/api', adminProductRoutes);
app.use("/public", express.static(Path.join(__dirname, '/Resources/ProductImg')));

// For Customer.
app.use('/api', userAuthRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is Running at port ${process.env.PORT}`);
});