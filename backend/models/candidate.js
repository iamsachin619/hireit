const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose;   // connection is already established @mongodb.js file.

//Creating the Schema for candidate
let candidateSchema = mongoose.Schema({
    resume: String,  
	name: String,
    uploadedBy: String,
    dob: String,
    email: String,
    status: {
        type:String,
        enum: ['pending', 'forwarded', 'rejected','scheduled']
    },
    pan: String
 });


let candidateModel = mongoose.model('candidatesdetails', candidateSchema);

module.exports = { candidateModel };