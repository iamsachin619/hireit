const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose;   // connection is already established @mongodb.js file.

//Creating the Schema for book
let userSchema = mongoose.Schema({
    firstName: String,  
	lastName: String,
    email: String,
    password: String,
    typeOfUser: String,
    status: Boolean
});


let userModel = mongoose.model('userdetails', userSchema);

module.exports = { userModel }