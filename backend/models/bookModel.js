const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose;   // connection is already established @mongodb.js file.

//Creating the Schema for book
let bookSchema = mongoose.Schema({
    image: String,  
	title: String,
    author: String,
    publisher: String,
    category: String,
    yearOfPublishing: Number,
    uploader: String,
    amountRate: Number,
    copiesNumber: Number
 });


let bookModel = mongoose.model('booksdetails', bookSchema);

module.exports = { bookModel };