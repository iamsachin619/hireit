const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose; 

//Creating the Schema for book
let rentSchema = mongoose.Schema({
    Book_id: String,
    User_id: {type : String,required: true},
    createdDate: Date,
    dueDate: Date,
    amount: Number,
    approvedBy: String,
    lateFeeCharged: Number,
    returnDate: Date,
    Status: String,
    approvalDate: Date,
    noOfDaysToRent:Number
});


let rentModel = mongoose.model('rent', rentSchema);


module.exports = { rentModel };